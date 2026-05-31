const divs_data = [
  { selector: ".div1", base: -12, axis: "x" },
  { selector: ".div2", base: 15, axis: "x" },
  { selector: ".div3", base: -25, axis: "y" },
];

document.addEventListener("DOMContentLoaded", () => {
  const about = document.querySelector(".about-info");
  const divs = divs_data.map((d) => ({
    ...d,
    el: document.querySelector(d.selector),
  }));

  if (window.innerWidth >= 768) {
    gsap.set(
      divs.map((d) => d.el),
      { transformOrigin: "center center" },
    );
    divs.forEach((d) => gsap.set(d.el, { rotation: d.base, opacity: 1, y: 0 }));
  }

  let raf = null;
  let mouseX = 0,
    mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    if (window.innerWidth < 768) return;

    const rect = about.getBoundingClientRect();
    const inside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (inside) {
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
      if (!raf) raf = requestAnimationFrame(update);
    } else {
      divs.forEach((d) => {
        gsap.to(d.el, {
          rotation: d.base,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        });
      });
    }
  });

  function update() {
    raf = null;
    divs.forEach((d) => {
      const influence = d.axis === "x" ? mouseX : mouseY;
      const range = 20;
      const target = d.base + influence * range * Math.sign(d.base || 1);

      gsap.to(d.el, {
        rotation: target,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }
});
