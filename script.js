const button = document.querySelector('.newBook');
const popupContainer = document.querySelector('.popup-container');
const overlay = document.getElementById('overlay'); 
const closeButton = document.querySelector('.close-button'); 
const submit = document.getElementById('submit'); 

let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title 
    this.author = author 
    this.pages = pages
    this.read = read
}

submit.addEventListener('click', ()=>{
  addBookToLibrary(); 
  displayBook();
  popupContainer.classList.remove('active')
  overlay.classList.remove('active')

})

// This allows the pop-up to occur
button.addEventListener('click', ()=>{
popupContainer.classList.add('active')
overlay.classList.add('active')
})

closeButton.addEventListener('click', ()=> {
popupContainer.classList.remove('active')
overlay.classList.remove('active')
})

function addBookToLibrary(){
  let bookName = document.getElementById('bookname').value; 
  let authorName = document.getElementById('authorname').value; 
  let numberOfPages = document.getElementById('numberofpages').value; 
  let read = document.getElementById('read').value; 
  let newBook = new Book(bookName, authorName, numberOfPages, read)
  myLibrary.push(newBook)
}

function displayBook(){
    const container = document.querySelector('.container'); 
    const content = document.createElement('div');
    content.innerHTML = `
    <div class='card'>
      <h2>Book Title : ${myLibrary[myLibrary.length-1].title}</h2>
      <h2>Author : ${myLibrary[myLibrary.length-1].author}</h2>
      <h2>Pages : ${myLibrary[myLibrary.length-1].pages}</h2>
      <h2>Read : ${myLibrary[myLibrary.length-1].read}</h2>
  </div>`
    container.appendChild(content)
}
