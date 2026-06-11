// textappear.js
gsap.registerPlugin(SplitText);

document.fonts.ready.then(() => {
  SplitText.create(".text", {
    type: "words",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.words, {
        opacity: 0,
        scale: 0,
        filter: "blur(50px)",
        stagger: { each: 0.03, from: "center" },
        duration: 0.3,
        ease: "power2.out",
      });
    },
  });
});
