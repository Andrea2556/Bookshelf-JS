const form = document.querySelector("#searchForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const {value} = form.elements.query;
  
  const res = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${value}`
  );

  if(res.data.totalItems !== 0 ){
    displayFoundBooks(res.data.items);
  } else {
    // todo: Display "No books found".
  }
});

const getHTMLBookFromTemplate = (data) => {
  const { imageLinks="", authors='', title='', pageCount='', categories=[] } = data.volumeInfo;
  return `
    <div>
      <img src=${imageLinks.thumbnail} />
      <div>${authors}</div>
      <div>${title}</div>
      <div>${pageCount}</div>
      <div>${categories}</div>
    </div>
  `;
};


const displayFoundBooks = (data) => {
  const container = document.querySelector("#container");
  let contentHTML = "";
  for (let result of data) {
    contentHTML += getHTMLBookFromTemplate(result);
  }
  container.innerHTML = contentHTML
};
