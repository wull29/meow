const klikSound = new Audio("sounds/klik.mp3");
const kemenanganSound = new Audio("sounds/kemenangan.mp3");
const promosiSound = new Audio("sounds/promosi.mp3");

const board = document.getElementById('game-board');

const cards = [
  'roti.jpg', 'roti.jpg',
  'kucing.jpg', 'kucing.jpg',
  'kampus.jpg', 'kampus.jpg',
];

let flippedCards = [];
let matched = 0;

function createCard(imageSrc) {
  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.src = `images/${imageSrc}`;
  img.alt = imageSrc;

  card.appendChild(img);

  card.addEventListener('click', () => {
    klikSound.play();
    if (card.classList.contains('flipped') || flippedCards.length === 2) return;

    card.classList.add('flipped');
    flippedCards.push({ card, imageSrc });

    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (first.imageSrc === second.imageSrc) {
        matched += 1;
        flippedCards = [];

        if (matched === cards.length / 2) {
          setTimeout(() => {
            kemenanganSound.play();
            alert("🎉 Selamat! Kamu berhasil mencocokkan semuanya!");
            showPromo();
          }, 500);
        }

      } else {
        setTimeout(() => {
          first.card.classList.remove('flipped');
          second.card.classList.remove('flipped');
          flippedCards = [];
        }, 800);
      }
    }
  });

  return card;
}

// dipindah ke luar dari createCard
function showPromo() {
  const promo = document.createElement("div");
  promo.className = "promo";
  promo.innerText = "😺 Meong~ Kamu udah main, sekarang waktunya ngemil! Pesan ROBON yuk~";
  document.body.appendChild(promo);

  promosiSound.play();

  setTimeout(() => {
    promo.remove();
  }, 6000);
}

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function initGame() {
  const shuffled = shuffle(cards);
  shuffled.forEach(img => {
    const card = createCard(img);
    board.appendChild(card);
  });
}

initGame();
