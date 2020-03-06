const express = require('express')

const RecipeCtrl = require('../controllers/recipe-ctrl')

const router = express.Router()

router.post('/recipe', RecipeCtrl.createRecipe)
router.put('/recipe/:id', RecipeCtrl.updateRecipe)
router.get('/recipe', RecipeCtrl.getRecipies)
router.get('/recipe/:id', RecipeCtrl.getRecipeById)
router.get('/search?:query', RecipeCtrl.searchRecipeByTitle)
router.delete('/recipe', RecipeCtrl.deleteRecipe)

module.exports = router