function chars(input: string) {
  return input.split("");
}


function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function setupWriting() {
  const characters = document.querySelectorAll<HTMLSpanElement>(".intro .character");

  const interval = 120;
  const humanizerCoefficient = 0.8;

  let i = 0;
  const intervalId = setInterval(async () => {
    // if we're at the end of the text, stop writing
    if (i >= characters.length) {
      clearInterval(intervalId);
      return;
    }

    // humanize the writing by introducing a random delay
    await sleep(Math.random() * (interval * humanizerCoefficient));

    characters[i].style.display = "initial";
    i++;
  }, interval);
}

function getCursor() {
  return "<span class=\"cursor\">|</span>";
}

function addIntro() {
  const characters = [
    ...chars("Hi! I'm Luca Dalla Valle."),
    ...["<br/>"],
    ...chars("I'm a software engineer based in Italy.")
  ];
  let html = characters.map(c => `<span class="character">${c}</span>`).join("");
  html += getCursor();

  const intro = document.querySelector(".intro p");
  intro.innerHTML = html;
}

function setCursorAnimation() {
  const cursor = document.querySelector<HTMLSpanElement>(".cursor");
  setInterval(() => {
    cursor.style.opacity = (cursor.style.opacity == "1") ? "0" : "1";
  }, 500);
}

function main() {
  addIntro();
  setCursorAnimation();
  setupWriting();
}

document.addEventListener("DOMContentLoaded", () => {
  main();
});