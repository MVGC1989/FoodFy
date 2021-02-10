// REMOVENDO OS CAMPOS DAS RECEITAS


const Remove = document.querySelectorAll('#remove')

for (const button of Remove) {
    let element = button.parentElement    
    button.addEventListener("click", function(){        
        if(element.firstElementChild.value==""){
            element.remove()
        } else {
            element.remove()            
        }       
    })
}

