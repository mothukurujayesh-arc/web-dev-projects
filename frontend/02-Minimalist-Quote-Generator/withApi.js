const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote-btn");
const spaceKeyHint = document.querySelector(".action-hint kbd");
const quoteBox = document.querySelector(".quote-box");
const copyIcon = document.getElementById("copyIcon");
const countstatus = document.getElementById("count-status");

let count = 1;
 
function generateQuote() {
  fetch("https://dummyjson.com/quotes/random")
    .then((response) => response.json())
    .then((data) => {
      // We use our unpacked data here!

      //typewriter effect
      quoteText.textContent = "";
      quoteAuthor.textContent = "";
      let i = 0; // start counting from 0
      const typingTimer = setInterval(() => {
        quoteText.textContent += data.quote[i];
        i++;
        if (i === data.quote.length) {
          clearInterval(typingTimer);
        }
        if (i < data.author.length) {
          quoteAuthor.textContent += data.author[i];
        }
        
      }, 50); //run every 50 millionsecond
      count += 1;
      let countShort = count > 9 ? `${count}` : `0${count}`;
      countstatus.textContent = `${countShort}`; 
    })
    .catch((error) => {
      quoteText.textContent = "Oops! Could not fetch a new quote.";
      quoteAuthor.textContent = "From developer";
    });
}
copyIcon.addEventListener("click", () => {
  copyIcon.classList.add("icon-shrink");
  
  setTimeout(()=>{
    copyIcon.classList.remove("bi-copy");
    copyIcon.classList.add("bi-check-lg");
    copyIcon.classList.remove("icon-shrink");
  },200);
  setTimeout(() => {
    copyIcon.classList.add("icon-shrink");

    // 2. Wait 200ms, then swap back to copy icon and grow
    setTimeout(() => {
      copyIcon.classList.remove("bi-check-lg");
      copyIcon.classList.add("bi-copy");
      copyIcon.classList.remove("icon-shrink");
    }, 200);

  }, 900);
  
  let clipboardText = `"${quoteText.textContent}"- ${quoteAuthor.textContent}`;
  // Clipboard API command
  navigator.clipboard.writeText(clipboardText);
});
newQuoteBtn.addEventListener("click", generateQuote);

document.addEventListener("keydown", function (event) {
  // If the spacebar is pressed...
  if (event.code == "Space") {
    generateQuote();
    spaceKeyHint.classList.add("key-pressed");
  }
});
document.addEventListener("keyup", function (event) {
  if (event.code == "Space") {
    spaceKeyHint.classList.remove("key-pressed");
  }
});
