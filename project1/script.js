const quizData = [
    {
        question: "What is the time complexity of binary search?",
        a: "O(n)",
        b: "O(n^2)",
        c: "O(log n)",
        d: "O(1)",
        correct: "c",
        hint: "It's a divide and conquer algorithm."
    },
    {
        question: "Which data structure is used for BFS?",
        a: "Stack",
        b: "Queue",
        c: "Array",
        d: "Linked List",
        correct: "b",
        hint: "FIFO structure is required."
    },
    {
        question: "What is the worst-case time complexity of quicksort?",
        a: "O(n)",
        b: "O(n log n)",
        c: "O(n^2)",
        d: "O(1)",
        correct: "c",
        hint: "It happens when the pivot is always the smallest or largest element."
    },
    {
        question: "Which algorithm is used to find the shortest path in a graph?",
        a: "Dijkstra's algorithm",
        b: "Merge Sort",
        c: "Kruskal's algorithm",
        d: "Depth First Search",
        correct: "a",
        hint: "It's a greedy algorithm."
    }
];

let currentQuiz = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

const questionEl = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const timerEl = document.getElementById("timer");
const progressBar = document.getElementById("progress");
const hintContainer = document.getElementById("hint-container");
const hintText = document.getElementById("hint-text");
const hintBtn = document.getElementById("hint-btn");

loadQuiz();

function loadQuiz() {
    resetTimer();
    startTimer();

    deselectAnswers();
    updateProgressBar();

    const currentQuizData = quizData[currentQuiz];
    
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

    hintText.innerText = currentQuizData.hint;
    hintContainer.classList.add("hidden");
}

function getSelected() {
    let answer = undefined;
    
    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    
    return answer;
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

function updateProgressBar() {
    const progressPercentage = ((currentQuiz + 1) / quizData.length) * 100;
    progressBar.style.width = progressPercentage + "%";
}

function startTimer() {
    timeLeft = 30;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            submitBtn.click();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerEl.textContent = 30;
}

submitBtn.addEventListener("click", () => {
    const answer = getSelected();
    
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            document.querySelector(".quiz-container").innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly.</h2>
                <button onclick="location.reload()">Reload</button>
            `;
        }
    }
});

hintBtn.addEventListener("click", () => {
    hintContainer.classList.toggle("hidden");
});