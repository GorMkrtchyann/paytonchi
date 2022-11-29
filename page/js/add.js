document.querySelector('.language-change > img').onclick = function(){
    document.querySelector('.language-change > ul').classList.toggle('d-block')
}

let filterTypes = ['Դպրոց', 'ԲՈՒՀ', 'Այլ Ուսումնական Հաստատություն', 'Առևտրի Վայր', 'Եկեղեցի', 'Ռեստորան / Սրճարան', 'ՏՏ Հաստատություն', 'Դեղատուն', 'Բժշկական Կենտրոն', 'Բանկ', 'Հյուրանոց / Հյուրատուն', 'Թանգարան', 'Գեղեցկության Սրահ', 'Թատրոն / Կինոթատրոն', 'Այլ'];
let AddTypeCont = document.getElementById('add-types');


filterTypes.forEach(element => {
    AddTypeCont.innerHTML += `<span class="add-types-btn">${element}<a>,</a></span>`
});

let AddTypeContBtn = document.querySelectorAll('.add-types-btn')

AddTypeContBtn.forEach(item => {
    item.addEventListener('click', function(){
        let InputType = document.getElementById('types')
        InputType.value = item.innerText.slice(0, -1)
    })
})

let count = 1

function NextStep() {
    let nextStep = document.querySelectorAll('.next-step')

    nextStep.forEach(btn => {
        btn.addEventListener('click', function(){
            let Steps = document.querySelector(`.step-${count}`)

            Steps.style.display = 'none'
            count = count+1
            Steps = document.querySelector(`.step-${count}`)
            Steps.style.display = 'block'
        })
    })
}

NextStep()

function PrevStep(){
    let prevStep = document.querySelectorAll('.prev-step')

    prevStep.forEach(btn => {
        btn.addEventListener('click', function(){
            let Steps = document.querySelector(`.step-${count}`)

            Steps.style.display = 'none'
            count = count-1
            Steps = document.querySelector(`.step-${count}`)
            Steps.style.display = 'block'
        })
    })
}

PrevStep()

let SaveValueData = document.getElementById('saveValue')
let SaveValueDataChackbox = document.getElementById('savevalue')

SaveValueData.addEventListener('click', function(){
    if(SaveValueDataChackbox.checked == true){
        AddLocalStorge()
    }else{
        localStorage.clear()
    }
})

let CancelAdd = document.getElementsByTagName('button')

for (const item of CancelAdd) {
    item.onclick = function(){
        if(item.getAttribute('type') == 'reset'){
            localStorage.clear()
        }
    }
}


function AddLocalStorge(){
    let Inputs = document.querySelectorAll('.inputs');

    Inputs.forEach(item => {
        let key = item.getAttribute('name')
        let value = item.value

        localStorage.setItem(key, value)
    })
}

function LocalStorgeToValue(){
    let Inputs = document.querySelectorAll('.inputs');

    for (const key in localStorage) {
        Inputs.forEach(item => {
            if (key == item.getAttribute('name')) {
                item.value = localStorage[key]
            }
        })
    }
}

LocalStorgeToValue()

let Textarea = document.getElementsByClassName('textarea')

for (const item of Textarea) {
    item.addEventListener('keyup', function(){
        let a = item.value.split("")

        if (item.getAttribute('id') == 'short-about') {
            let countMinus = document.getElementsByClassName('text-count')[0]
            let count = 150
            minus(count, countMinus)
        }else if (item.getAttribute('id') == 'long-about') {
            let countMinus = document.getElementsByClassName('text-count')[1]
            let count = 255
            minus(count, countMinus)
        }
        
        function minus(count, countMinus) {
            countMinus.innerText = count - a.length
    
            if(countMinus.innerText <= 25){
                countMinus.style.color = 'var(--red)'
            }else{
                countMinus.style.color = 'var(--dark-grey)'
            }
        }
    })

    window.onload = function(){
        let a = item.value.split("")

        if (item.getAttribute('id') == 'short-about') {
            let countMinus = document.getElementsByClassName('text-count')[0]
            let count = 150
            minus(count, countMinus)
        }else if (item.getAttribute('id') == 'long-about') {
            let countMinus = document.getElementsByClassName('text-count')[1]
            let count = 255
            minus(count, countMinus)
        }

        function minus(count, countMinus){
            countMinus.innerText = count - a.length
        }
    }
}
