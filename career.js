function startCareer(){

    GAME={
        player:createPlayer(),

        money:0,

        season:2026,

        week:1,

        club:null,

        contract:null,

        table:[],

        events:[],

        car:null,

        house:null,

        sponsor:null,

        relationship:{
            partner:null,
            married:false,
            children:0
        },

        nationalTeam:null,

        agent:{
            level:1,
            reputation:10
        }
    };

    generateOffers();

    saveGame();

    renderOffers();
}


function generateOffers(){

    const p=GAME.player;

    let candidates=
        CLUBS.filter(c=>
            c.strength<=p.overall+18
        );

    candidates.sort(
        (a,b)=>
            Math.abs(a.strength-p.overall)-
            Math.abs(b.strength-p.overall)
    );

    GAME.offers=
        candidates.slice(0,5).map(c=>({

            club:c.id,

            salary:
                Math.round(
                    (
                        c.strength*100+
                        p.overall*120
                    )*
                    random(8,14)/10
                ),

            years:3
        }));
}


function signContract(index){

    const offer=GAME.offers[index];

    const club=
        CLUBS.find(c=>c.id===offer.club);

    GAME.club=club;

    GAME.contract={
        club:club.id,
        salary:offer.salary,
        years:offer.years
    };

    GAME.table=
        createTable(club.league);

    addEvent(
        `📝 وقعت عقداً مع ${club.name}.`
    );

    saveGame();

    renderDashboard();
}


function createTable(league){

    return CLUBS
        .filter(c=>c.league===league)
        .map(c=>({

            club:c.id,
            played:0,
            w:0,
            d:0,
            l:0,
            gf:0,
            ga:0,
            points:0,
            strength:c.strength

        }))
        .sort(
            (a,b)=>
                b.strength-a.strength
        );
}


function getCurrentClub(){

    return GAME.club;
}


function nextSeason(){

    GAME.season++;
    GAME.week=1;

    GAME.player.age++;

    GAME.player.fitness=100;

    GAME.player.morale=
        clamp(
            GAME.player.morale+10,
            0,
            100
        );

    GAME.table=
        createTable(
            GAME.club.league
        );

    addEvent(
        `🎬 بدأ موسم ${GAME.season}/${GAME.season+1}.`
    );

    calculateSeasonAwards();

    saveGame();

    renderDashboard();
}


function randomCareerEvent(){

    if(Math.random()>0.12)
        return;

    const events=[

        {
            text:"📱 انتشر مقطع لك على وسائل التواصل.",
            effect(){
                GAME.player.fame+=3;
            }
        },

        {
            text:"📰 الصحافة تتحدث عن مستواك الرائع.",
            effect(){
                GAME.player.morale+=5;
            }
        },

        {
            text:"😡 دخلت في خلاف بسيط مع لاعب منافس.",
            effect(){
                GAME.player.morale-=2;
            }
        },

        {
            text:"👨‍👩‍👦 حصل حدث عائلي مهم.",
            effect(){
                GAME.player.morale+=3;
            }
        },

        {
            text:"💰 حصلت على مكافأة من النادي.",
            effect(){
                GAME.money+=random(5000,30000);
            }
        }

    ];

    const e=
        events[random(0,events.length-1)];

    e.effect();

    GAME.player.morale=
        clamp(GAME.player.morale,0,100);

    addEvent(e.text);
}


function addEvent(text){

    GAME.events.unshift({
        text,
        date:
            `${GAME.season} / ${GAME.week}`
    });

    GAME.events=
        GAME.events.slice(0,30);
}
