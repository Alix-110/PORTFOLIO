const questions = [
    {
        question: "Which number comes next in the series: 2, 4, 8, 16, ?",
        options: ["20", "24", "32", "34"],
        answer: "32",
        color: "#3498db" // blue - numeric series
    },
    {
        question: "If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?",
        options: ["Yes", "No", "Cannot say", "Only sometimes"],
        answer: "Yes",
        color: "#8e44ad" // purple - logical reasoning
    },
    {
        question: "Find the odd one out: 3, 9, 27, 81, 100",
        options: ["3", "27", "100", "81"],
        answer: "100",
        color: "#e67e22" // orange - pattern
    },
    {
        question: "If MONKEY is coded as LONJDB, what is the code for TIGER?",
        options: ["QHFDQ", "QHDFS", "SHJFT", "SHFDQ"],
        answer: "QHDFS",
        color: "#1abc9c" // teal - code/letter patterns
    },
    {
        question: "Which shape has 6 faces, 12 edges, and 8 vertices?",
        options: ["Cube", "Tetrahedron", "Cylinder", "Sphere"],
        answer: "Cube",
        color: "#f1c40f" // yellow - geometry
    },
    {
        question: "What is the next letter in the sequence: A, C, F, J, ?",
        options: ["O", "K", "N", "M"],
        answer: "O",
        color: "#e74c3c" // red - sequence
    },
    {
        question: "Which number does not belong: 2, 3, 5, 7, 9, 11",
        options: ["7", "9", "3", "2"],
        answer: "9",
        color: "#34495e" // dark gray - prime numbers
    },
    {
        question: "If 5 cats can catch 5 mice in 5 minutes, how many cats are needed to catch 100 mice in 100 minutes?",
        options: ["5", "10", "20", "25"],
        answer: "5",
        color: "#16a085" // greenish - logic
    },
    {
        question: "Find the missing number: 1, 4, 9, 16, ?, 36",
        options: ["20", "25", "30", "28"],
        answer: "25",
        color: "#c0392b" // deep red - numeric
    },
    {
        question: "If DAY is coded as 123, what is the code for BAD?",
        options: ["213", "132", "231", "321"],
        answer: "213",
        color: "#2980b9" // blue - code
    },
    {
        question: "Which of the following does not belong: Apple, Orange, Carrot, Banana",
        options: ["Apple", "Orange", "Carrot", "Banana"],
        answer: "Carrot",
        color: "#d35400" // orange - classification
    },
    {
        question: "Complete the analogy: Dog : Puppy :: Cat : ?",
        options: ["Kitten", "Cub", "Foal", "Chick"],
        answer: "Kitten",
        color: "#27ae60" // green - analogy
    },
    {
        question: "If 2 pencils cost 8 cents, how much do 5 pencils cost?",
        options: ["20 cents", "15 cents", "18 cents", "25 cents"],
        answer: "20 cents",
        color: "#f39c12" // yellow - calculation
    },
    {
        question: "What comes next: 10, 9, 7, 4, 0, ?",
        options: ["-3", "-1", "-2", "-4"],
        answer: "-3",
        color: "#9b59b6" // purple - numeric
    },
    {
        question: "Find the missing letter: B, D, G, K, ?",
        options: ["O", "L", "M", "P"],
        answer: "P",
        color: "#34495e" // dark gray - sequence
    }
];

let currentQuestion = 0;
let score = 0;

// Function to change background color with smooth transition
function changeBackgroundColor(color) {
    document.body.style.transition = "background 1s ease"; // smooth transition
    document.body.style.background = color;
}

// Load question and set background color
function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question').innerText = q.question;
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn, i) => btn.innerText = q.options[i]);
    document.getElementById('progress').innerText = `Question ${currentQuestion + 1} of ${questions.length}`;
    document.getElementById('score').innerText = `Score: ${score}`;
    changeBackgroundColor(q.color);
}

function checkAnswer(button) {
    const q = questions[currentQuestion];
    if (button.innerText === q.answer) {
        score++;
        button.style.backgroundColor = '#2ecc71'; // green if correct
    } else {
        button.style.backgroundColor = '#e74c3c'; // red if wrong
    }

    setTimeout(() => {
        document.querySelectorAll('.option-btn').forEach(btn => btn.style.backgroundColor = '#58d68d');

        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showScore();
        }
    }, 800);
}

function showScore() {
    document.getElementById('quiz-box').innerHTML = `<h2>Your IQ Test Score: ${score} / ${questions.length}</h2>
    <button onclick="restartQuiz()" class="restart-btn">Restart Quiz</button>`;
    document.getElementById('progress').style.display = 'none';
    document.getElementById('score').style.display = 'none';
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('progress').style.display = 'block';
    document.getElementById('score').style.display = 'block';
    loadQuestion();
}

// Initialize first question
loadQuestion();
