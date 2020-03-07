const Recipe = require('../models/recipe-model')
const db = require('../db') //Need this here to establish the db connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

createRecipe = (req, res) => {
    const body = req.body

    if (!body){
        return res.status(400).json({
            success: false,
            error: 'You must provide a valid recipe',
        })
    }

    const recipe = new Recipe(body)

    if (!recipe){
        return res.status(400).json({ success: false, error: err })
    }

    recipe
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: recipe._id,
                message: 'Recipe created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Recipe not created!'
            })
        })
}

updateRecipe = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Need a body to update'
        })
    }

    Recipe.findOne({ _id: req.query.id }, (err, recipe) => {
        if (err){
            return res.status(404).json({
                err,
                message: "Recipie not found fool"
            })
        }
        recipe.title = body.title
        recipe.description = body.description
        recipe.source = body.source
        recipe.originalUrl = body.originalUrl
        recipe.yield = body.yield
        recipe.active = body.active
        recipe.image = body.image
        recipe.ingredients = body.ingredients
        recipe.instructions = body.instructions
        recipe.notes = body.notes

        recipe
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: recipe._id,
                    message: "Recipe updated!"
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Recipe not updated'
                })
            })
    })
}
deleteRecipe = async (req, res) => {
    await Recipe.findOneAndDelete({ _id: req.query.id }, (err, recipe) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        if (!recipe) {
            return res
                .status(404)
                .json({success: false, error: `Recipe not found`})
        }

        return res.status(200).json({success: true, data: recipe})
    }).catch(error => console.log(error))
}

searchRecipeByTitle = async (req, res) => {
    console.log("hit search")
    await Recipe.find({ title: {$regex: req.query.search, $options: 'i'}}, (err, recipe) => {
        if (err){
            return res.status(400).json({success:false, error: err})
        }

        if (!recipe.length) {
            return res
                .status(404)
                .json({success:false, error: `Recipe not found`})
        }
        return res.status(200).json({success:true, data: recipe})
    })
}

getRecipeById = async (req, res) => {
    console.log("hit id endpoint")
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

getRecipes = async (req, res) => {
    console.log("hit get all")
    await Recipe.find({}, (err, recipies) => {
        if(err){
            return res.status(400).json({success: false, error: err})
        }
        if (!recipies.length){
            return res
                .status(404)
                .json({ success: false, error: `Recipe not found`})
        }
        return res.status(200).json({ success: true, data: recipies })
    }).catch(err => console.log(err))
}

module.exports = {
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipeById,
    searchRecipeByTitle,
    getRecipes
}