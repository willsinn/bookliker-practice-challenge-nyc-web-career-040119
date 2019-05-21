document.addEventListener("DOMContentLoaded", function() {
  const listUL = document.querySelector("#list")
  const showPanel = document.querySelector("#show-panel")
  const listPanel = document.querySelector("#list-panel")
  const user1 = {"id":1, "username":"pouros"};


  fetch("http://localhost:3000/books", {method: "GET"}).then(resp => resp.json())
  .then(function(booksObject){
      booksObject.forEach(function(book){
        listUL.innerHTML += `<li id="b${book.id}">${book.title}</li>`
      })
  })//List of book titles

  listUL.addEventListener("click", (event) => {
    // let bookLink = document.querySelector(`book-id="${book.id}"`)

      let click = event.target
      let handleClick = click.id.substring(1);
      let bookId = parseInt(handleClick)
      showPanel.innerHTML=``
      fetch(`http://localhost:3000/books/${bookId}`).then(resp => resp.json())
      .then(function(book){
        showPanel.innerHTML+=`<div id="b${book.id}">
                              <h1>${book.title}</h1>
                              <img src="${book.img_url}"><button id="${book.id}"> follow & like </button>
                              <p>${book.description}</p>
                              </div>
                              <div style="display:block;"><span style="background-color:green; height:20px; width:20px; justify-content:center; color:black; padding-left:4px; border-radius:6px; border:1px solid red; margin-right:4px;">  ${book.users.length}  </span><span><b>  Readers Following</b></span></div>
                              `
        for (let user in book.users) {
        let readers = book.users[user]
          showPanel.innerHTML+=`
                                <span id="u${readers.id}">
                                <h4>${readers.username}</h4>
                                </span>
                               `
        }
      })
  })//render book info on clicking title
  showPanel.addEventListener("click", event => {
      let targetBook = event.target
      let getBookId = parseInt(targetBook.id)
      let followString = targetBook.parentElement.parentElement.children[1]
      let followNum = parseInt(followString.innerText)
      followString.innerText = `${followNum + 1}`
      fetch(`http://localhost:3000/books/${getBookId}`, {
                                    method:"PATCH",
                                    headers: {
                                    "Content-Type":"application/json",
                                    Accept: "application/json"
                                  },body: JSON.stringify({"users": [{"id":1, "username":"pouros"}]})
                                }).then(resp => resp.json())
                                .then(book => {
                                  for (let user in book.users) {
                                  let readers = book.users[user]
                                  showPanel.innerHTML+=`
                                    <span id="u${readers.id}">
                                    <h4>${readers.username}</h4>
                                    </span>
                                  `
                                }
                              })
  })





});
