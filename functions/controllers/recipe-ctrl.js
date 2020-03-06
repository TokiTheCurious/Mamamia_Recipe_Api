const Recipe = require('../models/recipe-model')

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

helloRecipe = (req, res) => {
    res.send("Hello World!")
}

module.exports = {
    createRecipe,
    helloRecipe
}