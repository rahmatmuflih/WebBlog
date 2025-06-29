const navbar = document.getElementById("navbar");
const footer = document.getElementById("footer");
const main = document.getElementById("main");
const stickyOffset = navbar.offsetTop;

window.addEventListener("scroll", () => {
  if (window.pageYOffset > stickyOffset) {
    navbar.classList.add("fixed");
  } else {
    navbar.classList.remove("fixed");
  }
});
