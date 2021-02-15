//CONFIRMAÇÃO SE DESEJA DELETAR

const formDelete = document.querySelector("#del")
formDelete.forEach(form => form.addEventListener("submit", e =>{
    confirm("Tem certeza que deseja deletar ?") ? null: e.preventDefault()
}))
