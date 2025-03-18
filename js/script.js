let seuVotoPara = document.querySelector('.d-1-1 span')
let cargo = document.querySelector('.d-1-2 span')
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')

let etapaAtual = 0
let numero = ''

function atualizarInterface() {
    let etapa = etapas[etapaAtual]

    let candidatos = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true
        } else {
            return false
        }
    })

    if (candidatos.length > 0) {
        candidatos = candidatos[0]
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = `Nome: ${candidatos.nome}<br/>Partido: ${candidatos.partido}`
        let fotosHtml = ''
        for (let i in candidatos.foto) {
            if (candidatos.foto[i].small) {
            fotosHtml += `<div class="d-1-image small"><img src="img/${candidatos.foto[i].url}" alt="">${candidatos.foto[i].legenda}</div>`
            } else {
                fotosHtml += `<div class="d-1-image"><img src="img/${candidatos.foto[i].url}" alt="">${candidatos.foto[i].legenda}</div>`
            }
        }
        lateral.innerHTML = fotosHtml 
    } else {
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }
}

function comecarEtapa() {
    let etapa = etapas[etapaAtual]
    let numeroHtml = ''
    numero = ''
    votoBranco = false    

    for (let cont = 0; cont < etapa.numeros; cont++) {
        if (cont === 0) {
            numeroHtml += '<div class="numero pisca"></div>'
        } else {
        numeroHtml += '<div class="numero"></div>'
    }
    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHtml
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca')
    
    if (elNumero !== null) {
        elNumero.innerHTML = n
        numero = `${numero}${n}`
        elNumero.classList.remove('pisca')
            if (elNumero.nextElementSibling !== null) {
                elNumero.nextElementSibling.classList.add('pisca')
            } else {
                atualizarInterface()
            }
    }
}

function branco() {
    if (numero === '') {
        votoBranco = true
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        numeros.innerHTML = ''
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
    } else {
        alert('Para votar em BRANCO, não pode ter digitado nenhum número')
    }
} 

function corrige() {
    comecarEtapa()
}

function confirma() { 
    let etapa = etapas[etapaAtual]
    let votoConfirmado = false
    if (votoBranco) {
        votoConfirmado = true
        console.log('Confirmando como BRANCO...')
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true
        console.log('Confirmando como ' + numero)
    } else {
        alert('Número incompleto!')
    }
    if(votoConfirmado) {
        etapaAtual++
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa()
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
        } 
    }
}

comecarEtapa()