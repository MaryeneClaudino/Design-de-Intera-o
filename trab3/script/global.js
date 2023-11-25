//Exercício 1
let paises;
let pais;
buscarPaises();

async function buscarPaises() {
    const url = "./países.json";
    let resposta = await fetch(url);
    paises = await resposta.json();
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
    divResposta.setAttribute("class", "respostaExercicio");
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
//-------------------------------------------------------------------------------------------------------------------//

//Exercício 2
let resParte1 = document.getElementById("ex2Parte1");
fetch("https://brasilapi.com.br/api/cptec/v1/cidade/rio%20grande").then(function (resposta) {
    resposta.json().then(function (cidades) {
        let cidade = cidades.filter((c) => {
            return c.estado == "RS" && c.nome === "Rio Grande";
        });
        let { nome: nome, estado: estado } = cidade[0];
        resParte1.innerHTML = nome + "-" + estado;
    }).catch(function (err) {
        alert("Cidade não encontrada");
        console.log(err);
    })
});

let resParte2 = document.getElementById("ex2Parte2");
fetch("https://brasilapi.com.br/api/ibge/uf/v1/mg").then(function (resposta) {
    resposta.json().then(function (infoEstado) {
        let { nome: nome, sigla: sigla, regiao: { nome: nomeRegiao, sigla: siglaRegiao } } = infoEstado;
        resParte2.innerHTML = nome + "-" + sigla + ", " + nomeRegiao + "-" + siglaRegiao;
    }).catch(function (err) {
        alert("Estado não encontrado");
    })
});

let resParte3 = document.getElementById("ex2Parte3");
fetch("https://brasilapi.com.br/api/taxas/v1/cdi").then(function (resposta) {
    resposta.json().then(function (valorCDI) {
        let { nome: nome, valor: valor } = valorCDI;
        resParte3.innerHTML = nome + " - " + valor;
    }).catch(function (err) {
        alert("Taxa não encontrada");
        console.log(err);
    })
});

let cepResposta;
async function buscarCEP() {
    let buttonForm = document.getElementById("ex2FormButton");
    let cep = document.getElementById("cep").value
    const url = "https://brasilapi.com.br/api/cep/v1/" + cep;
    try {
        let resposta = await fetch(url)
        cepResposta = await resposta.json();
        if (cepResposta.message != undefined || cepResposta.message != null) {
            alert("CEP inválido, tente novamente.");
            buttonForm.disabled = true;
        } else {
            buttonForm.disabled = false;
        }
    } catch (err) {
        console.log(err);
    }
}

function createRespForm() {
    let div = document.getElementById("exercicio2");

    let divResposta = document.createElement("div");
    divResposta.setAttribute("class", "respostaExercicio");
    divResposta.setAttribute("id", "respostaForm");

    let cidade = document.createElement("p");
    cidade.innerText = "Cidade: " + cepResposta.city;
    divResposta.appendChild(cidade);
    let estado = document.createElement("p");
    estado.innerText = "Estado: " + cepResposta.state;
    divResposta.appendChild(estado);
    let endereco = document.createElement("p");
    endereco.innerText = "Endereço: " + cepResposta.street;
    divResposta.appendChild(endereco);
    let bairro = document.createElement("p");
    bairro.innerText = "Bairro: " + cepResposta.neighborhood;
    divResposta.appendChild(bairro);

    div.appendChild(divResposta);
}

//Controle do botão do formulário
document.getElementById("ex2FormButton").disabled = true;
document.getElementById("ex2FormButton").addEventListener("click", () => {
    if (document.getElementById("respostaForm") != undefined || document.getElementById("respostaForm") != null) {
        document.getElementById("respostaForm").remove();
    }
    createRespForm();
});