const form = document.querySelector("#searchForm");
const input = document.querySelector("#input");
const container = document.querySelector("#container");
const recommendationWrapper = document.querySelector("#recommendation-container");
const empty = document.querySelector("#noBooksFound");
empty.style.display = "none";

// get recommended book
axios
  .get("https://www.googleapis.com/books/v1/volumes/hjEFCAAAQBAJ")
  .then(({data}) => {
    getFavoritesBookTemplate(data);
    recommendationWrapper.innerHTML = getFavoritesBookTemplate(data)
  });

  const trimString = (string) =>{
    const length = 650;
    if(string.length>length){
        return string.substring(0, length) + "..."
    }
    return string
  }

const getFavoritesBookTemplate = (data) => {
  const {
    imageLinks = "",
    authors = "",
    title = "",
    categories = [],
    description = "",
    averageRating = 0,
  } = data.volumeInfo;

  return `
    <div class = "recommendation">
      <img class ="recommendation__image" src=${imageLinks.thumbnail}/>
      <div class ="recommendation-info">
        <div class = "recommendation-info__title" >${title}</div>
        <div class = "recommendation-info__author" >${authors}</div>
        <div class = "recommendation-info__rating" >${averageRating}</div>

        <div class = "recommendation-info__description" >${trimString(description)}</div>
        <div class = "recommendation-info__category" >${categories}</div>
      </div>
    </div>
  `;
};


form.addEventListener("submit", async function (e) {
  e.preventDefault();
  if (input === "") {
    empty.style.display = "none";
    container.style.display = "none";
  }
  const { value } = form.elements.query;

  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${value}`
  );
  console.log(response);

  if (response.data.totalItems !== 0) {
    recommendationWrapper.style.display = "initial";
    displayFoundBooks(response.data.items);
  } else {
    empty.style.display = "initial";
    container.style.display = "none";
  }
});

const getHTMLBookFromTemplate = (data) => {
  const {
    imageLinks = "",
    authors = "",
    title = "",
    pageCount = "",
    categories = [],
    previewLink = "",
    canonicalVolumeLink = ""
  } = data.volumeInfo;

  return `
    <div class="book" onclick="window.open('${previewLink || canonicalVolumeLink}', '_blank')">
      <img class="book__image" src=${imageLinks.thumbnail}/>

      <div class ="book-information">
        <div class = "book-information__author" >${authors}</div>
        <div class = "book-information__title" >${title}</div>
        <div class = "book-information__page" >${pageCount}</div>
        <div class = "book-information__category" >${categories}</div>
      </div>
    </div>
  `;
};

const displayFoundBooks = (data) => {
  let contentHTML = "";
  for (let result of data) {
    contentHTML += getHTMLBookFromTemplate(result);
  }
  container.innerHTML = contentHTML;
};
