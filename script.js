lucide.createIcons();

const proposalView = document.getElementById("proposalView");
const successView = document.getElementById("successView");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const restartBtn = document.getElementById("restartBtn");
const toast = document.getElementById("toast");

let noClicks = 0;

const noMessages = [
"متأكدة؟",
"خممي مليح",
"آخر فرصة",
"مرة وحدة",
"مزالك باغية تقولي لا؟ ",
"اخر فرصة"
];

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1200);
}

function launchConfetti() {
  const duration = 1800;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      startVelocity: 38,
      origin: { x: 0, y: 0.7 }
    });

    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      startVelocity: 38,
      origin: { x: 1, y: 0.7 }
    });

    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

function toSuccess() {
  proposalView.classList.add("hidden");
  successView.classList.remove("hidden");

  launchConfetti();
  lucide.createIcons();

  const video = document.getElementById("danceVideo");
  if (video) {
    video.play().catch(() => {});
  }
}

function resetView() {
  successView.classList.add("hidden");
  proposalView.classList.remove("hidden");

  noClicks = 0;
  noBtn.style.transform = "";
  noBtn.style.width = "";
  noBtn.style.height = "";
  noBtn.style.fontSize = "";
  noBtn.style.borderRadius = "";
  noBtn.style.position = "";
  noBtn.style.zIndex = "";
  noBtn.style.left = "";
  noBtn.style.top = "";
  noBtn.style.margin = "";
  noBtn.innerHTML = '<i data-lucide="x" width="18" height="18"></i><span>لا</span>';

  lucide.createIcons();
}

yesBtn.addEventListener("click", toSuccess);

noBtn.addEventListener("click", () => {
  noClicks += 1;

  const scale = Math.min(1 + noClicks * 0.18, 9);
  const message = noMessages[Math.min(noClicks - 1, noMessages.length - 1)];

  showToast(message);

  noBtn.style.transform = `scale(${scale})`;
  noBtn.style.zIndex = String(20 + noClicks);

  if (scale > 3) {
    noBtn.style.position = "fixed";
    noBtn.style.left = "50%";
    noBtn.style.top = "50%";
    noBtn.style.margin = "0";
    noBtn.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }

  if (scale >= 6) {
    noBtn.style.width = "100vw";
    noBtn.style.height = "100vh";
    noBtn.style.borderRadius = "0";
    noBtn.innerHTML = '<i data-lucide="x" width="18" height="18"></i><span>لا</span>';
    lucide.createIcons();
  }
});

restartBtn.addEventListener("click", resetView);
