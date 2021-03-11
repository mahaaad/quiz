let startButton = document.querySelector("button")
let container = document.querySelector(".quiz-container")
let questionList = document.querySelector("ol")
let result = document.querySelector(".result")
let attempted = 0
let score = 0
function updateContainer(questions){
    questions.forEach(question => {
        console.log(question)
        let newQuestion = document.createElement("li")
        let text = document.createElement("p")
        text.innerHTML = question.question
        newQuestion.append(text)
        if(question.type == "boolean"){
            let trueButton = document.createElement("button")
            trueButton.innerHTML = "True"
            trueButton.className="answer-button"
            let falseButton = document.createElement("button")
            falseButton.innerHTML = "False"
            falseButton.className="answer-button"
            newQuestion.append(text, trueButton, falseButton) 
            questionList.append(newQuestion)

            trueButton.addEventListener("click", ()=>{

                trueButton.parentElement.style.pointerEvents = "none"
                trueButton.parentElement.style.opacity = "0.5"

                if(trueButton.innerHTML == question.correct_answer){
                    trueButton.style = "border: 0.1rem solid green"
                    trueButton.parentElement.style.backgroundColor = "green"
                    score+=1
                }
                else{
                    trueButton.style = "border: 0.1rem solid red"
                    trueButton.parentElement.style.backgroundColor = "red"
                }

            })
            falseButton.addEventListener("click", ()=>{
                falseButton.style = "border: 0.1rem solid green"
                falseButton.parentElement.style.pointerEvents = "none"
                if(falseButton.innerHTML == question.correct_answer){
                    falseButton.style = "border: 0.1rem solid green"
                    falseButton.parentElement.style.backgroundColor = "green"
                    score+=1
                }
                else{
                    falseButton.style = "border: 0.1rem solid red"
                    falseButton.parentElement.style.backgroundColor = "red"
                }

            })
        }
        else{
            let correctAnswer = document.createElement("button")
            correctAnswer.innerHTML = question.correct_answer
            correctAnswer.className = "answer-button"
            correctAnswer.addEventListener("click", ()=>{
                correctAnswer.style = "border: 0.1rem solid green"
                correctAnswer.parentElement.style.pointerEvents = "none"
                correctAnswer.parentElement.style.opacity = "0.5"
                correctAnswer.parentElement.style.backgroundColor = "green"
                score += 1

            })

            let correctPosition = Math.floor(Math.random() * 3);   
            count = 0

            question.incorrect_answers.forEach(answer => {
                if(count == correctPosition){
                    newQuestion.append(correctAnswer)
                }
                let wrongAnswer = document.createElement("button")
                wrongAnswer.className="answer-button"
                wrongAnswer.innerHTML = answer
                wrongAnswer.addEventListener("click", ()=>{
                    wrongAnswer.style = "border: 0.1rem solid #00000050"
                    wrongAnswer.parentElement.style.pointerEvents = "none"
                    wrongAnswer.parentElement.style.opacity = "0.5"
                    wrongAnswer.parentElement.style.backgroundColor = "red"

                })
                newQuestion.append(wrongAnswer)
                questionList.append(newQuestion)
                count+=1
            })
        }
    });

    let allButtons = document.querySelectorAll(".answer-button")
    allButtons.forEach(button => {
        button.addEventListener("click", ()=>{
            attempted += 1
            if (attempted > 9){
                container.style.display = "none"   
                result.style.display = "block"
                result.innerHTML = "Your score: " + score +"/10"
            }
        })
    })

}


function getRequest(){
    fetch('https://opentdb.com/api.php?amount=10')
    .then(response => response.json())
    .catch('Questions not retrieved')
    .then(questions => updateContainer(questions.results))
}


startButton.addEventListener("click", ()=>{
    console.clear()
    questionList.innerHTML = ''
    result.style.display = "none"
    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.alignItems = "center"
    getRequest()
})