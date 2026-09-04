function calculateSeasonAwards(){

    const p=GAME.player;

    /*
    الحذاء الذهبي
    */

    if(p.goals>=25){

        p.trophies++;

        addEvent(
            "🥇 فزت بجائزة الحذاء الذهبي."
        );
    }

    /*
    أفضل لاعب
    */

    if(
        p.overall>=85 &&
        p.fame>=60 &&
        p.goals>=15
    ){

        p.trophies++;

        addEvent(
            "⭐ تم اختيارك أفضل لاعب في الموسم."
        );
    }

    /*
    أفضل لاعب شاب
    */

    if(
        p.age<=23 &&
        p.overall>=75
    ){

        p.trophies++;

        addEvent(
            "🌟 فزت بجائزة أفضل لاعب شاب."
        );
    }

    /*
    Ballon d'Or
    */

    if(
        p.overall>=90 &&
        p.goals>=30 &&
        p.fame>=80
    ){

        p.ballon++;

        p.trophies++;

        addEvent(
            "🏆🏆 فزت بالـ Ballon d'Or!"
        );
    }

    /*
    reset seasonal stats
    */

    p.goals=0;
    p.assists=0;
    p.matches=0;
    p.minutes=0;
}
