let qtdEquipesValue;
let equipes = [];
let matches = [];
let torneioInteiro = {
    equipes: [],
    matches: [],
    qtdEquipesValue: 0
}
// Script
function createStartChampionship() {
    let contentContainer = document.getElementById("content-container");

    let containerButtons = document.createElement("div");
    containerButtons.setAttribute("class", "position-inputs");

    let title = document.createElement("h1");
    title.setAttribute("class", "title");
    title.innerText = "Começar o Championship College League";
    contentContainer.appendChild(title);

    let buttonNew = document.createElement("button");
    buttonNew.setAttribute("class", "button-style");
    buttonNew.innerText = "Novo Torneio";
    buttonNew.addEventListener("click", () => {
        clearContainer();
        createQuantidadeEquipes();
    });
    containerButtons.appendChild(buttonNew);

    let buttonLoad = document.createElement("button");
    buttonLoad.setAttribute("class", "button-style");
    buttonLoad.innerText = "Carregar Torneio";
    buttonLoad.disabled = true;
    buttonLoad.addEventListener("click", () => {
        clearContainer();
        load();
    });

    let torneio = localStorage.getItem("torneio");
    if (torneio != null && torneio != undefined) {
        buttonLoad.disabled = false;
    }

    containerButtons.appendChild(buttonLoad);

    contentContainer.appendChild(containerButtons);
}

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
            points: 0,
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
        equipeNameInput.setAttribute("value", equipes[i].name);
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
        createModelMatches();
        createChampionship();
    });
    contentContainer.appendChild(buttonNext);

    //Validando se já existem todos os nomes das equipes
    validateLoadedInputs(equipes, "name");

    //Botões Save/Load
    buttonsLocalStorage(contentContainer, "Carregar Torneio", load);
}

function createChampionship() {
    let contentContainer = document.getElementById("content-container");

    let title = document.createElement("h1");
    title.setAttribute("class", "title");
    title.innerText = "Partidas da Championship College League";
    contentContainer.appendChild(title);

    for (let match of matches) {
        createMatches(match, contentContainer);
    }

    let buttonNext = document.createElement("button");
    buttonNext.setAttribute("class", "button-style");
    buttonNext.setAttribute("id", "button-next");
    buttonNext.disabled = true;
    buttonNext.innerText = "Resultados";
    buttonNext.addEventListener("click", () => {
        disableSelects("content-container");
        confirmSelectedOptions("content-container");
        sortEquipesPerPoints();
        buttonNext.remove();
        removeBottonsLocalStorage();
        createTablePoints(contentContainer);
    });
    contentContainer.appendChild(buttonNext);

    //Validando se já existem todos os nomes das equipes
    validateLoadedInputs(matches, "results");

    buttonsLocalStorage(contentContainer, "Carregar Torneio", load);
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

    if (match.results == "empate") {
        optEmpate.selected = true;
    } else if (match.results == "equipe1") {
        optEquipe1.selected = true;
    } else if (match.results == "equipe2") {
        optEquipe2.selected = true;
    }

    results.add(optSelect, null);
    results.add(optEmpate, null);
    results.add(optEquipe1, null);
    results.add(optEquipe2, null);

    results.addEventListener("change", () => {
        match.results = results.value;
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

    buttonsLocalStorage(contentContainer, "Reiniciar Torneio", clear);
}

function createModelMatches() {
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

        }
    }
}

function clearContainer() {
    document.getElementById("content-container").innerHTML = "";
}

function confirmSelectedOptions(container) {
    let verifyPonitsSets = false;
    for (let equipe of equipes) {
        if (equipe.points != 0) {
            verifyPonitsSets = true;
            break;
        }
    }

    if (!verifyPonitsSets) {
        let campos = document.getElementById(container).getElementsByTagName("select");
        for (let campo of campos) {
            let matchId = campo.id.split("-")[1];
            let match = matches[matchId];
            let optSelected = campo.value;

            if (optSelected == "empate") {
                equipes[match.equipe1.id].points++;
                equipes[match.equipe2.id].points++;
                match.results = "empate";
            } else if (optSelected == "equipe1") {
                equipes[match.equipe1.id].points += 3;
                match.results = "equipe1";
            } else if (optSelected == "equipe2") {
                equipes[match.equipe2.id].points += 3;
                match.results = "equipe2";
            }

            match.equipe1.points = equipes[match.equipe1.id].points;
            match.equipe2.points = equipes[match.equipe2.id].points;
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

function validateLoadedInputs(obj, condition) {
    let verifyInputValue;
    for (let o of obj) {
        verifyInputValue = true;
        if (condition == "name") {
            if (o.name == "") {
                verifyInputValue = false;
                break;
            }
        } else if (condition == "results") {
            if (o.results == "") {
                verifyInputValue = false;
                break;
            }
        }
    }

    if (verifyInputValue) {
        document.getElementById("button-next").disabled = false;
    }
}

function activateButton(active) {
    document.getElementById("button-next").disabled = !active;
}

function save() {
    torneioInteiro.equipes = equipes;
    torneioInteiro.matches = matches;
    torneioInteiro.qtdEquipesValue = qtdEquipesValue;
    localStorage.setItem("torneio", JSON.stringify(torneioInteiro));
    alert("Torneio salvo com sucesso!");
}

function load() {
    clearContainer();
    let torneio = localStorage.getItem("torneio");
    if (torneio != null && torneio != undefined) {
        torneioInteiro = JSON.parse(torneio);
    }
    equipes = torneioInteiro.equipes;
    matches = torneioInteiro.matches;
    qtdEquipesValue = torneioInteiro.qtdEquipesValue;

    if (torneioInteiro.qtdEquipesValue == 0) {
        window.location.reload();
    } else if (torneioInteiro.qtdEquipesValue > 0 && torneioInteiro.equipes.length > 0 && torneioInteiro.matches.length == 0) {
        createInformeEquipes();
    } else if (torneioInteiro.qtdEquipesValue > 0 && torneioInteiro.equipes.length > 0 && torneioInteiro.matches.length > 0) {
        let allresults;
        let setPoints = false;

        for (let match of torneioInteiro.matches) {
            allresults = true;
            if (match.results == "") {
                allresults = false;
                break;
            }

            if (match.equipe1.points != 0 || match.equipe2.points != 0) {
                setPoints = true;
            }

        }

        if (allresults) {
            createChampionship();
            if (setPoints) {
                document.getElementById("button-next").click();
            }
        } else {
            createChampionship();
        }
    }
}

function clear() {
    localStorage.removeItem('torneio');
    window.location.reload();
}

function removeBottonsLocalStorage() {
    document.getElementById('button-save').remove();
    document.getElementById('button-load').remove();
}

function buttonsLocalStorage(contentContainer, namebuttonLoad, functionButtonLoad) {
    let containerButtons = document.createElement("div");
    containerButtons.setAttribute("class", "position-matches gapButtons");

    //Botão Salvar
    let buttonSave = document.createElement("button");
    buttonSave.setAttribute("class", "button-style button-smaller");
    buttonSave.setAttribute("id", "button-save");
    buttonSave.innerText = "Salvar Torneio";
    buttonSave.addEventListener("click", () => {
        save();
    });
    containerButtons.appendChild(buttonSave);

    //Botão Carregar
    let buttonLoad = document.createElement("button");
    buttonLoad.setAttribute("class", "button-style button-smaller");
    buttonLoad.setAttribute("id", "button-load");
    buttonLoad.innerText = namebuttonLoad //"Carregar Torneio";
    buttonLoad.addEventListener("click", () => {
        functionButtonLoad();
    });
    containerButtons.appendChild(buttonLoad);

    contentContainer.appendChild(containerButtons);
}

createStartChampionship();