type Campo = {
  nome: string;
  tipo: string;
};

const campos: Campo[] = [];

const fieldsDiv = document.getElementById("fields")!;
const addFieldBtn = document.getElementById("addFieldBtn")!;
const generateBtn = document.getElementById("generateBtn")!;
const resultPre = document.getElementById("result")!;

addFieldBtn.addEventListener("click", () => {
  const fieldRow = document.createElement("div");
  fieldRow.className = "field-row";

  const inputNome = document.createElement("input");
  inputNome.placeholder = "Nome do campo";

  const selectTipo = document.createElement("select");
  ["string", "int", "decimal", "bool", "datetime"].forEach(t => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    selectTipo.appendChild(opt);
  });

  fieldRow.appendChild(inputNome);
  fieldRow.appendChild(selectTipo);
  fieldsDiv.appendChild(fieldRow);
});

generateBtn.addEventListener("click", () => {
  const entityName = (document.getElementById("entityName") as HTMLInputElement).value;
  const fieldRows = fieldsDiv.querySelectorAll(".field-row");

  const camposGerados: Campo[] = [];

  fieldRows.forEach(row => {
    const inputs = row.querySelectorAll("input, select");
    const nome = (inputs[0] as HTMLInputElement).value;
    const tipo = (inputs[1] as HTMLSelectElement).value;
    if (nome) {
      camposGerados.push({ nome, tipo });
    }
  });

  const entidade = {
    entidade: entityName,
    campos: camposGerados
  };

  resultPre.textContent = JSON.stringify(entidade, null, 2);
});
