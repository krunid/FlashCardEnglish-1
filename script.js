const SHEET_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

let flashcards = [];
let currentIndex = 0;

const flashcard = document.getElementById('flashcard');
const wordEl = document.getElementById('word');
const meaningEl = document.getElementById('meaning');
const imgFront = document.getElementById('img-front');
const imgBack = document.getElementById('img-back');

function flipCard() {
  flashcard.classList.toggle('flip');
}

function speakWord() {
  if (!flashcards.length) return;
  const utterance = new SpeechSynthesisUtterance(flashcards[currentIndex].word);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}

function nextCard() {
  if (!flashcards.length) return;
  flashcard.classList.remove('flip');
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * flashcards.length);
  } while (newIndex === currentIndex && flashcards.length > 1);

  currentIndex = newIndex;
  const card = flashcards[currentIndex];
  wordEl.textContent = card.word;
  meaningEl.textContent = card.meaning;
  imgFront.src = card.image;
  imgBack.src = card.image;
}

fetch(SHEET_URL)
  .then(res => res.json())
  .then(data => {
    flashcards = data;
    nextCard();
  })
  .catch(err => {
    console.error("โหลดข้อมูลไม่สำเร็จ:", err);
  });
