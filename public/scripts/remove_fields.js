// REMOVENDO OS CAMPOS DAS RECEITAS


const btnRemove = document.querySelectorAll('#remove')

for (const button of btnRemove) {
    let element = button.parentElement    
    button.addEventListener("click", function(){        
        if(element.firstElementChild.value==""){
            element.remove()
        } else {
            element.remove()            
        }       
    })
}

