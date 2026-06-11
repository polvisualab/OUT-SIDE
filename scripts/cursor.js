document.addEventListener("DOMContentLoaded", () => {
  const follower = document.getElementById("cursor-follower");
  const targets = document.querySelectorAll("a, button, .tile, .menu-element");

  document.addEventListener("mousemove", (e) => {
    gsap.to(follower, {
      left: e.clientX,
      top: e.clientY,
      duration: 0.8,
      ease: "power3.out",
    });
  });
  targets.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      const label = el.dataset.cursor;
      document.getElementById("cursor-label").textContent = label || "";
      follower.classList.add("hovering");
    });
    el.addEventListener("mouseleave", () => {
      follower.classList.remove("hovering");
    });
  });
});
