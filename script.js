// Countdown to June 26, 2026, 15:00 Perm time (UTC+5)
(function initCountdown() {
  const TARGET = new Date("2026-06-26T15:00:00+05:00").getTime();
  const elDays  = document.getElementById("cd-days");
  const elHours = document.getElementById("cd-hours");
  const elMins  = document.getElementById("cd-mins");
  if (!elDays) return;

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    const diff = TARGET - Date.now();
    if (diff <= 0) {
      elDays.textContent  = "00";
      elHours.textContent = "00";
      elMins.textContent  = "00";
      return;
    }
    elDays.textContent  = Math.floor(diff / 86400000);
    elHours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    elMins.textContent  = pad(Math.floor((diff % 3600000) / 60000));
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

// Parallax on script strips — via requestAnimationFrame для плавности
(function initParallax() {
  const loveScript   = document.querySelector(".script-strip-love");
  const cheersScript = document.querySelector(".script-strip-cheers");
  const cheersSection = document.querySelector(".cheers-section");

  // Кэшируем offsetTop один раз, обновляем при resize
  let cheersTop = cheersSection ? cheersSection.offsetTop : 0;
  window.addEventListener("resize", () => {
    cheersTop = cheersSection ? cheersSection.offsetTop : 0;
  }, { passive: true });

  let ticking = false;

  function applyParallax() {
    const sy = window.scrollY;

    if (loveScript) {
      loveScript.style.transform =
        `translateX(-50%) rotate(-1deg) translateY(${sy * 0.12}px)`;
    }

    if (cheersScript) {
      cheersScript.style.transform =
        `translateX(-50%) rotate(-1deg) translateY(${(sy - cheersTop) * 0.12}px)`;
    }

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(applyParallax);
      ticking = true;
    }
  }, { passive: true });

  applyParallax();
})();

// RSVP form
(function initForm() {
  const form       = document.querySelector("#rsvp-form");
  const statusNode = document.querySelector("#form-status");
  const button     = form ? form.querySelector("button[type='submit']") : null;

  if (!form) return;

  function setStatus(message, type = "") {
    statusNode.textContent = message;
    statusNode.className = `form-status${type ? ` is-${type}` : ""}`;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const endpoint = form.action;

    if (endpoint.includes("REPLACE_WITH_EMAIL")) {
      setStatus(
        "Замените REPLACE_WITH_EMAIL@example.com в index.html на нужный email.",
        "error"
      );
      return;
    }

    button.disabled = true;
    setStatus("Отправляем ответ...");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      form.reset();
      setStatus("Спасибо! Ответ отправлен, будем очень ждать.", "success");
    } catch (err) {
      if (err.name === "AbortError") {
        setStatus("Превышено время ожидания. Попробуйте ещё раз.", "error");
      } else {
        setStatus("Не получилось отправить форму. Попробуйте позже.", "error");
      }
    } finally {
      clearTimeout(timeout);
      button.disabled = false;
    }
  });
})();
