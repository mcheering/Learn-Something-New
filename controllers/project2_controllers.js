const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {

})

//route to send home page where users can choose if they want to make their own flash cards, search for terms from webster's dictionary, or go to the dark side of urban dictionary
router.get('/home', (req, res) => {

})

//route to send page where users can make their own flashcards. 
router.get('/make', (req, res) => {

})

//route to send page where users can search for term to add to their already created categories (decks of cards)
router.get('/search-webster', (req, res) => {

})

//route to send page where users can search for terms and make flashcards from urban dictionary
router.get('/search-urban', (req, res) => {

})


//route to send page where users can choose a stack of cards they have made, and then match terms to defintions through drap and drop.  
router.get('/quiz', (req, res) => {

})

//route to send page where users can see all their decks of cards and delete or add to them them.  
router.get('/edit', (req, res) => {

})

//router to post catergories and any terms with definitions to the DB
router.post('/make', (req, res) => {

})


//router to post catergories and any terms with definitions to the DB from a search from webster's
router.post('/search-webster', (req, res) => {

})

//router to post catergories and any terms with definitions to the DB from a search from Urban Dictionary
router.post('/search-urban', (req, res) => {

})

//router to post score of a user to the DB
router.post('/quiz', (req, res) => {

})

//rotuer to post edits or additions fro the edit page
router.post('/edit', (req, res) => {

})

//route to delete stack or cards from the DB from gthe edit page.  
router.delete('/edit/:id', (req, res) => {

})

module.exports = router
