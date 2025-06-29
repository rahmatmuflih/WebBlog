const categorize = document.getElementById("categorize");
const contents = document.getElementById("content");
const filter = document.getElementById("filter");
const filterModal = document.getElementById("filter-modal");
const iconDownArrow = document.getElementById("drop-down");
const iconUpArrow = document.getElementById("drop-up");
const categories = document.getElementById("categories");
const publishDate = document.getElementById("publish-date");
const filterCat = document.getElementById("cat");
const filterPub = document.getElementById("pub");
const textTopic = document.getElementById("text-topic");
const check = document.getElementsByClassName("check");

filter.addEventListener("click", () => {
  const isOpen = filterModal.style.display === "flex";

  filterModal.style.display = isOpen ? "none" : "flex";
  if (!isOpen) {
    iconDownArrow.style.display = "none";
    iconUpArrow.style.display = "block";
  } else {
    iconDownArrow.style.display = "block";
    iconUpArrow.style.display = "none";
  }
});

filterCat.addEventListener("click", () => {
  categories.style.display = "block";
  publishDate.style.display = "none";
  filterModal.style.display = "none";
  textTopic.innerText = "Category";
  check[0].style.display = "block";
  check[1].style.display = "none";
  iconDownArrow.style.display = "block";
  iconUpArrow.style.display = "none";
});

filterPub.addEventListener("click", () => {
  categories.style.display = "none";
  publishDate.style.display = "block";
  filterModal.style.display = "none";
  textTopic.innerText = "Publish Year";
  check[0].style.display = "none";
  check[1].style.display = "block";
  iconDownArrow.style.display = "block";
  iconUpArrow.style.display = "none";
});

window.addEventListener("scroll", () => {
  const rect = footer.getBoundingClientRect();

  if (window.pageYOffset > stickyOffset) {
    categorize.classList.add("categorizeFixed");
    categorize.classList.remove("categorizeStop");
    contents.style.marginLeft = "30%";
  } else {
    categorize.classList.remove("categorizeFixed");
    categorize.classList.remove("categorizeStop");
    contents.style.marginLeft = "0";
  }

  if (rect.top - 160 < window.innerHeight && rect.bottom >= 0) {
    categorize.classList.remove("categorizeFixed");
    categorize.classList.add("categorizeStop");
    contents.style.marginLeft = "30%";
  } else {
    categorize.classList.add("categorizeFixed");
    categorize.classList.remove("categorizeStop");
    contents.style.marginLeft = "30%";
  }
});
