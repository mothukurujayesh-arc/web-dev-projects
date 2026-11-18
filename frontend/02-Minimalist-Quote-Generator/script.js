const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote-btn");
const spaceKeyHint = document.querySelector(".action-hint kbd");

const quotesList = [
  {
    quote: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
  {
    quote: "Less is more.",
    author: "Ludwig Mies van der Rohe",
  },
  {
    quote:
      "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs",
  },
];

let previousIndex;

function generateQuote() {
  let randomIndex = Math.floor(Math.random() * quotesList.length);
  while (randomIndex == previousIndex) {
    randomIndex = Math.floor(Math.random() * quotesList.length);
  }
  previousIndex = randomIndex;

  const selectedQuote = quotesList[randomIndex];
  quoteText.textContent = selectedQuote.quote;
  quoteAuthor.textContent = selectedQuote.author;
}

newQuoteBtn.addEventListener("click", generateQuote);

document.addEventListener("keydown", function (event) {
  // If the spacebar is pressed...
  if (event.code == "Space") {
    spaceKeyHint.classList.add("key-pressed");
    generateQuote();
  }
});
document.addEventListener("keyup", function (event) {
  if (event.code == "Space") {
    spaceKeyHint.classList.remove("key-pressed");
  }
});
