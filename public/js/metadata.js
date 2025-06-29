const metadata = document.getElementById("metadata");
const metadataBody = document.getElementById("metadata-body");
const metadataTitle = document.getElementById("metadata-title");
const articleHero = document.getElementById("article-hero");
const article = document.getElementById("article");
const articleTitle = document.querySelector(".article-hero h1");

const stickyMetadata = articleHero.offsetHeight;
const navBarHeight = navbar.offsetHeight;
let topMeta = "";

if (articleTitle.innerText.length >= 48) {
  metadataBody.style.top = "-7.2em";
  topMeta = "-7.2em";
} else if (articleTitle.innerText.length <= 28) {
  metadataBody.style.top = "-3.2em";
  topMeta = "-3.2em";
} else {
  metadataBody.style.top = "-5.2em";
  topMeta = "-5.2em";
}

window.addEventListener("scroll", () => {
  const footerRect = footer.getBoundingClientRect();
  const metadataHeight = metadata.offsetHeight;

  if (window.pageYOffset > stickyMetadata - navBarHeight) {
    metadataTitle.style.visibility = "visible";
    metadataBody.style.top = `0`;
    metadataBody.style.transition = "top 0.5s ease-in-out";
    metadata.classList.add("metadataFixed");
    metadata.classList.remove("metadataStop");
  } else {
    metadataTitle.style.visibility = "hidden";
    metadataBody.style.top = topMeta;
    metadataBody.style.transition = "top 0.8s ease-in-out";
    metadata.classList.remove("metadataFixed", "metadataStop");
  }

  if (metadata.classList.contains("metadataFixed")) {
    article.style.marginLeft = "30%";
  } else {
    article.style.marginLeft = "0";
  }

  if (footerRect.top - 160 < metadataHeight + navBarHeight) {
    metadata.classList.remove("metadataFixed");
    metadata.classList.add("metadataStop");
  }
});
