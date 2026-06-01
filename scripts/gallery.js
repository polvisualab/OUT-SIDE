const gallery = document.getElementById("gallery");

function moveGallery(xDecimal, yDecimal) {
  const maxX = gallery.offsetWidth - window.innerWidth;
  const maxY = gallery.offsetHeight - window.innerHeight;

  const panX = maxX * xDecimal * -1;
  const panY = maxY * yDecimal * -1;

  gallery.animate(
    { transform: `translate(${panX}px, ${panY}px)` },
    { duration: 4000, fill: "forwards", easing: "ease" },
  );
}

// Desktop
window.addEventListener("mousemove", (e) => {
  const xDecimal = e.clientX / window.innerWidth;
  const yDecimal = e.clientY / window.innerHeight;
  moveGallery(xDecimal, yDecimal);
});

// Mobile
window.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const xDecimal = touch.clientX / window.innerWidth;
    const yDecimal = touch.clientY / window.innerHeight;
    moveGallery(xDecimal, yDecimal);
  },
  { passive: false },
);
