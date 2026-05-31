import gsap from "https://cdn.skypack.dev/gsap";
import ScrambleTextPlugin from "https://cdn.skypack.dev/gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

const tl = gsap.timeline({
  id: "text-scramble",
  defaults: { ease: "none" },
  paused: true,
});

const cursorTl = gsap.timeline({ repeat: -1, paused: true });

gsap.set("#scramble-text-original", { opacity: 0 });

cursorTl
  .to("#scramble-cursor", {
    opacity: 0,
    duration: 0.3,
    ease: "none",
    delay: 0.2,
  })
  .to("#scramble-cursor", {
    opacity: 1,
    duration: 0.3,
    ease: "none",
    delay: 0.2,
  });

tl.to("#scramble-text-1", {
  scrambleText: { text: "recrear en mis dibujos", chars: "lowerCase" },
  duration: 2,
})
  .to("#scramble-text-2", {
    scrambleText: { text: "esa parte", chars: "lowerCase", speed: 0.4 },
    duration: 1.2,
  })
  .to("#scramble-text-3", {
    scrambleText: { text: "tan mágica", chars: "lowerCase" },
    duration: 1.2,
  })
  .to("#scramble-text-4", {
    scrambleText: { text: "que tiene", chars: "lowerCase", speed: 0.3 },
    duration: 0.7,
  })
  .to("#scramble-text-5", {
    scrambleText: { text: "el sueño", chars: "lowerCase", speed: 0.3 },
    duration: 1.2,
  })
  .add(cursorTl);

// SCROLL - OBSERVER
const target = document.querySelector(".text-scramble__content");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        tl.play();
        cursorTl.play();
        observer.unobserve(target);
      }
    });
  },
  {
    threshold: 0.3,
  },
);

observer.observe(target);
