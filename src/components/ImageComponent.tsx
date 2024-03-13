import React from 'react'
import axios from "axios";
import { RecipeInterface, IngredientInterface } from "../types";
import IngredientComponent from "./IngredientComponent";
import DeleteRecipeComponent from "./DeleteRecipeComponent";


interface RecipeComponentProps {
    recipe: RecipeInterface,
    
    showHideFunction: () => void
};



const ImageComponent = ( {recipe, showHideFunction}: RecipeComponentProps) => {

    async function showHideFunction1 (recipeId: string) {

        const response = await axios.get(`${URL}/${recipeId}`);

        if(response.status === 200) {

            let x = document.getElementById(recipe._id);
    
    
    
            if (x?.style.display === "block") {
                x.style.display = "none"
            } else {
               x!.style.display = "block"
            }

        }


        
    
      };

  return (

    <div>
      {/* <button id="button" onClick={ showHideFunction1}> Visa bild 1</button> */}

      {/* <button id="button" onClick={ () => showHideFunction1(recipe._id)}> Visa bild</button> */}

        <div className="image-div">
        <button id="button" onClick={ () => showHideFunction1(recipe._id)}> Visa bild</button>

            <img id={recipe._id} className="image" src={recipe.imageUrl} alt="" />
        </div>
    </div>
  )
}

export default ImageComponent
