// Checklist items
const items = [
  "Bite the hand that feeds me.",
  "Throw rocks from my glass house.",
  "Spill milk and cry about it.",
  "Play with fire.",
  "Reap what I sowed.",
  "Put all my eggs in one basket.",
  "Make my bed and lie in it.",
  "Count my chickens before they hatch.",
  "Burn bridges I might need later.",
  "Judge a book by its cover.",
  "Bite off more than I can chew.",
  "Wake the sleeping dogs.",
  "Cross that bridge long before I get to it.",
  "Beat the dead horse (again).",
  "Shoot the messenger.",
  "Look a gift horse in the mouth.",
  "Put off today what I could do tomorrow.",
  "Throw the baby out with the bathwater.",
  "Miss the forest for the trees.",
  "Reinvent the wheel.",
  "Shoot myself in the foot.",
  "Open Pandora’s box.",
  "Dig my own grave.",
  "Kick the hornet’s nest.",
  "Cut off my nose to spite my face.",
  "Cry wolf.",
  "Cross the Rubicorn."
];

const checklist = document.getElementById("checklist");

items.forEach(text => {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  const icon = document.createElement("div");
  icon.className = "check-icon";

  li.appendChild(span);
  li.appendChild(icon);

  li.addEventListener("click", () => {
    li.classList.toggle("checked");
  });

  checklist.appendChild(li);
});
