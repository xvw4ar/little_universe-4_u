const welcome = document.getElementById('welcome');
const city = document.getElementById('city');
const enterBtn = document.getElementById('enterBtn');
const pages = {
  home: document.getElementById('homePage'),
  letter: document.getElementById('letterPage'),
  messages: document.getElementById('messagesPage')
};

enterBtn.addEventListener('click', () => {
  welcome.classList.remove('active');
  city.classList.add('active');
  window.scrollTo(0, 0);
});

document.querySelectorAll('[data-page]').forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    const target = button.dataset.page;
    Object.values(pages).forEach(page => page.classList.remove('active'));
    pages[target].classList.add('active');
    window.scrollTo(0, 0);
    if (target === 'messages') openNextMessage();
  });
});

const fragments = [
  "Across every distance, I hope we keep finding our way back to each other.",
  "Somewhere in the stars, there’s a story I’m glad we get to write together.",
  "Even the longest journey feels shorter when I get to share it with you.",
  "I hope we never run out of places to explore together.",
  "Every little moment with you deserves its own constellation.",
  "Here's to all the galaxies we haven't discovered yet.",
  "Some journeys are worth taking slowly, especially this one.",
  "If our memories were stars, we'd have a sky of our own.",
  "I'd love to see how many beautiful chapters are waiting for us.",
  "This little universe still has so much left to show you.",
  "You're not just my wish come true, you're my beautiful reality.",
  "If life gave me a thousand different beginnings, I'd still hope our paths would meet in every one.",
  "There are still entire worlds to explore, and I hope we get lost in a few of them together.",
  "If I could choose one constant in every changing chapter, it would be you."
];
const finalMessage = "Two different people, one soul.";
const storageKey = 'littleUniverse_discovered_v1';
let discovered = [];
try { discovered = JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch(e) { discovered = []; }

const messageText = document.getElementById('messageText');
const messageCounter = document.getElementById('messageCounter');
const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');
const nextMessageBtn = document.getElementById('nextMessageBtn');
const finalStamp = document.getElementById('finalStamp');
const messageHint = document.getElementById('messageHint');

function updateProgress() {
  progressText.textContent = `${discovered.length} / 14 DISCOVERED`;
  progressBar.style.width = `${(discovered.length / 14) * 100}%`;
}
function revealFinal() {
  messageCounter.textContent = 'FINAL TRANSMISSION // 015';
  messageText.classList.remove('decrypt');
  void messageText.offsetWidth;
  messageText.textContent = finalMessage;
  messageText.classList.add('decrypt');
  messageHint.textContent = 'THE LAST SECRET IN THIS LITTLE UNIVERSE';
  finalStamp.hidden = false;
  nextMessageBtn.textContent = 'RETURN TO NIGHT CITY ↗';
  nextMessageBtn.onclick = () => {
    Object.values(pages).forEach(page => page.classList.remove('active'));
    pages.home.classList.add('active');
    window.scrollTo(0, 0);
  };
}
function openNextMessage() {
  updateProgress();
  if (discovered.length >= 14) {
    revealFinal();
    return;
  }
  const available = fragments.map((_, i) => i).filter(i => !discovered.includes(i));
  const chosen = available[Math.floor(Math.random() * available.length)];
  discovered.push(chosen);
  localStorage.setItem(storageKey, JSON.stringify(discovered));
  messageCounter.textContent = `FRAGMENT ${String(discovered.length).padStart(2,'0')} / 14`;
  messageText.classList.remove('decrypt');
  void messageText.offsetWidth;
  messageText.textContent = fragments[chosen];
  messageText.classList.add('decrypt');
  messageHint.textContent = 'ONE MESSAGE. ONE MOMENT. KEEP IT.';
  finalStamp.hidden = true;
  nextMessageBtn.textContent = discovered.length === 14 ? 'UNLOCK FINAL TRANSMISSION' : 'REVEAL ANOTHER MESSAGE';
  updateProgress();
}
nextMessageBtn.addEventListener('click', () => {
  if (discovered.length >= 14) revealFinal();
  else openNextMessage();
});
