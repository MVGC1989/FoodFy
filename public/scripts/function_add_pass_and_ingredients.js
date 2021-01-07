//FUNÇÃO PARA ADICIONAR NOVO INGREDIENTE E NOVO PASSO DO MODO DE PREPARO

function addIngredient() {
    const ingredients = document.querySelector("#ingredients")
    const fieldContainer = document.querySelectorAll(".ingredient")

    //CLONE ÚLTIMO CAMPO PREENCHIDO
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    //NÃO ADD UM INPUT NOVO SE O ÚLTIMO CAMPO ESTIVER VAZIO
    if (newField.children[0].value == "") return false

    //DEIXA O NOVO CAMPO VAZIO
    newField.children[0].value = ""
    ingredients.appendChild(newField)
}
document.querySelector(".add_new_ingredient").addEventListener("click", addIngredient)


function addPreparation() {
    const preparations = document.querySelector("#preparations")
    const passContainer = document.querySelectorAll(".preparation")
    const newPass = passContainer[passContainer.length - 1].cloneNode(true)

    if (newPass.children[0].value == "") return false

    newPass.children[0].value = ""
    preparations.appendChild(newPass)
}

document.querySelector(".add_new_pass").addEventListener("click", addPreparation)
