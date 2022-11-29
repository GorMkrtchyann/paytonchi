const contentItems = document.getElementsByClassName('contant');
const search = document.getElementById('search')

let fiterItemBody = document.getElementsByClassName('fiter__item__body');


// let filterArmenianDistricts = ['Անի', 'Ավզնոց', 'Ավտոկայան', 'Արցախ', 'Արագած / Արագած 2', '8-րդ', 'Երկաթգծի Նորավան', 'Կազաչի պոստ', 'Նոր-Ավան', 'Մուշ', 'Մսի Կոմբինատ', 'Սլաբոտկա', 'Ստրոմմաշ', 'Սևերսկի', 'Այլ'];
// let filterEnglishDistricts = ['Ani', 'Avznots', 'Bus-station', 'Artsakh', 'Aragats-Aragats-2', '8th', 'Railway-Noravan', 'Kazakh post', 'Nor-Avan', 'Mush', 'Msi-Kombinat', 'Slabotka', 'Strommash', 'Seversky', 'Other'];

// filterArmenianDistricts.forEach((item, index) => {
//     fiterItemBody[1].innerHTML += `
//     <div>
//         <input type="checkbox" class="filtered-districts filter-input" name="${item.toLowerCase()}" id="${filterEnglishDistricts[index].toLowerCase()}-label">
//         <label for="${filterEnglishDistricts[index].toLowerCase()}-label">${item}</label>
//     </div>`
// })


let filterArmenianTypes = ['Դպրոց', 'ԲՈՒՀ', 'Այլ Ուսումնական Հաստատություն', 'Առևտրի Վայր', 'Եկեղեցի', 'Ռեստորան / Սրճարան', 'ՏՏ Հաստատություն', 'Դեղատուն', 'Բժշկական Կենտրոն', 'Բանկ', 'Հյուրանոց / Հյուրատուն', 'Թանգարան', 'Գեղեցկության Սրահ', 'Թատրոն / Կինոթատրոն', 'Այլ'];
let filterEnglishTypes = ['School', 'University', 'Other-Educational-Institution', 'Retail', 'Church', 'Restaurant-Cafe', 'IT-Facility', 'Pharmacy', 'Medical-Centre', 'Bank', 'Hotel-Guest House', 'Museum', 'Beauty-Salon', 'Theatre-Cinema', 'Other'];

filterArmenianTypes.forEach((item, index) => {
    fiterItemBody[0].innerHTML += `
    <div>
        <input type="checkbox" class="filtered-types filter-input" name="${item.toLowerCase()}" id="${filterEnglishTypes[index].toLowerCase()}-label">
        <label for="${filterEnglishTypes[index].toLowerCase()}-label">${item}</label>
    </div>`
})

search.addEventListener('input', searchRelust)

function searchRelust() {
    let searchRelust = document.getElementById('search-result')
    let newArr = []
    let count = 0

    for (const item of contentItems) {
        if (!!item.dataset.search) {
            if (item.dataset.search.toLowerCase().match(this.value.toLowerCase())) {
                newArr.push(item.dataset.search.toLowerCase())
            }
        }
    }

    let str = ''
    newArr.forEach(elem => {
        if (count != 4) {
            str += `<p>${elem}</p>`
            count++
        }
    })
    searchRelust.innerHTML = str

    searchRelust.addEventListener('click', function({target}){
        search.value = target.innerText
        searchRelust.style.display = 'none'
        searchWithTyping()
    })

    if (newArr.length === 0) {
        searchRelust.style.display = 'none'
    }else{
        searchRelust.style.display = 'block'
    }
}

const SearchButton = document.getElementById('search-button');

SearchButton.addEventListener('click', searchWithTyping)

function searchWithTyping(){
    for (const element of contentItems) {
        if (element.style.display === 'flex') {
            if (element.dataset.search !== search.value) {
                element.style.display = 'none'
            }
        }
    }
}

function filter() {
    let filteredTypes = document.getElementsByClassName('filtered-types');
    let emptyFilteredTypes = [];

    for (const iterator of filteredTypes) {
        iterator.addEventListener('click', function(){
            if (iterator.checked == true){
                iterator.setAttribute('checked', true)
                emptyFilteredTypes.push(iterator.getAttribute('name'))
            }else if (iterator.checked == false){
                iterator.setAttribute('checked', false)
                emptyFilteredTypes.splice(emptyFilteredTypes.indexOf(iterator.getAttribute('name')), 1)
            }


            if (emptyFilteredTypes.length !== 0) {
                emptyFilteredTypes.forEach(item => {
                    for (let contentItemsElement of contentItems) {
                        if (emptyFilteredTypes.length == 1){
                            switch (contentItemsElement.getAttribute('data-types').toLowerCase()) {
                                case item:
                                    contentItemsElement.style.display = 'flex'
                                    break
                                default:
                                    contentItemsElement.style.display = 'none'
                            }
                        }else if (emptyFilteredTypes.length > 1){
                            if (iterator.checked == true){
                                switch (contentItemsElement.getAttribute('data-types').toLowerCase()) {
                                    case item:
                                        contentItemsElement.style.display = 'flex'
                                }
                            }
                        }
                    }
                })
        
                if (iterator.checked == false){
                    let falseA = [];
                    let trueB = [];
                    for (let contentItemsElement of contentItems) {
                        emptyFilteredTypes.forEach(elem => {
                            if (elem != contentItemsElement.getAttribute('data-types').toLowerCase()){
                                falseA.push(contentItemsElement)
                            }else{
                                trueB.push(contentItemsElement)
                            }
                        })
                        falseA.forEach(item => {
                            item.style.display = 'none'
                        })
                        trueB.forEach(item => {
                            item.style.display = 'flex'
                        })
                    }
                }
            }else if(search.value){
                searchWithTyping()
            }else{
                for (let contentItemsElement of contentItems) {
                    contentItemsElement.style.display = 'flex'
                }
            }
        })
    }
}

filter()


let MainContent = document.getElementsByClassName('main-contant')[0];


let MobileFilterOpen = document.querySelector('.filter-mob-btn')
let Filter = document.querySelector('.fiter')
let FilterClose = document.querySelector('.fiter-mob-close')

MobileFilterOpen.onclick = function(){
    Filter.classList.toggle('active')
    if(window.matchMedia("(min-width: 1130px)")){
        document.querySelector('.main-filter').style.minWidth = '280px'
    }else {
        document.querySelector('.main-filter').style.minWidth = '40px'
    }
    FilterClose.onclick = function(){
        Filter.classList.remove('active')
        if(window.matchMedia("(min-width: 1130px)")){
            document.querySelector('.main-filter').style.minWidth = '40px'
        }else {
            document.querySelector('.main-filter').style.minWidth = '280px'
        }
    }
}

window.onscroll = function() {
    if (window.pageYOffset >= contentItems[0].offsetTop) {
        document.getElementsByClassName('toTop')[0].style.display = 'flex'
    }else{
        document.getElementsByClassName('toTop')[0].style.display = 'none'
    }


    if (window.pageYOffset + 160 >= contentItems[0].offsetTop) {
        document.getElementsByClassName('filter-mob-btn')[0].classList.add('sticky')
    }else{
        document.getElementsByClassName('filter-mob-btn')[0].classList.remove('sticky')
    }

    if (document.getElementsByClassName('main')[0].style.display == 'block') {
        if (window.pageYOffset + 75 >= document.getElementsByClassName('main')[0].offsetTop) {
            document.getElementById('filter').classList.add('sticky')
            document.getElementsByClassName('filter-mob-btn')[0].classList.add('sticky')
        }else{
            document.getElementById('filter').classList.remove('sticky')
            document.getElementsByClassName('filter-mob-btn')[0].classList.remove('sticky')
        }
    }

    if(window.matchMedia("(max-width: 1020px)")){
        if (window.pageYOffset + 330 >= MainAboutBlocks[1].offsetTop) {
            MainAboutBlocks[1].classList.add('animate')
        }

        if (window.pageYOffset + 400 >= MainAboutBlocks[2].offsetTop) {
            MainAboutBlocks[2].classList.add('animate')
        }
    }
}

function langChange() {
    document.querySelector('.language-change > img').onclick = function(){
        document.querySelector('.language-change > ul').classList.toggle('d-block')
    }
}

langChange()

let MainAboutBlocks = document.getElementsByClassName('min-about__block');

for (const iterator of document.getElementsByClassName('next')) {
    iterator.onclick = function(){
        document.getElementsByClassName('main')[0].style.display = 'block'
        document.getElementsByClassName('min-about')[0].style.display = 'none'
        console.log(window.location.href + '?main');
        window.location.href + '?main'
    }
}

window.location.href.split('?main', 1) 


window.onload = function() {
    if (window.location.href == window.location.href + '?main') {
        document.getElementsByClassName('main')[0].style.display = 'block'
        document.getElementsByClassName('min-about')[0].style.display = 'none'
    }
}


function HomeOut() {
    document.getElementsByClassName('out')[0].classList.toggle('d-flex')
}



