const questions = [
    {
        text: "What is the amount of your debt?",
        answers: ["$10k – $20k", "$20k – $50k", "$50k – $80k"]
    },
    {
        text: "How old are you?",
        answers: ["50 – 60 years old", "60 – 70 years old", "Over 70 years old"]
    }
];
let currentQuestion = 0;

function nextQuestion() {
    currentQuestion++;
    let question = document.getElementById("quiz-question");
    
    if (currentQuestion < questions.length) {
        question.innerText = questions[currentQuestion].text;
        document.getElementById("btn1").innerText = questions[currentQuestion].answers[0];
        document.getElementById("btn2").innerText = questions[currentQuestion].answers[1];
        document.getElementById("btn3").innerText = questions[currentQuestion].answers[2];
    } else {
        question.innerText = "Thank you for completing the quiz!";
        question.style.textAlign = "center";
        question.style.alignSelf = "center";
        question.style.display = "flex"
        question.style.justifyContent = "center"
        document.getElementById("answers").innerHTML = '<a href="/" class="participate-button" style="margin-top: 0;">Participate in the program</a>';
    }
}