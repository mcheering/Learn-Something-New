$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $('#logout').on("click", (event) => {
    event.preventDefault()
    $.get("/api/logout").then((data) => {
      location.reload()
    })
  })

  //When user clicks submit button
  // create an obj that captures user input
  //make a post request to api/createCard
  //reload page and then call generateCard function
  $('#createCard').on('click', (event) => {
    event.preventDefault()
    let dataObj = {
      topic: $('#topic').val().trim(),
      term: $('#term').val().trim(),
      definition: $('#definition').val().trim()
    }
    $.ajax({
      type: 'POST',
      url: 'api/createCard',
      data: dataObj
    })
    location.reload();
    generateCard()
  })

  const generateCard = () => {
    $.ajax({
      type: 'GET',
      url: 'api/cards'
    })
      .then((data) => {
        const cardArea = $("#studyTopics")
        data.map(({ categories }) => {
          let newDiv = $("<div class='card align-center col-10 studyTopic'>")
          const categoryCardText = document.createElement('h4')
          categoryCardText.textContent = `${categories}`
          newDiv.append(categoryCardText)
          cardArea.append(newDiv)

        })
      }).catch((err) => console.error(err))
  }
  generateCard()


  $("#studyTopics").on("click", ".studyTopic", function (event) {
    event.preventDefault()
    let category = $(this).children().text()
    console.log(this)
    $.ajax({
      type: "GET",
      url: `/study/${category}`,
    })
      .then((data) => {
        let cardArr = data
        genFlashCards(cardArr)
      })
  })


  const genFlashCards = (cards) => {
    for (card of cards) {
      newCard = `<div class="flip-card mx-auto mb-5 my-5 card-${card.card_id}">
      <div class="flip-card-inner">
            <div class="flip-card-front">
                  <h4 id="cardTerm">${card.term}</h4>
            </div> -->
            <div class="flip-card-back">
                  <div class="col">
                        <div class="row">
                              <p class="mt-5" id="termBack">${card.definition}</p>
                        </div>
                  </div>
                  <div class="col">
                        <div class="row col-6 mx-auto">
                              <button class="btn btn-primary my-1 correctAnswer" data-card-term="${card.term}" data-card-id="${card.card_id}"
                                    >Correct</button>
                              <button class="btn btn-danger my-1 incorrectAnswer" data-card-term="${card.term}" data-card-id="${card.card_id}"
                                    >Incorrect</button>
                        </div>
                  </div>
            </div>
      </div>
</div>`

      $(".flashCard").append(newCard)
    }


    //grab correct and incorrect buttons and have the info in them get pushed to correctAnswers and incorrectAnswers

    $(".correctAnswer").on('click', function (event) {
      event.preventDefault()
      currentId = $(this).data('card-id')
      correctTopic = $(this).data('card-term')
      $(`.card-${currentId}`).hide()
      $("#correctAnswers").append(`${correctTopic} <br>`)
    })

    $(".incorrectAnswer").on('click', function (event) {
      event.preventDefault()
      currentId = $(this).data('card-id')
      inCorrectTopic = $(this).data('card-term')
      $(`.card-${currentId}`).hide()
      $("#incorrectAnswers").append(`${inCorrectTopic} <br>`)
    })
  }
})