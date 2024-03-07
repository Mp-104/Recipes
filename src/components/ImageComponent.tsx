import React from 'react'
import axios from "axios";
import { Recipe, IngredientInterface } from "../types";
import IngredientComponent from "./IngredientComponent";
import DeleteRecipeComponent from "./DeleteRecipeComponent";


interface ImageComponentProps {
    recipe: Recipe,
    
    showHideFunction: () => void
};



const ImageComponent = ( {recipe}: ImageComponentProps) => {

    async function showHideFunction1 () {

    
        const x = document.getElementById(recipe._id);
        const y = document.getElementById("button")
    
            if (x?.style.display === "block") {
                x.style.display = "none"
            } else {
               x!.style.display = "block"
            }

        
    
      };

  return (

    <div>
      
        <div className="image-div">
        <button id="button" onClick={ () => showHideFunction1()}> Visa bild</button>

            <img id={recipe._id} className="image" src={recipe.imageUrl} alt="" />
        </div>
    </div>
  )
}

export default ImageComponent
