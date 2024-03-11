import axios from "axios";
import { Recipe, IngredientInterface } from "../types";
import IngredientComponent from "./IngredientComponent";
import DeleteRecipeComponent from "./DeleteRecipeComponent";
import ImageComponent from "./ImageComponent";

interface RecipeComponentProps {
    recipe: Recipe,
    
    handleDelete: (recipeId: string) => Promise<void>
    showHideFunction: () => void
};


const RecipeComponent = ({recipe, handleDelete, showHideFunction}: RecipeComponentProps) => {
    

    return (
        <div className="recipe-component">

        <div>
            <p>Recept id: {recipe._id}</p>
            <p>Recept namn (title): {recipe.title}</p>
            <p>Bild url: {recipe.imageUrl}</p>
            <p>Categories: {recipe.categories}</p>
        </div>

        <div className="ingredients-div">
            <p>Ingredients: {recipe.ingredients[0].name}</p>
            <p>amount: {recipe.ingredients[0].amount}</p>
            <p>unit: {recipe.ingredients[0].unit}</p>

        </div>

        <div>
        <ul>Ingredienter: {recipe.ingredients.map( ({id, unit, name, amount}: any ) => {

            return <li key={id}> {name} {amount} {unit}</li>

        })}</ul>


        
        <DeleteRecipeComponent handleDelete={handleDelete} recipe={recipe}></DeleteRecipeComponent>

        <p onClick={() => handleDelete(recipe._id)}>x</p>
        </div>

        <ImageComponent showHideFunction={showHideFunction} recipe={recipe}></ImageComponent>

        {/* <button id="button" onClick={ () => showHideFunction()}> Visa bild</button>
        <div className="image-div">
        <button id="button" onClick={ () => showHideFunction()}> Visa bild</button>

            <img id="image" className="image" src={recipe.imageUrl} alt="" />
        </div> */}
           
        </div>


    )
}


export default RecipeComponent
