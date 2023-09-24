let qtdEquipesValue;
let equipes = [];
let matches = [];

// Script
function createQuantidadeEquipes() {
    let contentContainer = document.getElementById("content-container");

    let title = document.createElement("h1");
    title.setAttribute("class", "title");
    title.innerText = "Informe o número de equipes participantes do torneio";
    contentContainer.appendChild(title);

    let qtdEquipes = document.createElement("input");
    qtdEquipes.setAttribute("class", "input-style input-number");
    qtdEquipes.setAttribute("id", "qtdEquipes");
    qtdEquipes.setAttribute("min", 3);
    qtdEquipes.setAttribute("max", 20);
    qtdEquipes.setAttribute("type", "number");
    qtdEquipes.addEventListener("change", () => {
        qtdEquipesValue = qtdEquipes.value;
        activateButton(validate("content-container", "input"));
    });
    contentContainer.appendChild(qtdEquipes);

    //Botão
    let buttonNext = document.createElement("button");
    buttonNext.setAttribute("class", "button-style");
    buttonNext.setAttribute("id", "button-next");
    buttonNext.disabled = true;
    buttonNext.innerText = "Próximo";
    buttonNext.addEventListener("click", () => {
        clearContainer();
        createJsonEquipes();
        createInformeEquipes();
    });
    contentContainer.appendChild(buttonNext);
}

function createJsonEquipes() {
    for (let i = 0; i < qtdEquipesValue; i++) {
        let equipe = {
            id: i,
            name: "",
            points: "",
            label: "Equipe " + (i + 1),
        }
        equipes.push(equipe);
    }
}

function createInformeEquipes() {
    let contentContainer = document.getElementById("content-container");

    //Título
    let title = document.createElement("h1");
    title.setAttribute("class", "title");
    title.innerText = "Informe as Equipes";
    contentContainer.appendChild(title);

    for (let i = 0; i < equipes.length; i++) {
        let idContainer = "container-" + "equipe" + equipes[i].id;
        let div = document.createElement("div");
        div.setAttribute("class", "position-inputs");
        div.setAttribute("id", idContainer);

        //Label
        let equipeNameLabel = document.createElement("label");
        equipeNameLabel.setAttribute("class", "label-style");
        equipeNameLabel.setAttribute("for", "equipe" + equipes[i].id);
        equipeNameLabel.innerText = equipes[i].label;
        div.appendChild(equipeNameLabel);

        //Input Text
        let equipeNameInput = document.createElement("input");
        equipeNameInput.setAttribute("class", "input-style");
        equipeNameInput.setAttribute("id", "equipe" + equipes[i].id);
        equipeNameInput.setAttribute("maxlength", 12);
        equipeNameInput.setAttribute("type", "text");
        equipeNameInput.addEventListener("change", () => {
            equipes[i].name = equipeNameInput.value;
            activateButton(validate("content-container", "input"));
        });
        div.appendChild(equipeNameInput);

        contentContainer.appendChild(div);
    }

    //Botão
    let buttonNext = document.createElement("button");
    buttonNext.setAttribute("class", "button-style");
    buttonNext.setAttribute("id", "button-next");
    buttonNext.disabled = true;
    buttonNext.innerText = "Próximo";
    buttonNext.addEventListener("click", () => {
        clearContainer();
        createChampionship();
    });
    contentContainer.appendChild(buttonNext);
}

function createChampionship() {
    let contentContainer = document.getElementById("content-container");

    let title = document.createElement("h1");
    title.setAttribute("class", "title");
    title.innerText = "Partidas da Championship College League";
    contentContainer.appendChild(title);

    for (let i = 0, count = 0; i <= equipes.length - 2; i++) {
        for (let j = i + 1; j <= equipes.length - 1; j++) {
            let match = {
                id: count + "-" + equipes[i].id + "X" + equipes[j].id,
                equipe1: equipes[i],
                equipe1IdPartida: equipes[i].id + "X" + equipes[j].id + "equipe" + equipes[i].id,
                equipe2: equipes[j],
                equipe2IdPartida: equipes[i].id + "X" + equipes[j].id + "equipe" + equipes[j].id,
                results: "",
            }
            matches.push(match);
            count++;
            createMatches(match, contentContainer);
        }
    }

    let buttonNext = document.createElement("button");
    buttonNext.setAttribute("class", "button-style");
    buttonNext.setAttribute("id", "button-next");
    buttonNext.disabled = true;
    buttonNext.innerText = "Próximo";
    buttonNext.addEventListener("click", () => {
        disableSelects("content-container");
        confirmSelectedOptions("content-container");
        sortEquipesPerPoints();
        buttonNext.remove();
        createTablePoints(contentContainer);
        console.log(matches);
    });
    contentContainer.appendChild(buttonNext);
}

function createMatches(match, contentContainer) {
    let containerJogo = document.createElement("div");
    containerJogo.setAttribute("class", "position-inputs");
    containerJogo.setAttribute("id", "container-match" + match.id);

    let containerLabelsMatch = document.createElement("div");
    containerLabelsMatch.setAttribute("class", "position-matches");

    let equipe1Label = document.createElement("div");
    equipe1Label.setAttribute("class", "label-color");
    equipe1Label.innerText = match.equipe1.name;
    containerLabelsMatch.appendChild(equipe1Label);

    let versus = document.createElement("div");
    versus.innerText = "X";
    containerLabelsMatch.appendChild(versus);

    let equipe2Label = document.createElement("div");
    equipe2Label.setAttribute("class", "label-color");
    equipe2Label.innerText = match.equipe2.name;
    containerLabelsMatch.appendChild(equipe2Label);

    containerJogo.appendChild(containerLabelsMatch);

    let results = document.createElement("select");
    results.setAttribute("class", "select-style");
    results.setAttribute("id", "select-" + match.id);
    let optSelect = document.createElement("option");
    optSelect.innerText = "Selecione";
    optSelect.setAttribute("value", "");
    let optEmpate = document.createElement("option");
    optEmpate.innerText = "Empate";
    optEmpate.setAttribute("value", "empate");
    let optEquipe1 = document.createElement("option");
    optEquipe1.innerText = "Vencedor-" + match.equipe1.name;
    optEquipe1.setAttribute("value", "equipe1");
    let optEquipe2 = document.createElement("option");
    optEquipe2.innerText = "Vencedor-" + match.equipe2.name;
    optEquipe2.setAttribute("value", "equipe2");

    results.add(optSelect, null);
    results.add(optEmpate, null);
    results.add(optEquipe1, null);
    results.add(optEquipe2, null);

    results.addEventListener("change", () => {
        activateButton(validate("content-container", "select"));
    });

    containerJogo.appendChild(results);

    contentContainer.appendChild(containerJogo);
}

function createTablePoints(contentContainer) {
    let title = document.createElement("h1");
    title.setAttribute("class", "title");
    title.innerText = "Tabela de Pontos da Championship College League";
    contentContainer.appendChild(title);

    let table = document.createElement("table");
    table.setAttribute("class", "table-style");

    let trTitle = document.createElement("tr");
    trTitle.setAttribute("class", "tr-style");
    let thEquipe = document.createElement("th");
    thEquipe.setAttribute("class", "th-style");
    thEquipe.innerText = "Nome da Equipe";
    trTitle.appendChild(thEquipe);
    let thPoints = document.createElement("th");
    thPoints.setAttribute("class", "th-style");
    thPoints.innerText = "Total de Pontos";
    trTitle.appendChild(thPoints);
    table.appendChild(trTitle);

    for (let equipe of equipes) {
        let trPontuacao = document.createElement("tr");
        trPontuacao.setAttribute("class", "tr-style");

        let tdEquipe = document.createElement("td");
        tdEquipe.setAttribute("class", "td-style");
        tdEquipe.innerText = equipe.name;
        trPontuacao.appendChild(tdEquipe);
        let tdPoints = document.createElement("td");
        tdPoints.setAttribute("class", "td-style");
        tdPoints.innerText = equipe.points;
        trPontuacao.appendChild(tdPoints);
        table.appendChild(trPontuacao);
    }

    contentContainer.appendChild(table);
}

function clearContainer() {
    document.getElementById("content-container").innerHTML = "";
}

function confirmSelectedOptions(container) {
    let campos = document.getElementById(container).getElementsByTagName("select");
    for (let campo of campos) {
        let matchId = campo.id.split("-")[1];
        let match = matches[matchId];
        let optSelected = campo.value;
        if (optSelected == "empate") {
            match.equipe1.points++;
            match.equipe2.points++;
            match.results = "empate";
        } else if (optSelected == "equipe1") {
            match.equipe1.points += 3;
            match.results = "equipe1";
        } else if (optSelected == "equipe2") {
            match.equipe2.points += 3;
            match.results = "equipe2";
        }
    }
}

function disableSelects(container) {
    let campos = document.getElementById(container).getElementsByTagName("select");
    for (let campo of campos) {
        campo.disabled = true;
    }
}

function sortEquipesPerPoints() {
    equipes.sort((a, b) => {
        return b.points - a.points;
    });
}

function validate(container, tag) {
    let campos = document.getElementById(container).getElementsByTagName(tag);
    let valid = true;
    for (let campo of campos) {
        valid = valid && (campo.value.trim().length > 0);
        if (!valid) {
            break;
        }
    }
    return valid;
}

function activateButton(active) {
    document.getElementById("button-next").disabled = !active;
}

function save() {

}

function load() {

}

createQuantidadeEquipes();