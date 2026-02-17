const drawBtn = document.getElementById("drawBtn");
const resetBtn = document.getElementById("resetBtn");
const mainBalls = document.getElementById("mainBalls");
const bonusBall = document.getElementById("bonusBall");
const historyList = document.getElementById("historyList");
const themeToggle = document.getElementById("theme-toggle");

const MAX_HISTORY = 10;
const history = [];

// Theme handling
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'dark') {
    themeToggle.checked = true;
  }
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggle.checked = true;
} else {
  document.documentElement.setAttribute('data-theme', 'light');
  themeToggle.checked = false;
}


themeToggle.addEventListener('change', (event) => {
  if (event.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

function getColorClass(number) {
  if (number <= 10) return "yellow";
  if (number <= 20) return "blue";
  if (number <= 30) return "red";
  if (number <= 40) return "gray";
  return "green";
}

function createBall(number) {
  const ball = document.createElement("span");
  ball.className = `ball ${getColorClass(number)}`;
  ball.textContent = String(number);
  return ball;
}

function drawLottoNumbers() {
  const pool = Array.from({ length: 45 }, (_, i) => i + 1);

  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const picked = pool.slice(0, 7);
  const numbers = picked.slice(0, 6).sort((a, b) => a - b);
  const bonus = picked[6];

  return { numbers, bonus };
}

function renderResult(numbers, bonus) {
  mainBalls.innerHTML = "";

  numbers.forEach((number) => {
    mainBalls.appendChild(createBall(number));
  });

  bonusBall.innerHTML = "";
  bonusBall.appendChild(createBall(bonus));
}

function renderHistory() {
  historyList.innerHTML = "";

  history.forEach((entry, index) => {
    const item = document.createElement("li");
    item.textContent = `${history.length - index}회: ${entry.numbers.join(", ")} + [보너스 ${entry.bonus}]`;
    historyList.appendChild(item);
  });
}

function handleDraw() {
  const result = drawLottoNumbers();
  renderResult(result.numbers, result.bonus);

  history.unshift(result);
  if (history.length > MAX_HISTORY) {
    history.pop();
  }

  renderHistory();
}

function handleReset() {
  history.length = 0;
  mainBalls.innerHTML = "";
  bonusBall.innerHTML = "";
  renderHistory();
}

drawBtn.addEventListener("click", handleDraw);
resetBtn.addEventListener("click", handleReset);

handleDraw();
