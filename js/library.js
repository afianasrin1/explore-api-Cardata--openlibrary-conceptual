document.getElementById("error-Message").style.display = "none";
document.getElementById("loading-spinner").style.display = "none";
document.getElementById("book-found").style.display = "none";

const searchBook = () => {
  const searchField = document.getElementById("input-field");
  const searchValue = searchField.value;
  // console.log(searchValue);
  searchField.value = "";
  if (searchValue === "") {
    // console.log("no value");
    document.getElementById("error-Message").style.display = "block";
  } else {
    // console.log(searchValue);
    document.getElementById("loading-spinner").style.display = "block";

    fetch(`http://openlibrary.org/search.json?q=${searchValue}`)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data))
      .catch((error) => {
        document.getElementById("error-Message").style.display = "block";
      });
  }
};

const displaySearchResult = (books) => {
  document.getElementById("error-Message").style.display = "none";
  document.getElementById("loading-spinner").style.display = "none";
  document.getElementById("search-your-book").style.display = "none";
  document.getElementById("book-found").style.display = "block";
  // const searchedBook = books.docs;
  if (books.numFound == 0) {
    alert("No books found");
    // todo: show a message that says "No books found"
  }
  const resultContainer = document.getElementById("search-result");
  displaySearchResult.innerHTML = "";

  // desstructer book
  // books.docs.forEach((singleBook) => {
  books.docs.slice(0, 20).forEach((singleBook) => {
    const { title, publish_date, author_name, cover_i, author_key } =
      singleBook;
    const bookCard = document.createElement("div");
    bookCard.classList.add("col");
    bookCard.innerHTML = `
    <div class="card shadow-lg">
    <div >
    <img src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" alt=".." class="card-img-top w-full">
    </div>
        <div class="card-body">
          <h5 class="card-title">Book Title: ${title}</h5>
          <p class="card-text">Auther: ${author_name?.[0]}</p>
          <p class="card-text">publish date: ${publish_date?.[0]}</p>
        </div>
        <div class="card-footer"><button class="btn btn-outline btn-outline-success" onclick="loadAuthorDetail('${author_key?.[0]}')">Author Information </button></div>
    </div>`;

    resultContainer.appendChild(bookCard);
  });
};

const loadAuthorDetail = (authId) => {
  console.log(authId);
  fetch(`https://openlibrary.org/authors/${authId}.json`)
    .then((res) => res.json())
    .then((data) => displayAuthorDetail(data));
};
const displayAuthorDetail = (author) => {
  window.scrollTo(0, 40);
  // destructer author
  const { name, birth_date, bio } = author;
  const detailContainer = document.getElementById("author-detail");
  detailContainer.innerHTML = `
  <div >
          <h5 class="card-title">Auther Name: ${name}</h5>
          <p class="card-text">Auther birth-date :${
            birth_date ? birth_date : "N/a"
          } </p>
          <p class="card-text">Auther bio: ${bio ? bio : "N/a"}</p>
        </div>`;
};
