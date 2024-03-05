import axios from "axios";
import { Recipe, IngredientInterface } from "../types";

interface RecipeComponentProps {
    recipe: Recipe,
    
    handleDelete: (recipeId: string) => Promise<void>
    
}


const RecipeComponent = ({recipe, handleDelete}: RecipeComponentProps) => {
    

    return (
        <div className="recipe-component">

        <div>
        <p>{recipe._id}</p>
        <p>{recipe.title}</p>
        <p>Categories: {recipe.categories}</p>

        <div className="ingredients-">
        <p>Ingredients: {recipe.ingredients[0].name}</p>
        <p>amount: {recipe.ingredients[0].amount}</p>
        <p>unit: {recipe.ingredients[0].unit}</p>

        </div>

        <div>
        <ul>Ingredienter: {recipe.ingredients.map( ({id, unit, name, amount}: any ) => {

            return <li key={id}> {name} {amount} {id}</li>

        })}</ul>


        </div>

        <p onClick={() => handleDelete(recipe._id)}>x</p>
        </div>
           
        </div>


    )
}


export default RecipeComponent
