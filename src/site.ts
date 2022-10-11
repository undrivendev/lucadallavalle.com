function chars(input: string) {
  return input.split("");
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * After the into has been 'written', all the other sections are made visible in order by
 * turning the opacity to 1 and playing with different delay times.
 */
function onWriteFinished() {
  setTimeout(() => {
    document.querySelector<HTMLElement>(".currently-at").style.opacity = "1";

  }, 1500);

  const contactsDelay = 5000;
  setTimeout(() => {
    document.querySelector<HTMLElement>(".contacts").style.opacity = "1";

  }, contactsDelay);

  // set timeouts for all contact logos
  document.querySelectorAll<HTMLElement>(".contact-logo").forEach((e, i) => {
    setTimeout(() => {
      e.style.opacity = "1";
    }, contactsDelay + 250 + (i * 250));
  });
}

function introWriting() {
  const characters = document.querySelectorAll<HTMLSpanElement>(".intro .character");

  const interval = 120;
  const humanizerCoefficient = 0.8;

  let i = 0;
  const intervalId = setInterval(async () => {
    // if we're at the end of the text, stop writing
    if (i >= characters.length) {
      clearInterval(intervalId);
      onWriteFinished();
      return;
    }

    // humanize the writing by introducing a random delay
    await sleep(Math.random() * (interval * humanizerCoefficient));

    characters[i].style.display = "initial";
    i++;
  }, interval);
}

function setCursorAnimation() {
  const cursor = document.querySelector<HTMLSpanElement>(".cursor");
  setInterval(() => {
    cursor.style.opacity = (cursor.style.opacity == "1") ? "0" : "1";
  }, 500);
}

function main() {
  setCursorAnimation();
  introWriting();
}

document.addEventListener("DOMContentLoaded", () => {
  main();
});