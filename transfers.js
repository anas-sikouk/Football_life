function transferMarket(){

    const p=GAME.player;

    let clubs=
        CLUBS.filter(c=>
            c.id!==GAME.club.id &&
            c.strength<=p.overall+15
        );

    clubs.sort(
        (a,b)=>b.strength-a.strength
    );

    return clubs.slice(0,6);
}


function makeTransfer(clubId){

    const club=
        CLUBS.find(c=>c.id===clubId);

    if(!club)
        return;

    GAME.club=club;

    GAME.contract={
        club:club.id,

        salary:
            Math.round(
                club.strength*150+
                GAME.player.overall*120
            ),

        years:3
    };

    GAME.table=
        createTable(club.league);

    GAME.player.morale=
        clamp(
            GAME.player.morale+8,
            0,
            100
        );

    addEvent(
        `🔄 انتقلت إلى ${club.name}.`
    );

    saveGame();

    renderDashboard();
}


function negotiateTransfer(clubId){

    const club=
        CLUBS.find(c=>c.id===clubId);

    const required=
        club.strength-5;

    if(GAME.player.overall<required){

        toast(
            "❌ مستواك غير كافٍ لهذا النادي."
        );

        return;
    }

    makeTransfer(clubId);
}
