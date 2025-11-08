document.addEventListener("DOMContentLoaded", () => {
  const target = document.getElementById("typingText");
  const text = "A glimpse into my journey of teaching in rural Yunnan — and why education access matters.";
  let index = 0;

  target.innerHTML = ""; // ✅ 确保清空初始内容

  function typeChar() {
    if (index < text.length) {
      target.innerHTML += text[index];
      index++;
      setTimeout(typeChar, 40);
    }
  }

  typeChar();
});
