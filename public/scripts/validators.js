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

    allFields(event) {
        const items = document.querySelectorAll('.item input, .item select, .item textarea .item.photos_preview');

        for (item of items) {
            if (item.value == '') {
                const message = document.createElement('div');
                message.classList.add('messages');
                message.classList.add('error');
                message.style.position = 'fixed';
                message.innerHTML = 'Todos os campos são obrigatórios!';
                document.querySelector('body').appendChild(message);

                event.preventDefault();
            }
        }
    }

    /*allFields(event) {
        const items = document.querySelectorAll('.item input, .item select .item textarea')
        const divPhotos = document.querySelector('.item .photos_preview')
        
        const message = document.createElement('div')
        const divError = document.querySelector('div .messages.error')
        
        for (const item of items) {
            if(item.value == '' && item.name != 'is_admin') {
                message.classList.add('messages', 'error')
                message.style.position = 'fixed'
                
                if((!divPhotos || !divPhotos.children[0]) && item.name == 'photos') {
                    message.innerHTML = 'Envie ao menos uma imagem!'
                    event.preventDefault()
                    
                    if(divError) divError.parentNode.replaceChild(message, divError)
                    document.body.append(message)
                    return
                }
                
                message.innerHTML = 'Preencha todos os campos.'
                if(divError) divError.parentNode.replaceChild(message, divError)
                document.body.append(message)
                event.preventDefault()
            }
        }
    }*/
}


const formError = document.querySelector('.error.messages')
if (formError) {
    const fields = document.querySelectorAll('input')
    fields.forEach(field => field.style.borderColor = '#ff3131')
}



