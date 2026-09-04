function simulateMatch(){

    const player=GAME.player;
    const club=getCurrentClub();

    if(player.fitness<25){

        addEvent("🩹 لم تلعب المباراة بسبب انخفاض اللياقة.");

        player.fitness=clamp(
            player.fitness+random(15,25),
            0,
            100
        );

        GAME.week++;

        saveGame();

        showMatchResult({
            gf:0,
            ga:0,
            minutes:0,
            goals:0,
            assists:0,
            rating:0,
            missed:true
        });

        return;
    }

    const opponents=
        CLUBS.filter(c=>
            c.league===club.league &&
            c.id!==club.id
        );

    const opponent=
        opponents[random(0,opponents.length-1)];

    let teamPower =
        club.strength +
        player.overall*.25 +
        player.fame*.05;

    let opponentPower=
        opponent.strength;

    let gf=random(
        0,
        Math.max(1,Math.round(teamPower/17))
    );

    let ga=random(
        0,
        Math.max(1,Math.round(opponentPower/17))
    );

    if(Math.random()<.2)
        gf++;

    if(Math.random()<.2)
        ga++;

    const starts=
        Math.random()<0.82;

    let minutes=
        starts
        ? random(55,95)
        : 0;

    let goals=0;
    let assists=0;

    if(minutes>0){

        if(
            Math.random()<
            player.shooting/100*.5
        ){
            goals=Math.min(
                gf,
                random(0,2)
            );
        }

        if(
            gf-goals>0 &&
            Math.random()<
            player.passing/100*.5
        ){
            assists=Math.min(
                gf-goals,
                1
            );
        }
    }

    let rating=0;

    if(minutes){

        rating=
            6.2+
            goals*1.4+
            assists*.7+
            random(-8,10)/10;

        rating=clamp(rating,4.5,10);
    }

    player.matches++;
    player.minutes+=minutes;
    player.goals+=goals;
    player.assists+=assists;

    player.fitness=
        clamp(
            player.fitness-random(10,22),
            0,
            100
        );

    if(gf>ga)
        player.morale=clamp(player.morale+5,0,100);

    if(gf<ga)
        player.morale=clamp(player.morale-5,0,100);

    if(minutes)
        player.fame+=
            goals*2+
            assists+
            rating>=8?2:0;

    /*
    إصابة عشوائية
    */

    if(
        Math.random()<0.07 &&
        minutes
    ){

        player.fitness=
            clamp(player.fitness-30,0,100);

        addEvent(
            "🩹 تعرضت لإصابة وستحتاج إلى الراحة."
        );
    }

    /*
    بطاقات
    */

    if(
        Math.random()<0.12 &&
        minutes
    ){

        player.yellow++;

        addEvent(
            "🟨 حصلت على بطاقة صفراء."
        );
    }

    if(
        Math.random()<0.025 &&
        minutes
    ){

        player.red++;

        addEvent(
            "🟥 حصلت على بطاقة حمراء وتم إيقافك."
        );
    }

    GAME.money +=
        minutes
        ? GAME.contract.salary
        : Math.round(GAME.contract.salary*.25);

    GAME.week++;

    addLeagueResult(
        club,
        opponent,
        gf,
        ga
    );

    improvePlayer();

    randomCareerEvent();

    saveGame();

    showMatchResult({

        gf,
        ga,
        minutes,
        goals,
        assists,
        rating,
        opponent:opponent.name

    });
}


function addLeagueResult(
    club,
    opponent,
    gf,
    ga
){

    let a=
        GAME.table.find(x=>x.club===club.id);

    let b=
        GAME.table.find(x=>x.club===opponent.id);

    if(!a || !b)
        return;

    a.played++;
    b.played++;

    a.gf+=gf;
    a.ga+=ga;

    b.gf+=ga;
    b.ga+=gf;

    if(gf>ga){

        a.w++;
        a.points+=3;
        b.l++;

    }else if(gf<ga){

        b.w++;
        b.points+=3;
        a.l++;

    }else{

        a.d++;
        b.d++;

        a.points++;
        b.points++;
    }

    GAME.table.sort(
        (x,y)=>
            y.points-x.points ||
            (y.gf-y.ga)-(x.gf-x.ga)
    );
}
