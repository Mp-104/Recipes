import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { Recipe } from './types'

/* interface Recipe {

  title: string
  description: string

} */



function App() {
  //const [count, setCount] = useState(0)

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const URL = "https://sti-java-grupp5-wjfjet.reky.se/recipes"

  // GET
  useEffect(() => {
    axios.get<Recipe[]>(`${URL}`)
      .then(response => setRecipes(response.data));
  }, [])


  // POST 
  const addRecipe = () => {
    const originalRecipe = [...recipes]
    const newRecipe = { title: "testTitle", description: "tasty"}
    setRecipes([...recipes, newRecipe]);

    axios.post(`${URL}`, newRecipe)
    .then(({data: savedRecipe}) => setRecipes([savedRecipe, ...recipes]))
    .catch(error => {
      console.log(error);
      setRecipes(originalRecipe);
    })
  }


  return (
    <>

      <button onClick={addRecipe}>Lägg till recept</button>

      <ul>
        {recipes.map(recipe => <li key={recipe.title}>{recipe.title}</li>)}
      </ul>

    </>
  )
}

export default App
