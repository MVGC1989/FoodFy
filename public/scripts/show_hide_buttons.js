/* === FUNÇÃO BOTÕES MOSTRAR E ESCONDER === */

const buttons = document.querySelectorAll(".hide")
    const content = document. querySelectorAll(".content")
for (let i = 0; i<buttons.length; i++){
    buttons[i].addEventListener("click", function(){
        if(content[i].style.display === "block"){// SE A DIV ESTIVER APARECENDO (BLOCK)
            content[i].style.display = "none" // AO CLICAR NO BOTÃO ELA VAI SUMIR (NONE)
            buttons[i].innerHTML = "MOSTRAR" // BOTÃO VAI ESCREVER MOSTRAR
        } 
        else{
            content[i].style.display = "block"
            buttons[i].innerHTML = "ESCONDER"
        }
    })
}
