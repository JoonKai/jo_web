const recommendBtn = document.getElementById("recommendBtn");
const menuResult = document.getElementById("menuResult");
const themeToggle = document.getElementById("theme-toggle");

const dinnerMenus = [
  "치킨", "피자", "삼겹살", "짜장면", "초밥", "떡볶이", 
  "김치찌개", "된장찌개", "부대찌개", "파스타", "햄버거",
  "스테이크", "곱창", "족발", "보쌈", "감자탕", "순대국",
  "라멘", "카레", "돈까스", "냉면", "비빔밥"
];

// Theme handling - The existing theme logic is preserved
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

function recommendDinner() {
  const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
  const selectedMenu = dinnerMenus[randomIndex];
  menuResult.textContent = selectedMenu;
}

recommendBtn.addEventListener("click", recommendDinner);

