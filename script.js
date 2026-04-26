// Countdown to June 26, 2026, 15:00 Perm time (UTC+5)
(function initCountdown() {
  const TARGET = new Date("2026-06-26T15:00:00+05:00").getTime();
  const elDays = document.getElementById("cd-days");
  const elHours = document.getElementById("cd-hours");
  const elMins = document.getElementById("cd-mins");
  if (!elDays) return;

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    const diff = TARGET - Date.now();
    if (diff <= 0) {
      elDays.textContent = "00";
      elHours.textContent = "00";
      elMins.textContent = "00";
      return;
    }
    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);
    elDays.textContent  = days;
    elHours.textContent = pad(hours);
    elMins.textContent  = pad(mins);
  }

  tick();
  setInterval(tick, 30000);
})();

// Scroll reveal
(function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    observer.observe(el);
  });
})();

// Parallax on script strips
(function initParallax() {
  const loveScript = document.querySelector(".script-strip-love");
  const cheersScript = document.querySelector(".script-strip-cheers");
  const cheersSection = document.querySelector(".cheers-section");

  function onScroll() {
    const sy = window.scrollY;

    if (loveScript) {
      loveScript.style.transform =
        `translateX(-50%) rotate(-1deg) translateY(${sy * 0.12}px)`;
    }

    if (cheersScript && cheersSection) {
      const rel = sy - cheersSection.offsetTop;
      cheersScript.style.transform =
        `translateX(-50%) rotate(-1deg) translateY(${rel * 0.12}px)`;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// RSVP form
const form = document.querySelector("#rsvp-form");
const statusNode = document.querySelector("#form-status");

function setStatus(message, type = "") {
  statusNode.textContent = message;
  statusNode.className = `form-status${type ? ` is-${type}` : ""}`;
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const endpoint = form.action;
    const button = form.querySelector("button[type='submit']");

    if (endpoint.includes("REPLACE_WITH_EMAIL")) {
      setStatus(
        "Чтобы ответы приходили на почту, замените REPLACE_WITH_EMAIL@example.com в index.html на нужный email.",
        "error"
      );
      return;
    }

    button.disabled = true;
    setStatus("Отправляем ответ...");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submit failed");
      }

      form.reset();
      setStatus("Спасибо! Ответ отправлен, будем очень ждать.", "success");
    } catch (error) {
      setStatus(
        "Не получилось отправить форму. Проверьте почту в настройке FormSubmit или попробуйте позже.",
        "error"
      );
    } finally {
      button.disabled = false;
    }
  });
}
