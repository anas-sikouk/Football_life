function buyCar(index){

    const car=CARS[index];

    if(GAME.money<car.price){

        toast("💸 لا تملك المال الكافي.");

        return;
    }

    GAME.money-=car.price;

    GAME.car=car;

    addEvent(
        `🚗 اشتريت ${car.name}.`
    );

    saveGame();

    renderLife();
}


function buyHouse(index){

    const house=HOUSES[index];

    if(GAME.money<house.price){

        toast("💸 لا تملك المال الكافي.");

        return;
    }

    GAME.money-=house.price;

    GAME.house=house;

    addEvent(
        `🏠 اشتريت ${house.name}.`
    );

    saveGame();

    renderLife();
}


function signSponsor(index){

    const sponsor=SPONSORS[index];

    if(
        GAME.player.fame<
        sponsor.minRep
    ){

        toast(
            "⭐ تحتاج إلى شهرة أكبر."
        );

        return;
    }

    GAME.money+=sponsor.money;

    GAME.sponsor=sponsor;

    addEvent(
        `🤝 وقعت عقد رعاية مع ${sponsor.name}.`
    );

    saveGame();

    renderLife();
}


function relationshipAction(){

    if(
        !GAME.relationship.partner
    ){

        GAME.relationship.partner=
            "Partner";

        GAME.player.morale+=10;

        addEvent(
            "❤️ بدأت علاقة عاطفية."
        );

    }else if(
        !GAME.relationship.married
    ){

        GAME.relationship.married=true;

        addEvent(
            "💍 تزوجت."
        );

    }else{

        GAME.relationship.children++;

        addEvent(
            "👶 رُزقت بطفل."
        );
    }

    GAME.player.morale=
        clamp(
            GAME.player.morale,
            0,
            100
        );

    saveGame();

    renderLife();
}
