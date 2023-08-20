// //Estrutura Do Gadget:

let times = [
    {
        id: "time1",
        label: "Primeiro Time",
        color: "#FF0000",
        name: "",
        numGols: null,
    },
    {
        id: "time2",
        label: "Segundo Time",
        color: "#00FF00",
        name: "",
        numGols: null,
    },
    {
        id: "time3",
        label: "Terceiro Time",
        color: "#0000FF",
        name: "",
        numGols: null,
    },
    {
        id: "time4",
        label: "Quarto Time",
        color: "#FF00FF",
        name: "",
        numGols: null,
    },
];

// Script

function createInformeTimes() {
    let contentContainer = document.getElementById("content-container");

    //Título
    let title = document.createElement("h1");
    title.setAttribute("class", "title");
    title.innerText = "Informe os Times";
    contentContainer.appendChild(title);

    for (let time of times) {
        let idContainer = "container-" + time.id;
        let div = document.createElement("div");
        div.setAttribute("class", "position-inputs");
        div.setAttribute("id", idContainer);

        //Label
        let timeNameLabel = document.createElement("label");
        timeNameLabel.setAttribute("class", "label-style");
        timeNameLabel.setAttribute("for", "name-" + time.id);
        timeNameLabel.innerText = time.label;
        div.appendChild(timeNameLabel);

        //Input Text
        let timeNameInput = document.createElement("input");
        timeNameInput.setAttribute("class", "input-style");
        timeNameInput.setAttribute("id", "name-" + time.id);
        timeNameInput.setAttribute("maxlength", 12);
        timeNameInput.setAttribute("type", "text");
        timeNameInput.addEventListener("change", () => {
            time.name = timeNameInput.value;
            activateButton(validate("content-container"));
        });
        div.appendChild(timeNameInput);

        //Label
        let timeColorLabel = document.createElement("label");
        timeColorLabel.setAttribute("class", "label-color");
        timeColorLabel.setAttribute("for", "color-" + time.id);
        timeColorLabel.innerText = "Cor";
        div.appendChild(timeColorLabel);

        //Input Color
        let timeColorInput = document.createElement("input");
        timeColorInput.setAttribute("class", "input-color");
        timeColorInput.setAttribute("id", "color-" + time.id);
        timeColorInput.setAttribute("type", "color");
        timeColorInput.setAttribute("value", time.color);
        timeColorInput.addEventListener("change", () => {
            time.color = timeColorInput.value;
            activateButton(validate("content-container"));
        });
        div.appendChild(timeColorInput);

        //Adiciona a  div do time
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
        createNextMatch();
    });
    contentContainer.appendChild(buttonNext);
}

function clearContainer() {
    document.getElementById("content-container").innerHTML = "";
}

function createNextMatch() {
    let timeA = getTimeById(commonMatches[currentMatch].timeAID);
    let timeB = getTimeById(commonMatches[currentMatch].timeBID);

    let contentContainer = document.getElementById("content-container");

    let title = document.createElement("h1");
    title.setAttribute("class", "title");
    title.innerText = commonMatches[currentMatch].match;
    contentContainer.appendChild(title);

    let containerJogo = document.createElement("div");
    containerJogo.setAttribute("class", "position-inputs");
    containerJogo.setAttribute("id", "container-match")

    let timeALabel = document.createElement("label");
    timeALabel.setAttribute("class", "label-color");
    timeALabel.setAttribute("for", "name-" + timeA.id);
    timeALabel.innerText = timeA.name;
    containerJogo.appendChild(timeALabel);

    let timeAInput = document.createElement("input");
    timeAInput.setAttribute("class", "input-style input-number");
    timeAInput.setAttribute("id", "name-" + timeA.id);
    timeAInput.setAttribute("min", 0);
    timeAInput.setAttribute("type", "number");
    timeAInput.addEventListener("change", () => {
        timeA.numGols = timeAInput.value;
        if (validate("container-match")) {
            if (timeA.numGols == timeB.numGols) {
                containerPenalts.style.display = "flex";
                penaltsTitle.style.display = "flex";
            } else {
                activateButton(validate("container-match"));
            }
        }
    });
    containerJogo.appendChild(timeAInput);

    let versus = document.createElement("div");
    versus.innerText = "X";
    containerJogo.appendChild(versus);

    let timeBInput = document.createElement("input");
    timeBInput.setAttribute("class", "input-style input-number");
    timeBInput.setAttribute("id", "name-" + timeB.id);
    timeBInput.setAttribute("min", 0);
    timeBInput.setAttribute("type", "number");
    timeBInput.addEventListener("change", () => {
        timeB.numGols = timeBInput.value;
        if (validate("container-match")) {
            if (timeA.numGols == timeB.numGols) {
                containerPenalts.style.display = "flex";
                penaltsTitle.style.display = "flex";
            } else {
                activateButton(validate("container-match"));
            }
        }
    });
    containerJogo.appendChild(timeBInput);

    let timeBLabel = document.createElement("label");
    timeBLabel.setAttribute("class", "label-color");
    timeBLabel.setAttribute("for", "name-" + timeB.id);
    timeBLabel.innerText = timeB.name;
    containerJogo.appendChild(timeBLabel);

    contentContainer.appendChild(containerJogo);

    let containerPenalts = document.createElement("div");
    containerPenalts.setAttribute("class", "position-inputs");
    containerPenalts.style.display = "none";
    containerPenalts.setAttribute("id", "container-match-penalts")

    let penaltsTitle = document.createElement("h1");
    penaltsTitle.setAttribute("class", "title");
    penaltsTitle.innerText = "Penalts";
    penaltsTitle.style.display = "none";
    contentContainer.appendChild(penaltsTitle);

    let penaltsALabel = document.createElement("label");
    penaltsALabel.setAttribute("class", "label-color");
    penaltsALabel.setAttribute("for", "name-" + timeA.id);
    penaltsALabel.innerText = timeA.name;
    containerPenalts.appendChild(penaltsALabel);

    let penaltsAInput = document.createElement("input");
    penaltsAInput.setAttribute("class", "input-style input-number");
    penaltsAInput.setAttribute("id", "name-" + timeA.id);
    penaltsAInput.setAttribute("min", 0);
    penaltsAInput.setAttribute("type", "number");
    penaltsAInput.addEventListener("change", () => {
        timeA.numGols = penaltsAInput.value;
        validate("container-match-penalts");
        if (timeA.numGols > timeB.numGols || timeA.numGols < timeB.numGols) {
            activateButton(validate("container-match-penalts"));
        }
    });
    containerPenalts.appendChild(penaltsAInput);

    let penaltsversus = document.createElement("div");
    penaltsversus.innerText = "X";
    containerPenalts.appendChild(penaltsversus);

    let penaltsBInput = document.createElement("input");
    penaltsBInput.setAttribute("class", "input-style input-number");
    penaltsBInput.setAttribute("id", "name-" + timeB.id);
    penaltsBInput.setAttribute("min", 0);
    penaltsBInput.setAttribute("type", "number");
    penaltsBInput.addEventListener("change", () => {
        timeB.numGols = penaltsBInput.value;
        validate("container-match-penalts");
        if (timeA.numGols > timeB.numGols || timeA.numGols < timeB.numGols) {
            activateButton(validate("container-match-penalts"));
        }
    });
    containerPenalts.appendChild(penaltsBInput);

    let penaltsBLabel = document.createElement("label");
    penaltsBLabel.setAttribute("class", "label-color");
    penaltsBLabel.setAttribute("for", "name-" + timeB.id);
    penaltsBLabel.innerText = timeB.name;
    containerPenalts.appendChild(penaltsBLabel);

    contentContainer.appendChild(containerPenalts);

    let buttonNext = document.createElement("button");
    buttonNext.setAttribute("class", "button-style");
    buttonNext.setAttribute("id", "button-next");
    buttonNext.disabled = true;
    buttonNext.innerText = "Próximo";
    buttonNext.addEventListener("click", () => {
        clearContainer();
        endMatch();
    });
    contentContainer.appendChild(buttonNext);
}

function createWinner() {
    let contentContainer = document.getElementById("content-container");

    let winner = getTimeById(commonMatches[2].winner);

    let title = document.createElement("h1");
    title.setAttribute("class", "winner");
    title.style.color = winner.color;
    title.innerText = "Vencedor: " + winner.name;
    contentContainer.appendChild(title);

};

let currentMatch = 0;
let commonMatches = [
    { match: "Primeira Semifinal", timeAID: 'time1', timeBID: 'time2', winner: null },
    { match: "Segunda Semifinal", timeAID: 'time3', timeBID: 'time4', winner: null }
];
let final = false;


function getTimeById(id) {
    for (let time of times) {
        if (time.id == id) {
            return time;
        }
    }
    return null;
}

function validate(container) {
    let campos = document.getElementById(container).getElementsByTagName("input");
    let valid = true;
    for (let campo of campos) {
        valid = valid && (campo.value.trim().length > 0);
        if (!valid) {
            break;
        }
    }
    return valid;
}

function endMatch() {
    let timeA = getTimeById(commonMatches[currentMatch].timeAID);
    let timeB = getTimeById(commonMatches[currentMatch].timeBID);

    if (timeA.numGols > timeB.numGols) {
        commonMatches[currentMatch].winner = timeA.id;
    } else {
        commonMatches[currentMatch].winner = timeB.id;
    }

    currentMatch++;

    if (currentMatch < commonMatches.length) {
        createNextMatch();
    } else if (!final) {
        commonMatches.push({ match: "Final", timeAID: commonMatches[0].winner, timeBID: commonMatches[1].winner, winner: null });
        final = true;
        createNextMatch();
    } else {
        createWinner();
    }
}

function activateButton(active) {
    document.getElementById("button-next").disabled = !active;
}

createInformeTimes();