//CONFIRMAÇÃO SE DESEJA DELETAR

const formDelete = document.querySelectorAll("#del")
formDelete.forEach(form => form.addEventListener("click", (e) =>{
    const confirmation = confirm("Tem certeza que deseja deletar ?") 
    if(!confirmation){
        e.preventDefault()
    }
    
}))
