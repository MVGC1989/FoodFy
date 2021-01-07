// AVATAR DO CHEF

const Avatar_Upload = {
    input: '',
    preview: document.querySelector(".avatar_preview"),
    upload_limit: 1,
    files:[],

    handle_file_input(event){
        const {files: file_list} = event.target
        Avatar_Upload.input = event.target

        if(Avatar_Upload.limit(event)) return
        
    Array.from(file_list).forEach(file =>{

        Avatar_Upload.files.push(file)

        const reader = new FileReader()//permite ler arquivos
        reader.onload = () =>{
            const image = new Image() //como se colocasse uma tag img no html
            image.src = String(reader.result)

            const div = Avatar_Upload.get_container(image)

            Avatar_Upload.preview.appendChild(div)
        }
        reader.readAsDataURL(file)
    })

    Avatar_Upload.input.files = Avatar_Upload.get_all_files()

    },

    limit(event){ //limitando numero de fotos
        const {upload_limit , input , preview} = Avatar_Upload
        const {files: file_list} = input

        if(file_list.length > upload_limit){//se numero de arquivos for mais que o limite
            alert(`Envie no máximo ${upload_limit} foto!`)
            event.preventDefault()//impede de enviar mais que o limite de fotos
            return true
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value =="photo"){
                photosDiv.push(item)
            }
        })

        const total_photos = file_list.length + photosDiv.length
        if(total_photos > upload_limit){
            alert("Você atingiu o limite máximo de fotos!")
            event.preventDefault()
            return true
        }
        return false
    },   


    get_all_files(){
        const data_transfer = new ClipboardEvent("").clipboardData || new DataTransfer() 
        Avatar_Upload.files.forEach(file => data_transfer.items.add(file))
        return data_transfer.files
    },

    get_container(image) {//cria div de imagem
        
        const div = document.createElement('div')
        
        div.classList.add('photo')
        
        div.onclick = Avatar_Upload.remove_photo
        
        div.appendChild(image)

        div.appendChild(Avatar_Upload.get_remove_button())

        return div
    },

    get_remove_button(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },

    remove_photo(event){
        const photo_div = event.target.parentNode //div class=photo
        const photos_array = Array.from(Avatar_Upload.preview.children)
        const index = photos_array.indexOf(photo_div)

        Avatar_Upload.files.splice(index , 1)
        //splice serve para remover uma posição de um array e 1 é remover um objeto
        Avatar_Upload.input.files = Avatar_Upload.get_all_files()
        photo_div.remove()
    },

    remove_old_photo(event){
        const photoDiv = event.target.parentNode

        if(photoDiv.id){
            const removed_files = document.querySelector(" input[name='removed_files' ")
            if(removed_files){
                removed_files.value += `${photoDiv.id},`
            }
        }
        photoDiv.remove()
    }
}
