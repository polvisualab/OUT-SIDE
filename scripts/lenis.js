// lenis.js
import Lenis from "https://unpkg.com/lenis@1.1.14/dist/lenis.mjs";

const lenis = new Lenis({
  lerp: 0.08, // 0.01 muy lento — 0.2 casi sin efecto
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

export default lenis;
