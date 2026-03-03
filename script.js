/* ---------------- QUIZ GENERICO ---------------- */

function startQuiz(questions) {
    const container = document.querySelector(".quiz-container");
    let current = 0;
    let score = 0;

    function showQuestion() {
        container.innerHTML = "";
        if (current >= questions.length) {
            container.innerHTML = `<div class="result">Punteggio finale: ${score}</div>`;
            return;
        }

        const q = questions[current];

        const questionEl = document.createElement("div");
        questionEl.classList.add("question");
        questionEl.textContent = q.question;

        container.appendChild(questionEl);

        q.answers.forEach(ans => {
            const btn = document.createElement("div");
            btn.classList.add("answer");
            btn.textContent = ans.text;
            btn.onclick = () => {
                if (ans.correct) score++;
                current++;
                showQuestion();
            };
            container.appendChild(btn);
        });
    }

    showQuestion();
}

/* ---------------- REAZIONE VELOCE ---------------- */

function startReactionGame() {
    const box = document.querySelector(".reaction-box");
    box.textContent = "Aspetta...";
    box.style.background = "red";

    const delay = Math.random() * 3000 + 2000;

    setTimeout(() => {
        box.style.background = "green";
        box.textContent = "CLICCA!";
        const start = Date.now();

        box.onclick = () => {
            const time = Date.now() - start;
            box.textContent = "Tempo: " + time + " ms";
        };
    }, delay);
}

/* ---------------- MEMORY ---------------- */

function startMemoryGame() {
    const grid = document.querySelector(".memory-grid");
    const emojis = ["🐶","🐱","🦁","🐵","🐶","🐱","🦁","🐵"];
    emojis.sort(() => 0.5 - Math.random());

    let first = null;
    let second = null;

    emojis.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("memory-card");
        card.dataset.symbol = symbol;

        card.onclick = () => {
            if (card.textContent !== "") return;
            card.textContent = symbol;

            if (!first) {
                first = card;
            } else {
                second = card;
                if (first.dataset.symbol !== second.dataset.symbol) {
                    setTimeout(() => {
                        first.textContent = "";
                        second.textContent = "";
                        first = null;
                        second = null;
                    }, 800);
                } else {
                    first = null;
                    second = null;
                }
            }
        };

        grid.appendChild(card);
    });
}