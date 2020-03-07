const Recipe = require('../models/recipe-model')
const recipeService = require('../controllers/recipe-ctrl')

module.exports = async (req, res) => {
    switch(req.method.toLowerCase()){
        case 'get':
            return await recipeGetRequests(req, res)
        case 'post':
            return recipeService.createRecipe(req, res)
        case 'put':
            return await recipeService.updateRecipe(req, res)
        case 'delete':
            return await recipeService.deleteRecipe(req, res)
    }
}

recipeGetRequests = async (req, res) => {
    if (req.query){
        if(req.query.id)
            return await recipeService.getRecipeById(req,res)
        if(req.query.search)
            return await recipeService.searchRecipeByTitle(req, res)
    }
    return recipeService.getRecipes(req, res)
}


getRecipeById = async (req, res) => {
    await Recipe.findOne({ _id: req.query.id }, (err, recipe) => {
        if (err){
            return res.status(400).json({success:false, error: err})
        }

        if (!recipe) {
            return res
                .status(404)
                .json({success:false, error: `Recipe not found`})
        }
        return res.status(200).json({success:true, data: recipe})
    })
}

getAllRecipes = async (req, res) => {
    await Recipe.find({}, (err, recipes) => {
        if(err){
            return res.status(400).json({success: false, error: err})
        }
        if (!recipes.length){
            return res
                .status(404)
                .json({ success: false, error: `Recipe not found`})
        }
        return res.status(200).json({ success: true, data: recipes })
    }).catch(err => console.log(err))
}