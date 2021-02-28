const Validate ={
    apply(input , func ){

        Validate.clearErrors(input)

        let results = Validate[func](input.value)
        input.value = results.value

        if(results.error)
            Validate.displayError(input, results.error)

    },

    displayError(input , error){
        const div = document.createElement('div')
        div.classList.add('error-mail')
        div.innerHTML = error
        input.parentNode.appendChild(div)
        input.focus()
    },

    clearErrors(input){
        const errorDiv = input.parentNode.querySelector(".error-mail")

        if(errorDiv){
            errorDiv.remove()
        }
    },

    //validação de email
    isEmail(value){
        let error = null
        
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(!value.match(mailFormat)){
            error = "Email inválido !"
        }

        return{
            error,
            value
        }
    },
}

//INPUT VERMELHO AO DAR ERRO
const formError = document.querySelector('.error.messages')
if (formError) {
    const fields = document.querySelectorAll('input')
    fields.forEach(field => field.style.borderColor = '#ff3131')
}

//VALIDAÇÃO DE UPDATE
document.querySelector(".formSubmit").addEventListener('submit',(e)=>{
    const photo = document.querySelector(".photo")
    const photoInput = document.querySelector("input[type='file']")
    
        document.querySelectorAll("input[type='text'], .item textarea, .item select").forEach(input =>{
            if(input.value == '' || !photo && photoInput.files.length == 0){
                if(!photo && photoInput.files.length == 0){
                    const div = document.createElement('div')
                    div.classList.add("messages", "error")
                    div.textContent = `Envie pelo menos uma imagem !`
                    document.querySelector("body").appendChild(div)

                } else {
                    const div = document.createElement('div')
                    div.classList.add("messages", "error")
                    div.textContent = "Por favor preencha todos os campos!"
                    document.querySelector("body").appendChild(div)
                }
                e.preventDefault()
            }
    
        })
    })
