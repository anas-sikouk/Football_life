const SAVE_KEY=
    "FOOTBALL_LIFE_COMPLETE_V1";


function saveGame(){

    if(!GAME)
        return;

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(GAME)
    );
}


function loadGame(){

    const data=
        localStorage.getItem(SAVE_KEY);

    if(!data)
        return null;

    try{

        return JSON.parse(data);

    }catch(e){

        return null;
    }
}


function deleteSave(){

    localStorage.removeItem(
        SAVE_KEY
    );

    location.reload();
}


function random(min,max){

    return Math.floor(
        Math.random()*(max-min+1)
    )+min;
}


function clamp(value,min,max){

    return Math.max(
        min,
        Math.min(max,value)
    );
}


function toast(message){

    const el=
        document.createElement("div");

    el.className="toast";

    el.textContent=message;

    document.body.appendChild(el);

    setTimeout(
        ()=>el.remove(),
        2200
    );
}
