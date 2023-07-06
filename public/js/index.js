const h1Element = document.getElementById("longName");
const words = h1Element.textContent.split(" ");
const lastWord = words.pop();
const updatedContent = words.map(word => `<span class="word-spacing">${word}</span>`).join(" ");
h1Element.innerHTML = updatedContent + ' <span class="last-word">' + lastWord + '</span>';