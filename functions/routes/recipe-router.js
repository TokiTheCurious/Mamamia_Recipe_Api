const express = require('express')

const RecipeCtrl = require('../controllers/recipe-ctrl')

const router = express.Router()

router.post('/recipe', RecipeCtrl.createRecipe)
router.get('/recipe', RecipeCtrl.helloRecipe)

module.exports = router