document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".img-compare-container").forEach(container => {
    const afterImg = container.querySelector(".compare-after"); // 修改为 .compare-after
    const handle = container.querySelector(".compare-slider"); // 修改为 .compare-slider

    function updateSlider(x) {
      const rect = container.getBoundingClientRect();
      let offset = Math.max(0, Math.min(x - rect.left, rect.width));
      let percent = (offset / rect.width) * 100;
      afterImg.style.clipPath = `inset(0 0 0 ${percent}%)`;
      handle.style.left = `${percent}%`;
    }

    // 鼠标拖动事件
    container.addEventListener("mousemove", e => {
      if (e.buttons === 1) { // 确保鼠标左键按下时才触发
        updateSlider(e.clientX);
      }
    });

    // 触摸事件
    container.addEventListener("touchmove", e => {
      e.preventDefault(); // 防止页面滚动
      if (e.touches.length > 0) {
        updateSlider(e.touches[0].clientX);
      }
    });
  });
});