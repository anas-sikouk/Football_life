function calculateOverall(p){

    return Math.round(
        (
            p.pace +
            p.shooting +
            p.passing +
            p.dribbling +
            p.defending +
            p.physical
        ) / 6
    );
}

function createPlayer(){

    const name =
        document.getElementById("name").value.trim()
        || "Young Player";

    const nationality =
        document.getElementById("nationality").value;

    const age =
        Number(document.getElementById("age").value);

    const position =
        document.getElementById("position").value;

    const preferredLeague =
        document.getElementById("league").value;

    let base = random(48,65);

    let player = {

        name,
        nationality,
        age,
        position,
        preferredLeague,

        pace:clamp(base + random(-4,10),40,90),
        shooting:clamp(base + random(-5,12),40,90),
        passing:clamp(base + random(-5,10),40,90),
        dribbling:clamp(base + random(-5,12),40,90),
        defending:random(35,70),
        physical:random(45,75),

        potential:0,

        fame:5,
        morale:70,
        fitness:100,

        goals:0,
        assists:0,
        matches:0,
        minutes:0,

        yellow:0,
        red:0,

        trophies:0,
        ballon:0
    };

    player.overall=calculateOverall(player);

    player.potential=clamp(
        player.overall+random(8,25),
        player.overall,
        94
    );

    return player;
}

function improvePlayer(){

    const p=GAME.player;

    if(p.overall>=p.potential) return;

    const chance =
        0.35 +
        (p.morale/100)*0.2;

    if(Math.random()<chance){

        const attributes=[
            "pace",
            "shooting",
            "passing",
            "dribbling",
            "defending",
            "physical"
        ];

        const attr=
            attributes[random(0,attributes.length-1)];

        if(p[attr]<99){

            p[attr]++;
            p.overall=calculateOverall(p);

            addEvent(
                `📈 تطورت مهارة ${attr} وأصبح Overall الخاص بك ${p.overall}.`
            );
        }
    }
}

function playerLevel(){

    if(GAME.player.overall>=90)
        return "World Class";

    if(GAME.player.overall>=85)
        return "Elite";

    if(GAME.player.overall>=78)
        return "Star";

    if(GAME.player.overall>=70)
        return "Professional";

    if(GAME.player.overall>=60)
        return "Promising";

    return "Young Talent";
}
