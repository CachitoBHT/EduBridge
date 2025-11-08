document.addEventListener("DOMContentLoaded", () => {
  const target = document.getElementById("typingText");
  const text = "Your opinion can drive change. Share your thoughts on the importance of education for all,and let us know how you would like to contribute to this cause. Every small action counts in the fight for equal education access.";
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
