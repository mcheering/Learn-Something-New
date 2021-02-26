$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $("#createCard").on("click", (event) => {
    event.preventDefault()
    let dataObj = {
      topic: $("#topic").val().trim(),
      term: $("#term").val().trim(),
      definition: $("#definition").val().trim()
    }
    $.ajax({
      type: "POST",
      url: "api/createCard",
      data: dataObj
    })
    generateCard()
  })

  const generateCard = () => {
    $.ajax({
      type: "GET",
      url: "api/cards",
    })
      .then((data) => {
        const cardArea = $("#studyTopics")
        console.log("you got some topics, bruh:", data)
        data.map(({ category }) => {

          let newDiv = $("<div class='card'>")

          const categoryCardText = document.createElement('h4')
          categoryCardText.textContent = `${category}`

          newDiv.append(categoryCardText)
          cardArea.append(newDiv)

        })
      }).catch((err) => console.error(err))
  }
  generateCard()
});
