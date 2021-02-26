$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  $('#logout').on("click", (event) => {
    event.preventDefault()
  })
    $.get("/api/user_data").then(function (data) {
      $(".member-name").text(data.email);
    });


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
    location.reload();
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

          let newDiv = $("<div class='card align-center col-10 studyTopic'>")

          const categoryCardText = document.createElement('h4')
          categoryCardText.textContent = `${category}`

          newDiv.append(categoryCardText)
          cardArea.append(newDiv)

        })
      }).catch((err) => console.error(err))
  }
  generateCard()



  $(".studyTopic").click(function (event) {
    event.preventDefault()
    console.log("you clicked a study topic")
  })
});