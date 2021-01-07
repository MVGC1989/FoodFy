/* === SCRIPT DOS CARDS DE RECEITA === */

const cards = document.querySelectorAll('.card')

for(let card of cards){
    card.addEventListener('click', function(){
        const recipe_id = card.getAttribute("id")
        window.location.href = `/recipe/${recipe_id}`
    })
}

/* === ADD CLASSE ACTIVE NO HEADER === */

const current_page = window.location.pathname
const menu_items = window.document.querySelectorAll(" #active ")

for( let item of menu_items){
    if(current_page.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}