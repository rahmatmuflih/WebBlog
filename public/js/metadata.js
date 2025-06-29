const metadata = document.getElementById("metadata");
const metadataBody = document.getElementById("metadata-body");
const metadataTitle = document.getElementById("metadata-title");
const articleHero = document.getElementById("article-hero");
const article = document.getElementById("article");
const articleTitle = document.querySelector(".article-hero h1");

const stickyMetadata = articleHero.offsetHeight;
const navBarHeight = navbar.offsetHeight;

metadataBody.style.marginTop = `-${metadataTitle.offsetHeight + 19.92}px`;

window.addEventListener("scroll", () => {
  const footerRect = footer.getBoundingClientRect();
  const metadataHeight = metadata.offsetHeight;

  if (window.pageYOffset > stickyMetadata - navBarHeight) {
    metadataTitle.style.opacity = "1";
    metadataTitle.style.transition = "opacity 0.3s ease-in-out 0.2s";
    metadataBody.style.marginTop = `0`;
    metadataBody.style.transition = "margin-top 0.5s ease-in-out";
    metadata.classList.add("metadataFixed");
    metadata.classList.remove("metadataStop");
  } else {
    metadataTitle.style.opacity = "0";
    metadataTitle.style.transition = "opacity 0.3s ease-in-out";
    metadataBody.style.marginTop = `-${metadataTitle.offsetHeight + 19.92}px`;
    metadataBody.style.transition = "margin-top 0.5s ease-in-out";
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
