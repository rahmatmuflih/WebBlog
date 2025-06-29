const accordion = document.getElementsByClassName("accordion-button");
const preview = document.getElementsByClassName("preview");
const btnRead = document.getElementsByClassName("read");
const iconPlus = document.getElementsByClassName("plus");
const iconMinus = document.getElementsByClassName("minus");

for (let i = 0; i < accordion.length; i++) {
  accordion[i].setAttribute("data-index", i);

  accordion[i].addEventListener("click", (e) => {
    const index = e.currentTarget.dataset.index;
    const i = parseInt(index);

    const isVisible = preview[i].style.display === "grid";

    preview[i].style.display = isVisible ? "none" : "grid";
    btnRead[i].style.display = isVisible ? "none" : "flex";

    if (!isVisible) {
      iconPlus[i].style.display = "none";
      iconMinus[i].style.display = "inline";
    } else {
      iconPlus[i].style.display = "inline";
      iconMinus[i].style.display = "none";
    }
  });
}
