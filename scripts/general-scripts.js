// CAMBIOS DE COLOR EN SECCIONES //

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".black-bg").forEach((el) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.style.transition = "background-color 0.8s ease";
        el.style.backgroundColor = entry.isIntersecting ? "#1e1e1e" : "#f2f2f2";
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
  });
});
