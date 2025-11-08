document.addEventListener("DOMContentLoaded", () => {
  const target = document.getElementById("typingText");
  const text = " Not every child grows up with the same opportunities.\n In some parts of the world — and even within our own country — access to education remains limited by geography, poverty, and social inequality. \n But numbers only tell part of the story.\nThe human side of education is just as real — and just as urgent.";
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
