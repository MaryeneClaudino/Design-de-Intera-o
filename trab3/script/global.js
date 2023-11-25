let paises;
let pais;
buscarPaises();

async function buscarPaises() {
    const url = "./países.json";
    let resposta = await fetch(url);
    paises = await resposta.json();
    console.log(paises);
    createExercicio1();
}

function createExercicio1() {
    let div = document.getElementById("exercicio1");

    let title = document.createElement("h1");
    title.setAttribute("class", "title");
    title.innerText = "Exercício 1";
    div.appendChild(title);

    let positionLabel = document.createElement("div");
    positionLabel.setAttribute("class", "position-inputs");


    let paisesLabel = document.createElement("label");
    paisesLabel.setAttribute("class", "label-style");
    paisesLabel.setAttribute("for", "paises");
    paisesLabel.innerText = "Escolha um país: ";
    positionLabel.appendChild(paisesLabel);

    let paisesSelect = document.createElement("select");
    paisesSelect.setAttribute("class", "input-style");
    paisesSelect.setAttribute("id", "paises");
    paisesSelect.setAttribute("name", "paises");
    paisesSelect.addEventListener("change", () => {
        pais = paisesSelect.value;
        if (paisesSelect.value.trim().length > 0) {
            document.getElementById("send-pais").disabled = false;
        } else {
            document.getElementById("send-pais").disabled = true;
        }
    });
    positionLabel.appendChild(paisesSelect);

    div.appendChild(positionLabel);

    let selecioneOptions = document.createElement("option");
    selecioneOptions.setAttribute("value", "");
    selecioneOptions.innerText = "Selecione";
    paisesSelect.appendChild(selecioneOptions);

    for (let pais of paises) {
        let selecioneOptions = document.createElement("option");
        selecioneOptions.setAttribute("value", pais.nome_pais);
        selecioneOptions.innerText = pais.nome_pais;
        paisesSelect.appendChild(selecioneOptions);
    }

    let buttonSendPais = document.createElement("button");
    buttonSendPais.setAttribute("class", "button-style");
    buttonSendPais.setAttribute("id", "send-pais");
    buttonSendPais.disabled = true;
    buttonSendPais.innerText = "Enviar";
    buttonSendPais.addEventListener("click", () => {
        if (document.getElementById("resposta") != undefined || document.getElementById("resposta") != null) {
            document.getElementById("resposta").remove();
        }
        createInfoPaisSelecionado()
    });
    div.appendChild(buttonSendPais);
}

function createInfoPaisSelecionado() {
    let paisSelecionado = "";

    let div = document.getElementById("exercicio1");
    for (let p of paises) {
        if (pais == p.nome_pais) {
            paisSelecionado = p;
        }
    }

    let divResposta = document.createElement("div");
    divResposta.setAttribute("class", "respostaExercicio1");
    divResposta.setAttribute("id", "resposta");

    let paisGentilico = document.createElement("p");
    paisGentilico.innerText = "Gentílico: " + paisSelecionado.gentilico;
    divResposta.appendChild(paisGentilico);
    let paisNome = document.createElement("p");
    paisNome.innerText = "Nome: " + paisSelecionado.nome_pais;
    divResposta.appendChild(paisNome);
    let paisNomeInternacional = document.createElement("p");
    paisNomeInternacional.innerText = "Nome Internacional: " + paisSelecionado.nome_pais_int;
    divResposta.appendChild(paisNomeInternacional);
    let paisSigla = document.createElement("p");
    paisSigla.innerText = "Nome Internacional: " + paisSelecionado.sigla;
    divResposta.appendChild(paisSigla);

    div.appendChild(divResposta);
}