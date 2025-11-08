function updateTime() {
  const now = new Date(); // Gets current time
  const formattedTime = now.toLocaleTimeString(); // Formats as HH:MM:SS
  document.getElementById("timeDisplay").textContent = formattedTime; // Updates time display
}

// Update every second (1000ms)
setInterval(updateTime, 1000);
updateTime(); // Call immediately to avoid delay