import { Recipe } from "../types"
import axios from "axios"
import RecipeComponent from "./RecipeComponent"
import App from "../App"

interface DeleteRecipeComponentProps {
    recipe: Recipe,
    
    handleDelete: (recipeId: string) => Promise<void>
    
};



const DeleteRecipeComponent = ({handleDelete, recipe}: DeleteRecipeComponentProps ) => {

    return (
        <div className="delete-recipe-component">
            DeleteRecipeComponent
            <p className="delete-recipe" onClick={ () => handleDelete(recipe._id)}>Delete Recipe from DeleteRecipeComponent</p>
        </div>
    )
}

export default DeleteRecipeComponent