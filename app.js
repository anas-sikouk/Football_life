let GAME=loadGame();


function euro(number){

    return new Intl.NumberFormat(
        "fr-FR",
        {
            style:"currency",
            currency:"EUR",
            maximumFractionDigits:0
        }
    ).format(number);
}


function render(){

    if(!GAME){

        renderStart();

    }else if(!GAME.club){

        renderOffers();

    }else{

        renderDashboard();

    }
}


function renderStart(){

    document.getElementById("app").innerHTML=`

    <div class="container">

        <div class="hero">

            <h1>⚽ Football Life</h1>

            <p class="muted">
                اصنع مسيرتك من لاعب شاب إلى أسطورة كرة القدم.
            </p>

        </div>

        <div class="card">

            <h2>إنشاء اللاعب</h2>

            <br>

            <div class="form">

                <label>
                    الاسم
                    <input id="name"
                    placeholder="مثلاً Anas">
                </label>

                <label>
                    الجنسية
                    <select id="nationality">

                        ${COUNTRIES.map(c=>
                            `<option>${c}</option>`
                        ).join("")}

                    </select>
                </label>

                <label>
                    العمر
                    <select id="age">

                        ${[16,17,18,19,20,21,22]
                            .map(a=>
                            `<option>${a}</option>`
                            ).join("")}

                    </select>
                </label>

                <label>
                    المركز
                    <select id="position">

                        <option>ST</option>
                        <option>LW</option>
                        <option>RW</option>
                        <option>CAM</option>
                        <option>CM</option>
                        <option>CDM</option>
                        <option>CB</option>
                        <option>LB</option>
                        <option>RB</option>
                        <option>GK</option>

                    </select>
                </label>

                <label>
                    الدوري المفضل
                    <select id="league">

                        <option>Morocco First</option>
                        <option>England First</option>
                        <option>Spain First</option>
                        <option>Italy First</option>
                        <option>Germany First</option>
                        <option>France First</option>

                    </select>
                </label>

            </div>

            <div class="actions">

                <button onclick="startCareer()">
                    🧪 ابدأ الاختبار
                </button>

            </div>

        </div>

    </div>

    `;
}


function renderOffers(){

    const p=GAME.player;

    document.getElementById("app").innerHTML=`

    <div class="container">

        <div class="hero">

            <h1>🧪 نتيجة الاختبار</h1>

            <p>
                ${p.name}
                · ${p.position}
                · ${p.nationality}
            </p>

            <div class="ovr">
                ${p.overall}
            </div>

            <p>
                Overall
            </p>

            <span class="badge">
                Potential ${p.potential}
            </span>

            <span class="badge">
                ${playerLevel()}
            </span>

        </div>

        <h2>📩 عروض الأندية</h2>

        <br>

        <div class="grid">

            ${GAME.offers.map((o,i)=>{

                const club=
                    CLUBS.find(
                        c=>c.id===o.club
                    );

                return `

                <div class="offer">

                    <h2>${club.name}</h2>

                    <span class="badge">
                        ${club.country}
                    </span>

                    <span class="badge">
                        ${club.league}
                    </span>

                    <p>
                        قوة النادي:
                        <b>${club.strength}</b>
                    </p>

                    <p>
                        الراتب:
                        <b class="gold">
                            ${euro(o.salary)}
                        </b>
                        / أسبوع
                    </p>

                    <br>

                    <button
                        onclick="signContract(${i})">

                        ✍️ توقيع العقد

                    </button>

                </div>

                `;

            }).join("")}

        </div>

    </div>

    `;
}


function renderDashboard(){

    const p=GAME.player;
    const c=GAME.club;

    document.getElementById("app").innerHTML=`

    <div class="topbar">

        <div class="logo">
            ⚽ <span>Football</span> Life
        </div>

        <div class="money">
            ${euro(GAME.money)}
        </div>

    </div>

    <div class="container">

        <div class="nav">

            <button onclick="renderDashboard()">
                🏠
            </button>

            <button onclick="renderMatchPage()">
                ⚽ مباراة
            </button>

            <button onclick="renderStandings()">
                📊 الدوري
            </button>

            <button onclick="renderPlayer()">
                👤 اللاعب
            </button>

            <button onclick="renderTransfers()">
                🔄 الانتقالات
            </button>

            <button onclick="renderLife()">
                🏠 الحياة
            </button>

        </div>

        <div class="hero player-card">

            <span class="badge">
                ${c.name}
            </span>

            <span class="badge">
                ${p.position}
            </span>

            <span class="badge">
                ${p.nationality}
            </span>

            <h1>${p.name}</h1>

            <div class="ovr">
                ${p.overall}
            </div>

            <p>
                ${playerLevel()}
                · Potential ${p.potential}
            </p>

        </div>

        <div class="grid">

            <div class="card">

                <h3>📅 الموسم</h3>

                <div class="stat">
                    ${GAME.season}
                </div>

                <p class="muted">
                    الأسبوع ${GAME.week}
                </p>

            </div>

            <div class="card">

                <h3>⚽ المسيرة</h3>

                <p>
                    مباريات:
                    <b>${p.matches}</b>
                </p>

                <p>
                    أهداف:
                    <b>${p.goals}</b>
                </p>

                <p>
                    تمريرات:
                    <b>${p.assists}</b>
                </p>

            </div>

            <div class="card">

                <h3>❤️ الحالة</h3>

                <p>
                    المعنويات:
                    ${p.morale}%
                </p>

                <div class="bar">
                    <i style="width:${p.morale}%"></i>
                </div>

                <p>
                    اللياقة:
                    ${p.fitness}%
                </p>

                <div class="bar">
                    <i style="width:${p.fitness}%"></i>
                </div>

            </div>

            <div class="card">

                <h3>🏆 الجوائز</h3>

                <p>
                    البطولات:
                    <b>${p.trophies}</b>
                </p>

                <p>
                    Ballon d'Or:
                    <b>${p.ballon}</b>
                </p>

            </div>

        </div>

        <br>

        <div class="card">

            <h3>📰 آخر الأخبار</h3>

            ${
                GAME.events.slice(0,8)
                .map(e=>
                    `<div class="event">
                        ${e.text}
                        <small class="muted">
                            ${e.date}
                        </small>
                    </div>`
                ).join("")
                ||
                `<p class="muted">
                    لا توجد أحداث بعد.
                </p>`
            }

        </div>

        <div class="actions">

            <button
                class="blue"
                onclick="nextSeason()">

                ⏭️ بداية الموسم التالي

            </button>

            <button
                class="red"
                onclick="deleteSave()">

                🗑️ حذف المسيرة

            </button>

        </div>

    </div>

    `;
}


function renderMatchPage(){

    const c=GAME.club;

    const opponents=
        CLUBS.filter(x=>
            x.league===c.league &&
            x.id!==c.id
        );

    const opponent=
        opponents[random(
            0,
            opponents.length-1
        )];

    document.getElementById("app").innerHTML=`

    <div class="container">

        <div class="hero center">

            <h1>⚽ Matchday</h1>

            <p>
                ${c.name}
                VS
                ${opponent.name}
            </p>

            <div class="score">
                ?
            </div>

            <p class="muted">
                لياقتك:
                ${GAME.player.fitness}%
            </p>

            <div class="actions"
                 style="justify-content:center">

                <button
                    onclick="simulateMatch()">

                    ▶️ لعب المباراة

                </button>

                <button
                    class="dark"
                    onclick="renderDashboard()">

                    عودة

                </button>

            </div>

        </div>

    </div>

    `;
}


function showMatchResult(r){

    document.getElementById("app").innerHTML=`

    <div class="container">

        <div class="hero center">

            <h1>
                ${r.gf} - ${r.ga}
            </h1>

            <p>
                ${GAME.club.name}
                ${
                    r.opponent
                    ? " VS "+r.opponent
                    : ""
                }
            </p>

        </div>

        <div class="grid">

            <div class="card">
                <h3>⏱️ الدقائق</h3>
                <div class="big">${r.minutes}</div>
            </div>

            <div class="card">
                <h3>⭐ التقييم</h3>
                <div class="big">
                    ${r.rating?r.rating.toFixed(1):"—"}
                </div>
            </div>

            <div class="card">
                <h3>⚽ الأهداف</h3>
                <div class="big">${r.goals}</div>
            </div>

            <div class="card">
                <h3>🎯 التمريرات</h3>
                <div class="big">${r.assists}</div>
            </div>

        </div>

        <div class="actions">

            <button onclick="renderDashboard()">
                🏠 متابعة المسيرة
            </button>

            <button
                class="blue"
                onclick="renderMatchPage()">

                ⚽ مباراة أخرى

            </button>

        </div>

    </div>

    `;
}


function renderStandings(){

    document.getElementById("app").innerHTML=`

    <div class="container">

        <div class="card">

            <h2>
                📊 ${GAME.club.league}
            </h2>

            <br>

            <table class="table">

                <tr>
                    <th>#</th>
                    <th>النادي</th>
                    <th>ل</th>
                    <th>ف</th>
                    <th>ت</th>
                    <th>خ</th>
                    <th>ن</th>
                </tr>

                ${
                    GAME.table.map((x,i)=>{

                        const club=
                            CLUBS.find(
                                c=>c.id===x.club
                            );

                        return `

                        <tr class="${
                            x.club===GAME.club.id
                            ?"me":""
                        }">

                            <td>${i+1}</td>

                            <td>
                                ${club.name}
                            </td>

                            <td>
                                ${x.played}
                            </td>

                            <td>${x.w}</td>

                            <td>${x.d}</td>

                            <td>${x.l}</td>

                            <td>
                                <b>${x.points}</b>
                            </td>

                        </tr>

                        `;

                    }).join("")
                }

            </table>

            <div class="actions">

                <button
                    onclick="renderDashboard()">

                    عودة

                </button>

            </div>

        </div>

    </div>

    `;
}


function renderPlayer(){

    const p=GAME.player;

    const stats=[
        ["السرعة","pace"],
        ["التسديد","shooting"],
        ["التمرير","passing"],
        ["المراوغة","dribbling"],
        ["الدفاع","defending"],
        ["القوة","physical"]
    ];

    document.getElementById("app").innerHTML=`

    <div class="container">

        <div class="hero">

            <h1>👤 ${p.name}</h1>

            <p>
                ${p.nationality}
                · ${p.position}
            </p>

            <div class="ovr">
                ${p.overall}
            </div>

            <p>
                Overall
            </p>

        </div>

        <div class="grid">

            ${stats.map(s=>`

                <div class="card">

                    <h3>${s[0]}</h3>

                    <div class="stat">
                        ${p[s[1]]}
                    </div>

                    <div class="bar">

                        <i style="
                            width:${p[s[1]]}%
                        "></i>

                    </div>

                </div>

            `).join("")}

        </div>

        <div class="actions">

            <button onclick="renderDashboard()">
                عودة
            </button>

        </div>

    </div>

    `;
}


function renderTransfers(){

    const clubs=
        transferMarket();

    document.getElementById("app").innerHTML=`

    <div class="container">

        <div class="hero">

            <h1>🔄 سوق الانتقالات</h1>

            <p class="muted">
                الوكيل يبحث عن أفضل فرصة لمسيرتك.
            </p>

        </div>

        <div class="grid">

            ${clubs.map(c=>`

                <div class="offer">

                    <h2>${c.name}</h2>

                    <span class="badge">
                        ${c.league}
                    </span>

                    <p>
                        قوة النادي:
                        ${c.strength}
                    </p>

                    <p>
                        راتب متوقع:
                        <b class="gold">
                            ${euro(
                                Math.round(
                                    c.strength*150+
                                    GAME.player.overall*120
                                )
                            )}
                        </b>
                    </p>

                    <br>

                    <button
                        onclick="negotiateTransfer('${c.id}')">

                        🤝 تفاوض

                    </button>

                </div>

            `).join("")}

        </div>

    </div>

    `;
}


function renderLife(){

    document.getElementById("app").innerHTML=`

    <div class="container">

        <div class="hero">

            <h1>🌆 حياتك خارج الملعب</h1>

            <p>
                المال: <b class="gold">
                    ${euro(GAME.money)}
                </b>
            </p>

        </div>

        <h2>🚗 السيارات</h2>

        <br>

        <div class="grid">

            ${CARS.map((c,i)=>`

                <div class="card">

                    <h3>${c.name}</h3>

                    <p>
                        ${euro(c.price)}
                    </p>

                    <button
                        onclick="buyCar(${i})">

                        شراء

                    </button>

                </div>

            `).join("")}

        </div>

        <br>

        <h2>🏠 المنازل</h2>

        <br>

        <div class="grid">

            ${HOUSES.map((h,i)=>`

                <div class="card">

                    <h3>${h.name}</h3>

                    <p>
                        ${euro(h.price)}
                    </p>

                    <button
                        onclick="buyHouse(${i})">

                        شراء

                    </button>

                </div>

            `).join("")}

        </div>

        <br>

        <h2>🤝 الرعاة</h2>

        <br>

        <div class="grid">

            ${SPONSORS.map((s,i)=>`

                <div class="card">

                    <h3>${s.name}</h3>

                    <p>
                        مطلوب شهرة:
                        ${s.minRep}
                    </p>

                    <p class="gold">
                        ${euro(s.money)}
                    </p>

                    <button
                        onclick="signSponsor(${i})">

                        توقيع

                    </button>

                </div>

            `).join("")}

        </div>

        <br>

        <div class="card">

            <h2>❤️ العلاقات</h2>

            <p>

                ${
                    GAME.relationship.partner
                    ? GAME.relationship.married
                        ? `💍 متزوج · 👶 الأطفال: ${GAME.relationship.children}`
                        : "❤️ في علاقة"
                    : "أعزب"
                }

            </p>

            <div class="actions">

                <button
                    onclick="relationshipAction()">

                    ${
                        !GAME.relationship.partner
                        ?"❤️ بدء علاقة"
                        :
                        !GAME.relationship.married
                        ?"💍 الزواج"
                        :"👶 حدث عائلي"
                    }

                </button>

            </div>

        </div>

        <div class="actions">

            <button onclick="renderDashboard()">
                عودة
            </button>

        </div>

    </div>

    `;
}


render();
