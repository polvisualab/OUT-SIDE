import gsap from "https://cdn.skypack.dev/gsap";
import { Draggable } from "https://cdn.skypack.dev/gsap/Draggable";

gsap.registerPlugin(Draggable);

const container = document.querySelector(".float-container");
const items = document.querySelectorAll(".float-item");
const ITEM_SIZE = 120;
const floatTweens = new Map();

function getBounds() {
  return {
    maxX: container.offsetWidth - ITEM_SIZE,
    maxY: container.offsetHeight - ITEM_SIZE,
  };
}

function startFloat(el) {
  if (floatTweens.get(el)) floatTweens.get(el).kill();
  const t = gsap.to(el, {
    y: `+=${gsap.utils.random(15, 30)}`,
    x: `+=${gsap.utils.random(-10, 10)}`,
    rotation: gsap.utils.random(-6, 6),
    duration: gsap.utils.random(2.5, 4),
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
  floatTweens.set(el, t);
}

items.forEach((item) => {
  const { maxX, maxY } = getBounds();
  gsap.set(item, {
    x: Math.random() * maxX,
    y: Math.random() * maxY,
  });
  startFloat(item);
});

Draggable.create(".float-item", {
  type: "x,y",
  allowEventDefault: true, // 👈 esto permite el scroll en mobile
  onDragStart() {
    floatTweens.get(this.target)?.kill();
    this.target.classList.add("dragging");
    gsap.to(this.target, { scale: 1.05, duration: 0.15 });
  },
  onDrag() {
    const { maxX, maxY } = getBounds();
    const x = Math.min(Math.max(this.x, 0), maxX);
    const y = Math.min(Math.max(this.y, 0), maxY);
    gsap.set(this.target, { x, y });
  },
  onDragEnd() {
    this.target.classList.remove("dragging");
    gsap.to(this.target, { scale: 1, duration: 0.2 });
    setTimeout(() => startFloat(this.target), 100);
  },
});
