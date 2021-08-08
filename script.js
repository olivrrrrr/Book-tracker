let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title 
    this.author = author 
    this.pages = pages
    this.read = read
    this.info = function(){
      return `${title} ${author} ${pages} ${read}`
    }
  }

 
  function addBookToLibrary(){
    // let newTitle = prompt('Book title ?')
    // let newAuthor = prompt('Book author ?')
    // let newPages = prompt('Book pages ?')
    // let newRead = prompt('Book read ?')
    myLibrary.push(new Book(newTitle, newAuthor, newPages, newRead))
  }

addBookToLibrary()

function displayBook(){
  myLibrary.forEach((book)=>{
    const container = document.querySelector('.container'); 
    const content = document.createElement('div'); 
    content.textContent = book.info()
    container.appendChild(content)
  })
}


displayBook()