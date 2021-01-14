//FOTOS DAS RECEITAS E GALERIA

const Photos_Upload = {
    input: '',
    preview: document.querySelector(".photos_preview"),
    upload_limit: 5,
    files:[],

    handle_file_input(event){
        const {files: file_list} = event.target
        Photos_Upload.input = event.target

        if(Photos_Upload.limit(event)) {
            Photos_Upload.update_input_files()
            return
        }
        
        
    Array.from(file_list).forEach(file =>{


        Photos_Upload.files.push(file)

        const reader = new FileReader()
        reader.onload = () =>{
            const image = new Image() 
            image.src = String(reader.result)

            const div = Photos_Upload.get_container(image)

            Photos_Upload.preview.appendChild(div)
        }
        reader.readAsDataURL(file)
    })

    Photos_Upload.update_input_files()

    },

    limit(event){ 
        const {upload_limit , input , preview} = Photos_Upload
        const {files: file_list} = input

        if(file_list.length > upload_limit){//se numero de arquivos for mais que o limite
            alert(`Envie no máximo ${Photos_Upload.upload_limit} fotos!`)
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
            alert(`Você atingiu o limite de fotos! É permitido enviar até 0${upload_limit} fotos.`)
            event.preventDefault()
            return true
        }
        return false
    },   


    get_all_files(){
        const data_transfer = new ClipboardEvent("").clipboardData || new DataTransfer() 
        Photos_Upload.files.forEach(file => data_transfer.items.add(file))
        return data_transfer.files
    },

    get_container(image) {//cria div de imagem
        
        const div = document.createElement('div')
        
        div.classList.add('photo')
        
        div.onclick = Photos_Upload.remove_photo
        
        div.appendChild(image)

        div.appendChild(Photos_Upload.get_remove_button())

        return div
    },

    get_remove_button(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.onclick = Photos_Upload.remove_photo
        button.innerHTML = "close"
        return button
    },

    remove_photo(event){
        const photo_div = event.target.parentNode 
        const newFiles = Array.from(Photos_Upload.preview.children).filter(function(file){
            if (file.classList.contains('photo') && !file.getAttribute('id'))
            return true
        })

        const index = newFiles.indexOf(photo_div)
        Photos_Upload.files.splice(index , 1)
        Photos_Upload.update_input_files()
        photo_div.remove()
    },

    remove_old_photo(event){
        const photoDiv = event.target.parentNode

        if(photoDiv.id){
            const removed_files = document.querySelector(" input[name='removed_files'] ")
            if(removed_files){
                removed_files.value += `${photoDiv.id},`
            }
        }
        photoDiv.remove()
    },

    update_input_files(){
        Photos_Upload.input.files = Photos_Upload.get_all_files()
    }
}

const Image_Gallery ={

    highlight: document.querySelector('.gallery .highlight > img'),
    previews: document.querySelectorAll('.gallery_preview img'),

    set_image(e){
        const {target} = e

        Image_Gallery.previews.forEach(preview => preview.classList.remove('active'))
        target.classList.add("active")

        Image_Gallery.highlight.src = target.src
        Lightbox.image.src = target.src
    }
}

const Lightbox = {
    target: document.querySelector('.lightbox_target'),
    image: document.querySelector('.lightbox_target img'),
    close_button:  document.querySelector('.lightbox_target a.lightbox_close'),

    open() {
        Lightbox.target.style.opacity = 1
        Lightbox.target.style.top = 0
        Lightbox.target.style.bottom = 0
        Lightbox.close_button.style.top = 0
    },

    close() {
        Lightbox.target.style.opacity = 0
        Lightbox.target.style.top = "-100%"
        Lightbox.target.style.bottom = "initial"
        Lightbox.close_button.style.top = "-80px"
    }
}