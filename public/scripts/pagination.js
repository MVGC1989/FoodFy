/* === PAGINAÇÃO === */

function paginate(selected_page , total_pages){

    let pages = []
    let old_page 

    for(let current_page = 1; current_page <= total_pages; current_page++){

        const first_and_last_page = current_page == 1 || current_page == total_pages
        const pages_after_selected_page = current_page <= selected_page + 2
        const pages_before_selected_page = current_page >= selected_page - 2

            if(first_and_last_page || pages_before_selected_page && pages_after_selected_page){
                if(old_page && current_page - old_page > 2){
                    pages.push("...")
        }

            if(old_page && current_page - old_page == 2){
                pages.push(old_page + 1)
        }

        pages.push(current_page) 
        old_page = current_page
        }
    }
        return pages
}

function create_pagination(pagination){
    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page 
    const total = +pagination.dataset.total
    const pages = paginate( page, total)
    
    let elements = ""
    
    for (let page of pages){
        if(String(page).includes("...")){
            elements += `<span>${page}</span>`
        } else {
            if(filter){
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
            
        }
    }
    
    pagination.innerHTML = elements
    selectedPage(page)
}

function selectedPage(page) {
    const pagesSelected = document.querySelectorAll('.pagination a')
    pagesSelected.forEach(current_page => {
        if (Number(current_page.innerHTML) == page) current_page.classList.add('activepage')
    })
}

const pagination = document.querySelector(".pagination")

if(pagination){
    create_pagination(pagination)
}


