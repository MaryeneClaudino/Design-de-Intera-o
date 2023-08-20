// //Estrutura Do Gadget:

let modeloTimes = {
    campos: [
        {
            id: "time1",
            label: "Primeiro Time",
            color: "#FF0000",
        },
        {
            id: "time2",
            label: "Segundo Time",
            color: "#00FF00",
        },
        {
            id: "time3",
            label: "Terceiro Time",
            color: "#0000FF",
        },
        {
            id: "time4",
            label: "Quarto Time",
            color: "#FF00FF",
        },
    ],
};

// Script

function createInformeTimes() {
    let contentContainer = document.getElementById("content-container");

    //Título
    let title = document.createElement("h1");
    title.setAttribute("class", "title");
    title.innerText = "Informe os Times";
    contentContainer.appendChild(title);

    for (let campo of modeloTimes.campos) {
        let idContainer = "container-" + campo.id;
        let div = document.createElement("div");
        div.setAttribute("class", "position-inputs");
        div.setAttribute("id", idContainer);

        //Label
        let timeNameLabel = document.createElement("label");
        timeNameLabel.setAttribute("class", "label-style");
        timeNameLabel.setAttribute("for", "name-" + campo.id);
        timeNameLabel.innerText = campo.label;
        div.appendChild(timeNameLabel);

        //Input Text
        let timeNameInput = document.createElement("input");
        timeNameInput.setAttribute("class", "input-style");
        timeNameInput.setAttribute("id", "name-" + campo.id);
        timeNameInput.setAttribute("type", "text");
        div.appendChild(timeNameInput);

        //Label
        let timeColorLabel = document.createElement("label");
        timeColorLabel.setAttribute("class", "label-style");
        timeColorLabel.setAttribute("for", "color-" + campo.id);
        timeColorLabel.innerText = "Cor do Time";
        div.appendChild(timeColorLabel);

        //Input Color
        let timeColorInput = document.createElement("input");
        timeColorInput.setAttribute("class", "input-color");
        timeColorInput.setAttribute("id", "color-" + campo.id);
        timeColorInput.setAttribute("type", "color");
        timeColorInput.setAttribute("value", campo.color);
        div.appendChild(timeColorInput);

        //Adiciona a  div do time
        contentContainer.appendChild(div);
    }


    //Botão
    let buttonNext = document.createElement("button");
    buttonNext.setAttribute("class", "button-style");
    buttonNext.disabled = true;
    buttonNext.innerText = "Próximo";
    contentContainer.appendChild(buttonNext);


}

createInformeTimes();