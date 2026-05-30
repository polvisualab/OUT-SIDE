document.addEventListener("DOMContentLoaded", () => {
  // ==== DESKTOP / IMG DATA HOVER CALL ====
  if (window.innerWidth >= 768) {
    const heroImg = document.getElementById("img1");
    const artistLinks = document.querySelectorAll(
      "#nav-artist .menu-element[data-img]",
    );

    artistLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        const src = link.dataset.img;
        if (heroImg.getAttribute("src") !== src) {
          heroImg.src = src;
        }
        heroImg.classList.add("visible");
      });

      link.addEventListener("mouseleave", () => {
        heroImg.classList.remove("visible");
      });
    });
  }
});
