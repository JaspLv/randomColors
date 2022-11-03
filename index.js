const colums = document.querySelectorAll('.col')

const hexCodes = '0123456789ABCDEF'


document.addEventListener('keydown', event => {
    event.preventDefault()
    const code = event.code.toLowerCase()
    if (code === 'space') setColors()
})

document.addEventListener('click', event => {
    const type = event.target.dataset.type
    
    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i' ?
            event.target : event.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    }

    if (type === 'copy') {
        copyToClickboard(event.target.textContent)
    }
})

function copyToClickboard (text) {
    return navigator.clipboard.writeText(text)
}


function setColors(isInitial) {
    const colors = isInitial? getColorsFromHash() : []

    colums.forEach((colum, index) => {
        const isLocked = colum.querySelector('i').classList.contains('fa-lock')
        const text = colum.querySelector('h2')
        const button  = colum.querySelector('button')

        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        const color = isInitial
        ? colors[index] 
            ? colors[index]
            : chroma.random() 
        : chroma.random()


        if (!isInitial) {
            colors.push(color)
        }

        text.textContent = color
        colum.style.background = color



        setTextColor(text, color)
        setTextColor(button, color)   
    })
    updateHashcolors(colors)
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()

    text.style.color = luminance > 0.5? 'black' : 'white'
}

function updateHashcolors(colors = []) {
    window.location.hash = colors
    .map(color => color.toString().substring(1))
    .join('-')
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
        .substring(1)
        .split('-')
        .map(color => `#${color}`)
    }else return []
}

setColors(true)