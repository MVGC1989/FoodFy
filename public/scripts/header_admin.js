/* === ADD CLASSE ACTIVE NO HEADER === */

const current_page_admin = window.location.pathname
const menu_admin_items = window.document.querySelectorAll(" #active_adm ")

for( let adm of menu_admin_items){
    if (current_page_admin.includes(adm.getAttribute("href"))){
        adm.classList.add("activeadm")
    }
}