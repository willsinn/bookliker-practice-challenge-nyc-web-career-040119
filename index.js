document.addEventListener("DOMContentLoaded", function() {
  const listUL = document.querySelector("#list")
  const showPanel = document.querySelector("#show-panel")
  const listPanel = document.querySelector("#list-panel")

  fetch("http://localhost:3000/books", {method: "GET"}).then(resp => resp.json())
  .then(function(booksObject){
      booksObject.forEach(function(book){
        listUL.innerHTML += `<li id="${book.id}-book">${book.title}</li>`
      })
  })//List of book titles

  listUL.addEventListener("click", (event) => {
    // let bookLink = document.querySelector(`book-id="${book.id}"`)

      let click = event.target
      let bookId = parseInt(click.id)
      showPanel.innerHTML=``
      fetch(`http://localhost:3000/books/${bookId}`).then(resp => resp.json())
      .then(function(book){
        showPanel.innerHTML=`<div id="${book.id}-book">
                              <h1>${book.title}</h1>
                              <img src="${book.img_url}">
                              <p>${book.description}</p>
                              </div>
                              `
      })
  })//render book info on clicking title






});
