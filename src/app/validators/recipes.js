async function post(req, res, next) {
    try {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Por favor, preencha todos os campos!")
            }
        }

        if (!req.files || req.files.length == 0){
            return res.send("Envie pelo menos uma imagem !")
        }

        next()

    } catch (error) {
        console.error(error);
    }
}

async function update(req, res, next) {
    try {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" && key != "removed_files") {
                return res.send("Por favor, preencha todos os campos!")
            }    
        }

        if (!req.files || req.files.length == 0){
            return res.send("Envie pelo menos uma imagem !")
        }

        next()

    } catch (error) {
        console.error();
    }
}


module.exports = {
    post,
    update
}