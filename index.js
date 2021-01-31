const form = document.querySelector("#searchForm");
const input = document.querySelector("#input");
const container = document.querySelector("#container");
const recommend = document.querySelector("#recommendation");
const empty = document.querySelector("#noBooksFound");
empty.style.display = "none";

// get recomanded book
axios
  .get("https://www.googleapis.com/books/v1/volumes/hjEFCAAAQBAJ")
  .then(({ data }) => {
    getFavouriteBookTemplate(data);
  });

const getFavouriteBookTemplate = (data) => {
  const {
    imageLinks = "",
    authors = "",
    title = "",
    pageCount = "",
    categories = [],
    description = "",
    averageRating = 0,
  } = data.volumeInfo;

  return `
    <div class = "recomandations">
      <img id ="firstImage" img src=${firstImageLink}/>
      <div class ="firstDetails>
      <div class = "firstAuthor" >${firstBookAuthor}</div>
      <div class = "firstTitle" >${firstBooktitle}</div>
      <div class = "firstPage" >${firstBookPageCount}</div>
      <div class = "firstCategory" >${firstBookCategory}</div>
      </div>
    </div>
  `;
};
const displayFirstBook = (first) => {
  contentHTML += getFirstBook(first);
  body.innerHTML = contentHTML;
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
    recommend.style.display = "initial";
    displayFoundBooks(response.data.items);
  } else {
    empty.style.display = "initial";
    container.style.display = "none";
  }
});
// BEM = BLOCK ELEMENT MODIFIER
// block__element--modifier
const getHTMLBookFromTemplate = (data) => {
  const {
    imageLinks = "",
    authors = "",
    title = "",
    pageCount = "",
    categories = [],
  } = data.volumeInfo;
  return `
    <div class = "book">
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
