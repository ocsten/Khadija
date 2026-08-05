document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const proposalView = document.getElementById("proposalView");
  const successView = document.getElementById("successView");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const noLabel = document.getElementById("noLabel");
  const restartBtn = document.getElementById("restartBtn");
  const toast = document.getElementById("toast");
  const meterFill = document.getElementById("meterFill");
  const footerNote = document.getElementById("footerNote");
  const catCaption = document.getElementById("catCaption");
  const floatingHearts = document.getElementById("floatingHearts");
  const danceVideo = document.getElementById("danceVideo");

  let noClicks = 0;

  const noMessages = [
    "متأكدة؟",
    "خممي مليح",
    "آخر فرصة",
    "مرة وحدة",
    "مزالك باغية تقولي لا؟",
    "اخر فرصة",
    "مازال؟"
  ];

  const catMessages = [
    "راني نبكي",
    "مازال عندك وقت",
    "خليه يفرح",
    "حاسة بالندم؟",
    "ديريها زينة"
  ];

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
      toast.classList.remove("show");
    }, 1200);
  }

  function updateNoState() {
    const maxClicks = 8;
    const progress = Math.min(noClicks / maxClicks, 1);

    footerNote.textContent = `عدد محاولات الرفض: ${noClicks}`;
    meterFill.style.width = `${progress * 100}%`;

    const msg = noMessages[Math.min(noClicks - 1, noMessages.length - 1)];
    if (noClicks > 0) showToast(msg);

    const catMsg = catMessages[Math.min(noClicks - 1, catMessages.length - 1)];
    if (noClicks > 0) catCaption.textContent = catMsg;

    if (noClicks <= 2) {
      noLabel.textContent = "لا";
    } else if (noClicks <= 4) {
      noLabel.textContent = "جدًا؟";
    } else if (noClicks <= 6) {
      noLabel.textContent = "مو معقول";
    } else {
      noLabel.textContent = "خلص";
    }

    noBtn.classList.remove("shake");
    void noBtn.offsetWidth;
    noBtn.classList.add("shake");

    const scale = 1 + Math.min(noClicks * 0.015, 0.08);
    noBtn.style.transform = `scale(${scale})`;

    yesBtn.style.transform = `translateY(-1px) scale(${1 + Math.min(noClicks * 0.02, 0.12)})`;
    yesBtn.style.boxShadow = `0 12px 24px rgba(10, 132, 255, ${0.26 + Math.min(noClicks * 0.015, 0.12)})`;

    if (noClicks >= 5) {
      noBtn.style.filter = "saturate(1.15)";
    }

    if (noClicks >= 8) {
      noBtn.innerHTML = '<i data-lucide="x" width="18" height="18"></i><span>آخر لا</span>';
      lucide.createIcons();
    }
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

  function spawnHearts() {
    floatingHearts.innerHTML = "";

    const total = 14;
    const colors = ["#0a84ff", "#ff3b30", "#ff9f0a", "#ff375f"];

    for (let i = 0; i < total; i++) {
      const heart = document.createElement("span");
      heart.className = "heart";
      heart.textContent = "♥";
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.bottom = `${Math.random() * 18}%`;
      heart.style.animationDelay = `${Math.random() * 2.8}s`;
      heart.style.animationDuration = `${4 + Math.random() * 2.5}s`;
      heart.style.fontSize = `${14 + Math.random() * 14}px`;
      heart.style.color = colors[Math.floor(Math.random() * colors.length)];
      floatingHearts.appendChild(heart);
    }
  }

  function toSuccess() {
    proposalView.classList.add("hidden");
    successView.classList.remove("hidden");
    launchConfetti();
    spawnHearts();
    lucide.createIcons();

    if (danceVideo) {
      danceVideo.play().catch(() => {});
    }
  }

  function resetView() {
    successView.classList.add("hidden");
    proposalView.classList.remove("hidden");

    noClicks = 0;
    noLabel.textContent = "لا";
    catCaption.textContent = "راني نبكي";
    footerNote.textContent = "عدد محاولات الرفض: 0";
    meterFill.style.width = "0%";

    noBtn.classList.remove("shake");
    noBtn.style.transform = "";
    noBtn.style.filter = "";
    noBtn.innerHTML = '<i data-lucide="x" width="18" height="18"></i><span id="noLabel">لا</span>';

    yesBtn.style.transform = "";
    yesBtn.style.boxShadow = "";

    lucide.createIcons();
  }

  yesBtn.addEventListener("click", toSuccess);

  noBtn.addEventListener("click", () => {
    noClicks += 1;
    updateNoState();
  });

  restartBtn.addEventListener("click", resetView);
});
