const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startBtn = document.getElementsByClassName('btn__reset')[0];
const startOverlay = document.getElementById('overlay');

let missed = 0;

const phrases = [
  "computer games",
  "javascript",
  "web development",
  "programming",
  "html"
];

/**
 * This function takes an array, chooses a random string from the array and then returns the string as an array with each character
 * @param {Array} arr 
 */
function getRandomPhraseAsArray(arr) {
  const phrase = arr[Math.floor(Math.random() * arr.length - 1 ) + 1];
  return phrase.split('');
}

/**
 * This function takes an array of letters and converts them to list items
 * @param {Array} arr 
 */
function addPhraseToDisplay(arr) {
  const ul = phrase.lastElementChild;
  for (let letter of arr) {
    let li = document.createElement("LI");
    
    if(letter !== " ") {
      li.classList.add('letter');
    } else {
      li.classList.add('space');
    }

    li.textContent = letter;
    ul.appendChild(li);
  }
}

function checkLetter(button) {
  const phraseLetters = document.getElementsByClassName('letter');
  let foundLetter = null;
  for(let i = 0; i < phraseLetters.length; i += 1) {
    if (phraseLetters[i].innerHTML === button.textContent) {
      phraseLetters[i].classList.add('show');
      foundLetter = phraseLetters[i];
    } 
  }
  return foundLetter;
}

function checkWin () {
  const phraseLetters = document.getElementsByClassName('letter');
  const shownLetters = document.getElementsByClassName('show');

  if(missed >= 5) {
    startOverlay.classList.replace('start', 'lose');
    startOverlay.style.display = 'flex';
    document.getElementById('title').innerHTML = 'You Lose.  Play Again?';
  } else if (phraseLetters.length === shownLetters.length) {
    startOverlay.classList.replace('start', 'win');
    startOverlay.style.display = 'flex';
    document.getElementById('title').innerHTML = 'You Win!  Play Again?';
  }
}

qwerty.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON') {
    e.target.classList.add('chosen');
    e.target.setAttribute('disabled', true);
    const letterFound = checkLetter(e.target);

    if(letterFound === null) {
      const heartsLi = document.getElementsByClassName('tries');
      const heart = heartsLi[missed].firstElementChild;
      heart.src = "images/lostHeart.png";
      missed += 1;
    }
    checkWin();
  }
})

startBtn.addEventListener('click', e => {
  const phraseUl = document.getElementById('phrase').firstElementChild;
  phraseUl.querySelectorAll('*').forEach(phrase => phrase.remove());

  startOverlay.style.display = 'none';
  startOverlay.classList.remove("win", "lose");
  startOverlay.classList.add("start");

  //reset the keyboard
  const keys = document.querySelectorAll(".keyrow > button");
  for (let key of keys) {
      key.disabled = false;
      key.classList.remove('chosen');
  }

  //reset the hearts
  const heartsLi = document.getElementsByClassName('tries');
  for (let heart of heartsLi) {
      heart.firstElementChild.src = "images/liveHeart.png";
  }

  missed = 0;

  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
});