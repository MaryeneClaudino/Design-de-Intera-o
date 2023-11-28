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

//Exercício 2 (Utilizando destructuring e filter)
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
let buttonForm = document.getElementById("ex2FormButton");
let cepValido = false;
async function buscarCEP() {
    let cep = document.getElementById("cep").value;
    const url = "https://brasilapi.com.br/api/cep/v1/" + cep;
    try {
        let resposta = await fetch(url)
        cepResposta = await resposta.json();
        if (cepResposta.message != undefined || cepResposta.message != null) {
            alert("CEP inválido, tente novamente.");
            cepValido = false;
        } else {
            cepValido = true;
        }
        validarRespostasFormulario();
    } catch (err) {
        console.log(err);
    }
}

let cnpjResposta;
let cnpjValido = false;
async function buscarCNPJ() {
    let cnpj = document.getElementById("cnpj").value;
    const url = "https://brasilapi.com.br/api/cnpj/v1/" + cnpj;
    try {
        let resposta = await fetch(url)
        cnpjResposta = await resposta.json();
        if (cnpjResposta.message != undefined || cnpjResposta.message != null) {
            alert("CNPJ inválido, tente novamente.");
            cnpjValido = false;
        } else {
            cnpjValido = true;
        }
        validarRespostasFormulario();
    } catch (err) {
        console.log(err);
    }
}

let dddResposta;
let dddValido = false;
async function buscarDDD() {
    let ddd = document.getElementById("ddd").value;
    const url = "https://brasilapi.com.br/api/ddd/v1/" + ddd;
    try {
        let resposta = await fetch(url)
        dddResposta = await resposta.json();
        if (dddResposta.message != undefined || dddResposta.message != null) {
            alert("DDD inválido, tente novamente.");
            dddValido = false;
        } else {
            dddValido = true;
        }
        validarRespostasFormulario();
    } catch (err) {
        console.log(err);
    }
}

function createRespForm() {
    let div = document.getElementById("exercicio2");

    let divResposta1 = document.createElement("div");
    divResposta1.setAttribute("class", "respostaExercicio");
    divResposta1.setAttribute("id", "respostaForm");

    let title = document.createElement("h2");
    title.innerText = "Informações do CEP";
    title.setAttribute("class", "lateral-padding");
    divResposta1.appendChild(title);
    let cidade = document.createElement("p");
    cidade.innerText = "Cidade: " + cepResposta.city;
    divResposta1.appendChild(cidade);
    let estado = document.createElement("p");
    estado.innerText = "Estado: " + cepResposta.state;
    divResposta1.appendChild(estado);
    let endereco = document.createElement("p");
    endereco.innerText = "Endereço: " + cepResposta.street;
    divResposta1.appendChild(endereco);
    let bairro = document.createElement("p");
    bairro.innerText = "Bairro: " + cepResposta.neighborhood;
    divResposta1.appendChild(bairro);

    let espaco = document.createElement("br");
    divResposta1.appendChild(espaco);

    let title2 = document.createElement("h2");
    title2.innerText = "Informações do CNPJ";
    title2.setAttribute("class", "lateral-padding");
    divResposta1.appendChild(title2);
    let localidade = document.createElement("p");
    localidade.innerText = "Localidade: " + cnpjResposta.municipio + "-" + cnpjResposta.uf;
    divResposta1.appendChild(localidade);
    let nomeFantasia = document.createElement("p");
    nomeFantasia.innerText = "Nome Fantasia: " + cnpjResposta.nome_fantasia;
    divResposta1.appendChild(nomeFantasia);
    let cnaes = document.createElement("p");
    cnaes.innerText = "Descrição fiscal: " + cnpjResposta.cnae_fiscal_descricao;
    divResposta1.appendChild(cnaes);
    let dataAbertura = document.createElement("p");
    dataAbertura.innerText = "Início das atividades em: " + formatarData(cnpjResposta.data_inicio_atividade);
    divResposta1.appendChild(dataAbertura);

    let espaco2 = document.createElement("br");
    divResposta1.appendChild(espaco2);

    let title3 = document.createElement("h2");
    title3.setAttribute("class", "lateral-padding");
    title3.innerText = "Cidades do " + dddResposta.state + " com DDD " + document.getElementById("ddd").value;
    divResposta1.appendChild(title3);
    let listaCidades = document.createElement("div");
    listaCidades.setAttribute("id", "listaCidades");

    for (let cidade of dddResposta.cities) {
        let c = document.createElement("p");
        c.innerText = cidade + ", ";
        listaCidades.appendChild(c);
    }
    divResposta1.appendChild(listaCidades);

    div.appendChild(divResposta1);
}

//Controle do botão do formulário
document.getElementById("ex2FormButton").disabled = true;
document.getElementById("ex2FormButton").addEventListener("click", () => {
    if (document.getElementById("respostaForm") != undefined || document.getElementById("respostaForm") != null) {
        document.getElementById("respostaForm").remove();
    }
    createRespForm();
});

function validarRespostasFormulario() {
    if (cepValido && cnpjValido && dddValido) {
        document.getElementById("ex2FormButton").disabled = false;
    } else {
        document.getElementById("ex2FormButton").disabled = true;
    }
}

function formatarData(data) {
    let dia = data.slice(8, 10);
    let mes = data.slice(5, 7);
    let ano = data.slice(0, 4);

    return dia + "-" + mes + "-" + ano;
}
//-------------------------------------------------------------------------------------------------------------------//

//Exercício 3 (Utilizando reduce)
let ex3SelectResp;
let infoMetadados;
let valoresMetadados;

async function buscarLinhasFixas() {
    document.getElementById("ex3Metadados").disabled = true;
    const urlInfo = "http://www.ipeadata.gov.br/api/odata4/Metadados('ANATEL_SERV')";
    const urlValores = "http://www.ipeadata.gov.br/api/odata4/Metadados('ANATEL_SERV')/Valores/";
    try {
        let respostaInfo = await fetch(urlInfo)
        infoMetadados = await respostaInfo.json();
        let respostaValores = await fetch(urlValores)
        valoresMetadados = await respostaValores.json();
        if (ex3SelectResp.trim().length > 0) {
            document.getElementById("ex3Metadados").disabled = false;
        }
    } catch (err) {
        console.log(err);
    }
}

async function buscarLinhasMoveis() {
    document.getElementById("ex3Metadados").disabled = true;
    const urlInfo = "http://www.ipeadata.gov.br/api/odata4/Metadados('ANATEL_SERVMOV')";
    const urlValores = "http://www.ipeadata.gov.br/api/odata4/Metadados('ANATEL_SERVMOV')/Valores/";
    try {
        let respostaInfo = await fetch(urlInfo)
        infoMetadados = await respostaInfo.json();
        let respostaValores = await fetch(urlValores)
        valoresMetadados = await respostaValores.json();
        if (ex3SelectResp.trim().length > 0) {
            document.getElementById("ex3Metadados").disabled = false;
        }
    } catch (err) {
        console.log(err);
    }
}

async function buscarLinhasFixasEMoveis() {
    document.getElementById("ex3Metadados").disabled = true;
    const urlInfo = "http://www.ipeadata.gov.br/api/odata4/Metadados('ANATEL_SERVMOVFIX')";
    const urlValores = "http://www.ipeadata.gov.br/api/odata4/Metadados('ANATEL_SERVMOVFIX')/Valores/";
    try {
        let respostaInfo = await fetch(urlInfo)
        infoMetadados = await respostaInfo.json();
        let respostaValores = await fetch(urlValores)
        valoresMetadados = await respostaValores.json();
        if (ex3SelectResp.trim().length > 0) {
            document.getElementById("ex3Metadados").disabled = false;
        }
    } catch (err) {
        console.log(err);
    }
}

document.getElementById("metadados").addEventListener("change", () => {
    if (document.getElementById("respostaMetadados") != undefined || document.getElementById("respostaMetadados") != null) {
        document.getElementById("respostaMetadados").remove();
    }
    ex3SelectResp = document.getElementById("metadados").value;
    if (ex3SelectResp == "linhasFixas") {
        buscarLinhasFixas();
    } else if (ex3SelectResp == "linhasMoveis") {
        buscarLinhasMoveis();
    } else if (ex3SelectResp == "linhasFixasMoveis") {
        buscarLinhasFixasEMoveis();
    }

    if (ex3SelectResp.trim().length == 0) {
        document.getElementById("ex3Metadados").disabled = true;
    }
});
document.getElementById("ex3Metadados").disabled = true;
document.getElementById("ex3Metadados").addEventListener("click", () => {
    if (document.getElementById("respostaMetadados") != undefined || document.getElementById("respostaMetadados") != null) {
        document.getElementById("respostaMetadados").remove();
    }
    createRespMetadados();
});

function createRespMetadados() {
    let numValores = valoresMetadados.value.length;
    let totalLinhas = valoresMetadados.value.reduce((resultado, linhas) => { return resultado + linhas.VALVALOR; }, 0);

    let div = document.getElementById("exercicio3");

    let table = document.createElement("table");
    table.setAttribute("class", "table-style");
    table.setAttribute("id", "respostaMetadados");

    let trTitle = document.createElement("tr");
    trTitle.setAttribute("class", "tr-style");
    let thSigla = document.createElement("th");
    thSigla.setAttribute("class", "th-style");
    thSigla.innerText = infoMetadados.value[0].FNTSIGLA;
    trTitle.appendChild(thSigla);
    let thDescricao = document.createElement("th");
    thDescricao.setAttribute("class", "th-style");
    thDescricao.innerText = "Descrição";
    trTitle.appendChild(thDescricao);
    table.appendChild(trTitle);
    let thTotal = document.createElement("th");
    thTotal.setAttribute("class", "th-style");
    thTotal.innerText = "Total de linhas (" + extrairAno(valoresMetadados.value[0].VALDATA) + "-" + extrairAno(valoresMetadados.value[numValores - 1].VALDATA) + ")";
    trTitle.appendChild(thTotal);
    table.appendChild(trTitle);

    let trResultado = document.createElement("tr");
    trResultado.setAttribute("class", "tr-style");
    let tdSigla = document.createElement("td");
    tdSigla.setAttribute("class", "td-style");
    tdSigla.innerText = infoMetadados.value[0].FNTNOME;
    trResultado.appendChild(tdSigla);
    let tdDescricao = document.createElement("td");
    tdDescricao.setAttribute("class", "td-style");
    tdDescricao.innerHTML = infoMetadados.value[0].SERCOMENTARIO;
    trResultado.appendChild(tdDescricao);
    table.appendChild(trResultado);
    let tdTotal = document.createElement("td");
    tdTotal.setAttribute("class", "td-style");
    tdTotal.innerText = totalLinhas + " " + infoMetadados.value[0].MULNOME + " de linhas";
    trResultado.appendChild(tdTotal);
    table.appendChild(trResultado);

    div.appendChild(table);
};

function extrairAno(data) {
    let ano = data.slice(0, 4);

    return ano;
}
//-------------------------------------------------------------------------------------------------------------------//

//Exercício 4 (Utilizando filter, map e reduce)
let valoresMetadadosPromisse;
let infoMetadadosPromisse;

function buscarCarrosPasseio() {
    const urlInfo = "http://www.ipeadata.gov.br/api/odata4/Metadados('ANFAVE12_QPASSAM12')";
    const urlValores = "http://www.ipeadata.gov.br/api/odata4/Metadados('ANFAVE12_QPASSAM12')/Valores/";

    return new Promise((resolve, reject) => {
        try {
            fetch(urlInfo).then(function (resp) {
                resp.json().then(function (infoMetadados) {
                    fetch(urlValores).then(function (respValues) {
                        respValues.json().then(function (valoresMetadados) {
                            let dados = { info: infoMetadados, valores: valoresMetadados };
                            resolve(dados);
                        })
                    })
                })
            });
        } catch (err) {
            reject(err);
        }
    });
}

async function buscarCaminhoes() {
    const urlInfo = "http://www.ipeadata.gov.br/api/odata4/Metadados('ANFAVE12_QCAMINM12')";
    const urlValores = "http://www.ipeadata.gov.br/api/odata4/Metadados('ANFAVE12_QCAMINM12')/Valores/";
    return new Promise((resolve, reject) => {
        try {
            fetch(urlInfo).then(function (resp) {
                resp.json().then(function (infoMetadados) {
                    fetch(urlValores).then(function (respValues) {
                        respValues.json().then(function (valoresMetadados) {
                            let dados = { info: infoMetadados, valores: valoresMetadados };
                            resolve(dados);
                        })
                    })
                })
            });
        } catch (err) {
            reject(err);
        }
    });
}

async function buscarOnibus() {
    const urlInfo = "http://www.ipeadata.gov.br/api/odata4/Metadados('ANFAVE12_QONIBUM12')";
    const urlValores = "http://www.ipeadata.gov.br/api/odata4/Metadados('ANFAVE12_QONIBUM12')/Valores/";
    return new Promise((resolve, reject) => {
        try {
            fetch(urlInfo).then(function (resp) {
                resp.json().then(function (infoMetadados) {
                    fetch(urlValores).then(function (respValues) {
                        respValues.json().then(function (valoresMetadados) {
                            let dados = { info: infoMetadados, valores: valoresMetadados };
                            resolve(dados);
                        })
                    })
                })
            });
        } catch (err) {
            reject(err);
        }
    });
}

document.getElementById("ex4Parte1").addEventListener("click", () => {
    if (document.getElementById("promisse") != undefined || document.getElementById("promisse") != null) {
        document.getElementById("promisse").innerHTML = "";
    }
    Promise.any([buscarCarrosPasseio(), buscarCaminhoes(), buscarOnibus()])
        .then((value) => {
            infoMetadadosPromisse = value.info.value[0];
            valoresMetadadosPromisse = value.valores.value;
            createRespPromisses();
        }).catch((value) => {
            console.log("Erro" + value);
        });
});

document.getElementById("ex4Parte2").addEventListener("click", () => {
    if (document.getElementById("promisse") != undefined || document.getElementById("promisse") != null) {
        document.getElementById("promisse").innerHTML = "";
    }
    Promise.race([buscarCarrosPasseio(), buscarCaminhoes(), buscarOnibus()])
        .then((value) => {
            infoMetadadosPromisse = value.info.value[0];
            valoresMetadadosPromisse = value.valores.value;
            createRespPromisses(infoMetadadosPromisse, valoresMetadadosPromisse);
        }).catch((value) => {
            console.log("Erro" + value);
        });
});

document.getElementById("ex4Parte3").addEventListener("click", () => {
    if (document.getElementById("promisse") != undefined || document.getElementById("promisse") != null) {
        document.getElementById("promisse").innerHTML = "";
    }
    Promise.all([buscarCarrosPasseio(), buscarCaminhoes(), buscarOnibus()])
        .then((values) => {
            for (let value of values) {
                infoMetadadosPromisse = value.info.value[0];
                valoresMetadadosPromisse = value.valores.value;
                createRespPromisses();
            }
        }).catch((value) => {
            console.log("Erro" + value);
        });
});

function createRespPromisses() {
    //Considerando que o mês tem aproximadamente 30 dias para fazer a média por dia.
    let totalPromisses = valoresMetadadosPromisse.filter((dados) => { return extrairAno(dados.VALDATA) == "2022" })
        .map((dados) => { return dados.VALVALOR / 30 })
        .reduce((resultado, medias) => { return resultado + medias; }, 0);

    let div = document.getElementById("promisse");

    let table = document.createElement("table");
    table.setAttribute("class", "table-style");

    let trTitle = document.createElement("tr");
    trTitle.setAttribute("class", "tr-style");
    let thSigla = document.createElement("th");
    thSigla.setAttribute("class", "th-style");
    thSigla.innerText = infoMetadadosPromisse.FNTSIGLA;
    trTitle.appendChild(thSigla);
    let thDescricao = document.createElement("th");
    thDescricao.setAttribute("class", "th-style");
    thDescricao.innerText = "Descrição";
    trTitle.appendChild(thDescricao);
    table.appendChild(trTitle);
    let thTotal = document.createElement("th");
    thTotal.setAttribute("class", "th-style");
    thTotal.innerText = "Total da média diária de unidades (2022)";
    trTitle.appendChild(thTotal);
    table.appendChild(trTitle);

    let trResultado = document.createElement("tr");
    trResultado.setAttribute("class", "tr-style");
    let tdSigla = document.createElement("td");
    tdSigla.setAttribute("class", "td-style");
    tdSigla.innerText = infoMetadadosPromisse.FNTNOME;
    trResultado.appendChild(tdSigla);
    let tdDescricao = document.createElement("td");
    tdDescricao.setAttribute("class", "td-style");
    tdDescricao.innerHTML = infoMetadadosPromisse.SERCOMENTARIO;
    trResultado.appendChild(tdDescricao);
    table.appendChild(trResultado);
    let tdTotal = document.createElement("td");
    tdTotal.setAttribute("class", "td-style");
    tdTotal.innerText = totalPromisses + " unidades";
    trResultado.appendChild(tdTotal);
    table.appendChild(trResultado);

    div.appendChild(table);
};
