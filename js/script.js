/* VARIAVEIS GLOBAIS */
const select_mvp = document.getElementById("select-boss");
const select_spot = document.getElementById("select-spot");
const select_time = document.getElementById("select-time");
const table_boss = document.getElementById("table-boss");
const url = "https://ragnarokapi.herokuapp.com/api/v1.0/monster/";

var id_boss = [1059, 1511, 1096, 1388, 1785, 1039, 1389];

/* var keyapi = "?apiKey=91d8c57dbde07fb4532a90ee8f61af4c"; *USAR, CASO FOR API-DIVINEPRIDE PRIDE* */


/* FIM VARIAVEIS GLOBAIS */
function fillSelectSpot() {
    for (let i = 1; i <= 9; i++) {
        select_spot.options[select_spot.options.length] = new Option('SPOT ' + i, 'value')
    }
}

function getApi(id_boss) {
    let request = new XMLHttpRequest()
    request.open("GET", url + id_boss, false)
    request.send()
    return request.responseText
}

/* ALIMENTANDO SELECT */
function main() {
    for (let i = 0; i < id_boss.length; i++) {
        get = getApi(id_boss[i]);
        boss = JSON.parse(get);

        select_mvp.options[select_mvp.options.length] = new Option(boss.name, boss.id);
    }
}
/* FIM SELECT */

/* TABELA */
function fillTable(buttonText) {
    let id_tbl = select_mvp.options[select_mvp.selectedIndex].value;
    let name_tbl = select_mvp.options[select_mvp.selectedIndex].text;
    let spot_tbl = select_spot.options[select_spot.selectedIndex].text;
    let death_tbl = select_time.value;

    let amount_rows = table_boss.rows.length;
    let rows = table_boss.insertRow(amount_rows);


    let cell_id = rows.insertCell(0);
    let cell_name = rows.insertCell(1);
    let cell_sprite = rows.insertCell(2);
    let cell_map = rows.insertCell(3);
    let cell_spot = rows.insertCell(4);
    let cell_death = rows.insertCell(5);

    cell_id.innerHTML = id_tbl;
    cell_name.innerHTML = name_tbl;
    cell_sprite.innerHTML = `<img src=${boss.gifUrl}>`;;
    if (boss.spawnMaps.length > 1) {
        cell_map.innerHTML = buttonText;
    } else {
        cell_map.innerHTML = boss.spawnMaps[0].mapID;
    }
    cell_spot.innerHTML = spot_tbl;
    cell_death.innerHTML = death_tbl;

}
/* FIM TABELA */

/* CONDIÇÕES DE INSERÇÃO CASO RESPAWN FOR MAIOR QUE 1*/
function conditionsAddTable() {

    id_boss = select_mvp.value
    get = getApi(id_boss);
    boss = JSON.parse(get);

    if (boss.spawnMaps.length > 1) {
        $("#modalRespawn").modal('show');
        for (let i = 0; i < boss.spawnMaps.length; i++) {
            $("#button-map").append(`<button class="btn btn-primary button-add" type="submit" name="${boss.spawnMaps[i].mapId}" onclick="fillTable(this.name)">${boss.spawnMaps[i].mapId}</button>`)
            $(":submit").on("click", function () {
                $("#modalRespawn").modal('hide');
            });
        }
        $("#modalRespawn").on("hidden.bs.modal", function () {
            $(".modal-body", "#modalRespawn").empty();
        });
    } else {
        fillTable();
    }
}
