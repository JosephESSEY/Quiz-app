
/* ce qui donne une html collection donc on le transcrit en tableau en utilisant [...   ] */
const modalBtns = [...document.getElementsByClassName('modal-button')]

const modalBody = document.querySelector('#modal-body-confirm')

const startBtn = document.querySelector('#start-button')

const url = window.location.href

modalBtns.forEach(modalBtn => modalBtn.addEventListener('click', () =>{

    const pk = modalBtn.getAttribute('data-pk')
    const name = modalBtn.getAttribute('data-quiz')
    const numQuestions = modalBtn.getAttribute('data-question')


    modalBody.innerHTML= `
        <div class=" h5 mb-3">Êtes-vous sûr que vous voulez commencer "<b>${name}</b>"? </div>

        <div class = " text-muted">
        <ul>
            <li>Nombre de question : <b>${numQuestions}</b> 
            </li>

        </ul>
    `

    startBtn.addEventListener('click', () =>{

       // console.log(window.location.href)

       window.location.href = url + pk

    })

} ))