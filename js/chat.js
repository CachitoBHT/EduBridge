document.addEventListener("DOMContentLoaded", () => {
  const chatContainer = document.getElementById("chatContainer");
  const chatInput = document.getElementById("chatInput");
  const nameInput = document.getElementById("nameInput");
  const sendBtn = document.getElementById("sendBtn");
  const voicesSection = document.querySelector(".voices-section");
  
  let currentAvatar = "../img/voices-cartoon-male.jpg";
  let currentName = "Anonymous";
  let hasTypingStarted = false; // 标记是否已开始打字

  // 示例对话数据
  const sampleMessages = [
    {
      avatar: "../img/voices-student.jpg",
      name: "Zhu Jian Qiang, Age 9",
      text: "I love drawing in class. I want to be an artist one day.",
      position: "left",
      bgClass: "bg-yellow"
    },
    {
      avatar: "../img/voices-parent.jpg",
      name: "Mother of Xiu Li",
      text: "My son talks more about school now. He wants to read at night.",
      position: "left",
      bgClass: "bg-yellow"
    },
    {
      avatar: "../img/voices-teacher.jpg",
      name: "Ms. Wang (Local Teacher)",
      text: "They might not have much, but these children give everything in every class.",
      position: "left",
      bgClass: "bg-yellow"
    },
    {
      avatar: "../img/voices-me.jpg",
      name: "Myself (Volunteer Teacher)",
      text: "They taught me more about resilience and joy than I could ever teach them.",
      position: "left",
      bgClass: "bg-yellow"
    }
  ];

  // 初始化消息（不立即打字）
  function initMessages() {
    sampleMessages.forEach(msg => {
      const messageElement = document.createElement("div");
      messageElement.className = `message ${msg.position}`;
      messageElement.innerHTML = `
        ${msg.position === 'left' ? `<img src="${msg.avatar}" alt="${msg.name}" class="avatar">` : ''}
        <div class="bubble ${msg.bgClass}">
          <span class="name">${msg.name}</span>
          <p class="text typing"></p>
        </div>
        ${msg.position === 'right' ? `<img src="${msg.avatar}" alt="${msg.name}" class="avatar">` : ''}
      `;
      chatContainer.appendChild(messageElement);
    });
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  // 打字效果
  function startTypingEffect() {
    if (hasTypingStarted) return;
    hasTypingStarted = true;

    const typingElements = document.querySelectorAll(".typing");
    typingElements.forEach((element, index) => {
      const text = sampleMessages[index].text;
      typeText(element, text);
    });
  }

  function typeText(element, text) {
    let index = 0;
    const typing = () => {
      if (index < text.length) {
        element.textContent = text.substring(0, index + 1);
        index++;
        setTimeout(typing, 50);
      } else {
        element.classList.remove("typing");
      }
    };
    typing();
  }

  // 检测视口
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasTypingStarted) {
          startTypingEffect();
        }
      });
    },
    { threshold: 0.5 } // 当 50% 进入视口时触发
  );

  observer.observe(voicesSection);

  // 初始化静态消息
  initMessages();

  // 头像选择
  document.querySelectorAll(".avatar-option").forEach(option => {
    option.addEventListener("click", () => {
      document.querySelector(".avatar-option.selected")?.classList.remove("selected");
      option.classList.add("selected");
      currentAvatar = option.dataset.img;
    });
  });

  // 发送消息
  function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    const name = nameInput.value.trim() || "Anonymous";
    addMessage(currentAvatar, name, message, "right", "bg-blue", false);
    chatInput.value = "";
  }

  function addMessage(avatar, name, text, position, bgClass, isTyping) {
    const messageElement = document.createElement("div");
    messageElement.className = `message ${position}`;
    
    const bubbleContent = isTyping 
      ? `<span class="name">${name}</span><p class="text typing"></p>`
      : `<span class="name">${name}</span><p class="text">${text}</p>`;
    
    messageElement.innerHTML = `
      ${position === 'left' ? `<img src="${avatar}" alt="${name}" class="avatar">` : ''}
      <div class="bubble ${bgClass}">
        ${bubbleContent}
      </div>
      ${position === 'right' ? `<img src="${avatar}" alt="${name}" class="avatar">` : ''}
    `;
    
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    if (isTyping) {
      typeText(messageElement.querySelector(".typing"), text);
    }
  }

  // 事件监听
  sendBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});