// const button = document.querySelector('.newBook');
// const popupContainer = document.querySelector('.popup-container');
// const overlay = document.getElementById('overlay'); 
// const closeButton = document.querySelector('.close-button'); 
// const submit = document.getElementById('submit'); 

// let myLibrary = [];

// function Book(title, author, pages, read){
//     this.title = title 
//     this.author = author 
//     this.pages = pages
//     this.read = read
// }

// submit.addEventListener('click', ()=>{
//   addBookToLibrary(); 
//   displayBook();
//   popupContainer.classList.remove('active')
//   overlay.classList.remove('active')

// })

// // This allows the pop-up to occur
// button.addEventListener('click', ()=>{
// popupContainer.classList.add('active')
// overlay.classList.add('active')
// })

// closeButton.addEventListener('click', ()=> {
// popupContainer.classList.remove('active')
// overlay.classList.remove('active')
// })

// function addBookToLibrary(){
//   let bookName = document.getElementById('bookname').value; 
//   let authorName = document.getElementById('authorname').value; 
//   let numberOfPages = document.getElementById('numberofpages').value; 
//   let read = document.getElementById('read').value; 
//   let newBook = new Book(bookName, authorName, numberOfPages, read)
//   myLibrary.push(newBook)
// }

// function displayBook(){
//     const container = document.querySelector('.container'); 
//     const content = document.createElement('div');
//     content.innerHTML = `
//     <div class='card'>
//       <h2>Book Title : ${myLibrary[myLibrary.length-1].title}</h2>
//       <h2>Author : ${myLibrary[myLibrary.length-1].author}</h2>
//       <h2>Pages : ${myLibrary[myLibrary.length-1].pages}</h2>
//       <h2>Read : ${myLibrary[myLibrary.length-1].read}</h2>
//   </div>`
//     container.appendChild(content)
// }

// Storage Controller 
const StorageCtrl = (function(){

  return {
    storeItem: function(item){
      let items
      if(localStorage.getItem('items') === null){
        items = []
        items.push(item)
        localStorage.setItem('items', JSON.stringify(items))
      }
      else{
        items = JSON.parse(localStorage.getItem('items')) 
        items.push(item)
        localStorage.setItem('items',JSON.stringify(items) )
      } 
    },
    getItemsFromStorage: function(){
      let items
      if(localStorage.getItem('items') === null){
        items = []
      }
      else{
        items = JSON.parse(localStorage.getItem('items')) 
      } 
      return items
    }, 
    deleteItemFromStorage: function(title){
        let items = JSON.parse(localStorage.getItem('items'))

        items.forEach(function(item, index){
          if(title === item.title){
            items.splice(index, 1)
          }
        })
        localStorage.setItem('items', JSON.stringify(items))
    }
  }
})() 



// Item Controller 
const ItemCtrl = (function(){
      
      class Book{
        constructor(title,author, pages,read){
          this.title = title; 
          this.author = author 
          this.pages = pages
          this.read = read
        }
      }

      // data structure / state
      let data = {
      //   items: [{title: 'hi', author: 'jk', pages: 10, read: 'yes'},
        
      // ], 
         items: StorageCtrl.getItemsFromStorage() ,
        currentItem: null
      } 

      return { 
        showData: function(){ 
            return data; 
        }, 
        getItemById: function(id){
            let found = null; 
            data.items.forEach(function(item){
                if(item.title === id){
                  found = item
                }
            })
            return found
        },
        addItem:function(title, author, pages, read){ 
            let newBook = new Book(title, author, pages, read)
            data.items.push(newBook)

            return newBook
        },
         setCurrentItem: function(item){
              data.currentItem = item
        }, 
        getCurrentItem: function(){
            return data.currentItem
        },
        getItems: function(){
          return data.items
        }, 
        deleteItem: function(id){
          const itemTitles = data.items.map(function(item){
            return item.title
          })
          
          const index = itemTitles.indexOf(id)
          
          data.items.splice(index, 1)
      }, 
      }
})()

// UI Ctrl 
const UICtrl = (function(){
  UISelectors = {
    container: '.container',
    addBtn: '.newBook',
    popupContainer: '.popup-container',
    overlay: '#overlay', 
    submit: '#submit' ,
    titleInput: '#bookname',
    authorInput: '#authorname',
    pageInput: '#numberofpages',
    readInput: '#read', 
    closeButton: '.close-button', 
    deleteButton: '#deleteBtn'
  }

return{ 
  getSelectors: function(){
  return UISelectors
}, 
  populateData:function(items){

    let html = '' 

     items.forEach((item) =>{
      html += `
      <div class='card'>
        <h2>Book Title: ${item.title}</h2>
        <h2>Author: ${item.author} </h2>
        <h2>Pages: ${item.pages}</h2>
        <h2>Read: ${item.read} </h2>
        <button class="deleteBtn"> Delete </button>
       
      </div>`
     }) 

     document.querySelector(UISelectors.container).innerHTML = html
  },
  getItemInput: function(){
    return{
       title: document.querySelector(UISelectors.titleInput).value,  
       author: document.querySelector(UISelectors.authorInput).value, 
       pages: document.querySelector(UISelectors.pageInput).value,
       read: document.querySelector(UISelectors.readInput).value
    }
  },
  inputPopup:function(){
    document.querySelector(UISelectors.popupContainer).classList.add('active')
    document.querySelector(UISelectors.overlay).classList.add('active')
  },
  addBooksToUI: function(item){ 
    const content = document.createElement('div');
    content.className = 'book-item'
    content.id = `item-${item.title}`
    content.innerHTML = `
    <div class='card'>
      <h2 id="title">Book Title: ${item.title}</h2>
      <h2>Author: ${item.author} </h2>
      <h2>Pages: ${item.pages}</h2>
      <h2>Read: ${item.read} </h2>
      <button id="deleteBtn"> Delete </button>
    </div>`

    document.querySelector(UISelectors.container).appendChild(content)
  },
  clearInputFields: function(){
    document.querySelector(UISelectors.titleInput).value = ''
    document.querySelector(UISelectors.authorInput).value = ''
    document.querySelector(UISelectors.pageInput).value = ''
    document.querySelector(UISelectors.readInput).value = ''
  }, 
  removePopup: function(){
    document.querySelector(UISelectors.popupContainer).classList.remove('active')
    document.querySelector(UISelectors.overlay).classList.remove('active')
  }
}
})()

// App Ctrl 
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
  
    const loadEventListeners = function(){
         const UISelectors = UICtrl.getSelectors()

         document.querySelector(UISelectors.addBtn).addEventListener('click', popupContainer)
         function popupContainer(){
            UICtrl.inputPopup()
            }

          document.querySelector(UISelectors.submit).addEventListener('click', addNewBook)
          
          function addNewBook(){
            const input = UICtrl.getItemInput()
            if(input.title !== '' || input.author !== '' || input.pages !== '' ||
            input.read !== ''  ){
                const newItem = ItemCtrl.addItem(input.title, input.author, input.pages,  input.read)
                UICtrl.addBooksToUI(newItem)
                
                StorageCtrl.storeItem(newItem)
                
                UICtrl.clearInputFields()
                
                UICtrl.removePopup()
            }   

            document.querySelector(UISelectors.closeButton).addEventListener('click', closePopup)
            function closePopup(){ 
               UICtrl.removePopup()
            }

            document.querySelector(UISelectors.deleteButton).addEventListener('click', deleteItem)
            
            function deleteItem(e){ 
                const items = ItemCtrl.getItems()
                const listId = e.target.parentNode.parentNode.id 
                const listIdArr  = listId.split('-')
                const id = listIdArr[1]
                console.log(id)
                const itemToDelete = ItemCtrl.getItemById(id)
                console.log(itemToDelete)
                ItemCtrl.setCurrentItem(itemToDelete)
                const currentItem = ItemCtrl.getCurrentItem();
                ItemCtrl.deleteItem(currentItem.title)
                // Delete from Local Storage
                StorageCtrl.deleteItemFromStorage(currentItem.title) 
                e.target.parentNode.parentNode.remove()
            }
          }
        }
  
  return{
    init: function(){ 
      const items = ItemCtrl.getItems()
       
       UICtrl.populateData(items)
       
       loadEventListeners()
    }
  }
})(ItemCtrl, StorageCtrl, UICtrl)


App.init()




