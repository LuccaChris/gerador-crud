var campos = [];
var fieldsDiv = document.getElementById("fields");
var addFieldBtn = document.getElementById("addFieldBtn");
var generateBtn = document.getElementById("generateBtn");
var resultPre = document.getElementById("result");
addFieldBtn.addEventListener("click", function () {
    var fieldRow = document.createElement("div");
    fieldRow.className = "field-row";
    var inputNome = document.createElement("input");
    inputNome.placeholder = "Nome do campo";
    var selectTipo = document.createElement("select");
    ["string", "int", "decimal", "bool", "datetime"].forEach(function (t) {
        var opt = document.createElement("option");
        opt.value = t;
        opt.textContent = t;
        selectTipo.appendChild(opt);
    });
    fieldRow.appendChild(inputNome);
    fieldRow.appendChild(selectTipo);
    fieldsDiv.appendChild(fieldRow);
});
generateBtn.addEventListener("click", function () {
    var entityName = document.getElementById("entityName").value;
    var fieldRows = fieldsDiv.querySelectorAll(".field-row");
    var camposGerados = [];
    fieldRows.forEach(function (row) {
        var inputs = row.querySelectorAll("input, select");
        var nome = inputs[0].value;
        var tipo = inputs[1].value;
        if (nome) {
            camposGerados.push({ nome: nome, tipo: tipo });
        }
    });
    var entidade = {
        entidade: entityName,
        campos: camposGerados
    };
    resultPre.textContent = JSON.stringify(entidade, null, 2);
});
