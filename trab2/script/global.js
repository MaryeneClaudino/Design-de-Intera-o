let qtdEquipesValue;
let equipes = [];

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
    qtdEquipes.setAttribute("min", 2);
    qtdEquipes.setAttribute("max", 20);
    qtdEquipes.setAttribute("type", "number");
    qtdEquipes.addEventListener("change", () => {
        qtdEquipesValue = qtdEquipes.value;
        activateButton(validate("content-container"));
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
            activateButton(validate("content-container"));
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
        createMatchs();
    });
    contentContainer.appendChild(buttonNext);
}

function createMatchs() {
    let contentContainer = document.getElementById("content-container");
}

function clearContainer() {
    document.getElementById("content-container").innerHTML = "";
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

function activateButton(active) {
    document.getElementById("button-next").disabled = !active;
}

createQuantidadeEquipes();