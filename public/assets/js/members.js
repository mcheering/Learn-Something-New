/* eslint-disable no-undef */
$(document).ready(function () {
	// This file just does a GET request to figure out which user is logged in
	// and updates the HTML on the page
	$('#logout').on('click', (event) => {
		event.preventDefault()
		// eslint-disable-next-line no-undef
		$.get('/api/logout').then(() => {
			location.reload()
		})
	})

	$('#definition').on('keydown', function (event) {
		let dataObj = {
			topic: $('#topic').val().trim(),
			term: $('#term').val().trim(),
			definition: $('#definition').val().trim()
		}
		if (event.keyCode == 13) {
			$.ajax({
				type: 'POST',
				url: 'api/createCard',
				data: dataObj
			})
			location.reload()
			generateCard()
		}
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
		location.reload()
		generateCard()
	})

	const generateCard = () => {
		$.ajax({
			type: 'GET',
			url: 'api/cards'
		})
			.then((data) => {
				const cardArea = $('#studyTopics')
				data.map(({ categories }) => {
					let newDiv = $('<div class=\'card align-center col-10 studyTopic\'>')
					const categoryCardText = document.createElement('h4')
					categoryCardText.textContent = `${categories}`
					newDiv.append(categoryCardText)
					cardArea.append(newDiv)

				})
			}).catch((err) => console.error(err))
	}
	generateCard()


	$('#studyTopics').on('click', '.studyTopic', function (event) {
		event.preventDefault()
		let category = $(this).children().text()
		$.ajax({
			type: 'GET',
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
      <div class="flip-card-inner my-auto">
            <div class="flip-card-front">
                  <h4 id="cardTerm">${card.term}</h4>
            </div> -->
            <div class="flip-card-back my-auto">
                  <div class="col">
                        <div class="row">
                              <p class="mt-5" id="termBack">${card.definition}</p>
                        </div>
                  </div>
                  <div class="col">
                        <div class="row col-6 mx-auto" id="buttons">
                              <button class="btn btn-success my-1 correctAnswer" data-card-term="${card.term}" data-card-id="${card.card_id}"
                                    >Correct</button>
                              <button class="btn btn-danger my-1 incorrectAnswer" data-card-term="${card.term}" data-card-id="${card.card_id}"
                                    >Incorrect</button>
                              <button class="btn btn-dark my-1" data-card-term = "${card.term}" data-card-id="${card.card_id}" id="deleteButon">Delete Term</button>
                        </div> 
                  </div>
            </div>
      </div>
</div>`

			$('.flashCard').append(newCard)
		}


		//grab correct and incorrect buttons and have the info in them get pushed to correctAnswers and incorrectAnswers

		$('.correctAnswer').on('click', function (event) {
			event.preventDefault()
			currentId = $(this).data('card-id')
			correctTopic = $(this).data('card-term')
			$(`.card-${currentId}`).hide()
			$('#correctAnswers').append(`${correctTopic} <br>`)
		})

		$('.incorrectAnswer').on('click', function (event) {
			event.preventDefault()
			currentId = $(this).data('card-id')
			inCorrectTopic = $(this).data('card-term')
			$(`.card-${currentId}`).hide()
			$('#incorrectAnswers').append(`${inCorrectTopic} <br>`)
		})
	}

	$('.flashCard').on('click', '#deleteButon', function (event) {
		event.preventDefault()
		let currentId = $(this).data('card-id')

		let data = {
			currentId: currentId
		}
		$(`.card-${currentId}`).hide()
		$.ajax({
			type: 'DELETE',
			url: '/api/deleteTerm',
			data: data
		})
		$(`.card-${currentId}`).hide()
	})
})