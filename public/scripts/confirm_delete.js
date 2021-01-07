//CONFIRMAÇÃO SE DESEJA DELETAR

const formDelete = document.querySelector("#del")
formDelete.addEventListener("submit", function(event){
    const confirmation = confirm("Deseja Deletar?")
    if(!confirmation){
        event.preventDefault()
    }
})