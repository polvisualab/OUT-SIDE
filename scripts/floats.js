import gsap from "https://cdn.skypack.dev/gsap";
import { Draggable } from "https://cdn.skypack.dev/gsap/Draggable";

gsap.registerPlugin(Draggable);

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".float-item");
  const floatTweens = new Map();

  function startFloat(el) {
    if (floatTweens.get(el)) floatTweens.get(el).kill();
    const t = gsap.to(el, {
      y: `+=${gsap.utils.random(15, 30)}`,
      x: `+=${gsap.utils.random(-10, 10)}`,
      rotation: gsap.utils.random(-6, 6),
      duration: gsap.utils.random(2, 4),
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    floatTweens.set(el, t);
  }

  items.forEach((item) => {
    gsap.set(item, {
      x: Math.random() * (window.innerWidth - item.offsetWidth),
      y: Math.random() * (window.innerHeight - item.offsetHeight),
    });
    startFloat(item);
  });

  Draggable.create(".float-item", {
    type: "x,y",
    onDragStart() {
      floatTweens.get(this.target)?.kill();
      this.target.classList.add("dragging");
      gsap.to(this.target, { scale: 1.05, duration: 0.15 });
    },
    onDragEnd() {
      this.target.classList.remove("dragging");
      gsap.to(this.target, { scale: 1, duration: 0.2 });
      setTimeout(() => startFloat(this.target), 100);
    },
  });
});
