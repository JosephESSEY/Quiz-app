console.log('Hello World !!!')
const url = window.location.href


const quizBox = document.querySelector('#quiz-box')



$.ajax({
    type: 'GET',
    url: `${url}data`,
    success : function(response){
        //console.log(response)
        const data = response.data
        data.forEach(element => {
            for (const [question, answers] of Object.entries(element)){
                quizBox.innerHTML += `
                    <hr>
                    <div class="mb-2">
                        <b>${question}</b>
                    </div>
                `
                answers.forEach(answer =>{
                    quizBox.innerHTML += `
                        <div>
                            <input type="radio" class = "ans" id ="${question}-${answer}" name="${question}" value = "${answer}">

                            <label for="${question}">${answer}</label>
                        </div>
                    `
                })
            }
        });
    },
    error: function(error){
        console.log(error)
    }
 })

const quizForm = document.querySelector('#quiz-form')

const csrf = document.getElementsByName('csrfmiddlewaretoken')


const sendData = () =>{
    const elements = [...document.getElementsByClassName('ans')]

    const data = {}
    data['csrfmiddlewaretoken'] = csrf[0].value

    elements.forEach(el =>{
        if (el.checked){
            data[el.name] = el.value
        } else {
            if (!data[el.name]){
                data[el.name] = null
            }
        }
    })

    $.ajax({
        type:'POST',
        url : `${url}save/`,
        data : data,
        success: function(response){
            //console.log(response)
            const results = response.results
            quizForm.classList.add('not-visible')
            //quizForm.remove()
            
            results.forEach(res =>{
                const resDiv = document.createElement("div")
                for (const [question, resp] of Object.entries(res)){
                    // console.log(question)
                    // console.log(resp)
                    // console.log('*****')

                    resDiv.innerHTML += question
                    const cls = ['container', 'p-3', 'text-light', 'h3']
                    resDiv.classList.add(...cls)

                    if(resp === 'not answerd'){
                        resDiv.innerHTML += '- not answered'
                        resDiv.classList.add('bg-danger')
                    }else{
                        const answer = resp['answered']
                        const correct = resp ['correct_answer']


                        if (answer == correct){
                            resDiv.classList.add('bg-success')
                            resDiv.innerHTML += `  <br> Bonne reponse: ${answer}`
                        }else{

                            resDiv.classList.add('bg-danger')

                            resDiv.innerHTML += `  <br>Bonne reponse: ${correct}`
                            resDiv.innerHTML += `  <br> Votre reponse: ${answer}`
                            resDiv.innerHTML += `  <br> <p style="text-align:center;color: black;">Echec</p> `

                        }
                    }
                }

                const body= document.getElementsByTagName('BODY')[0]
                body.append(resDiv)
            })
        },
        error : function(error){
            console.log(error)
        }
    })
}
quizForm.addEventListener('submit', e=>{
    e.preventDefault()
    sendData()
})