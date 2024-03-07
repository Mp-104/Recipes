import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { Recipe, IngredientInterface } from './types'
import RecipeComponent from './components/RecipeComponent'
import IngredientComponent from './components/IngredientComponent'

/* interface Recipe {

  title: string
  description: string

} */



function App() {
  //const [count, setCount] = useState(0)

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [addRecipeName, setRecipeName] = useState("");
  const [addIngredientName, setIngredientName] = useState("");

  const URL = "https://sti-java-grupp5-wjfjet.reky.se/recipes"

  // GET
  const fetchRecipe = async () => {
    const response = await axios.get(`${URL}`);
    if(response.status === 200) {
      setRecipes(response.data)
    }

  }
  


  // POST 
  const addRecipe = async () => {
    const originalRecipe = [...recipes]
    const newRecipe = { title: "testTitle", description: "tasty"}

    const response = await axios.post(`${URL}`, {
      title: addRecipeName,
      description: "testDescription",
      imageUrl: "https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/imagevaultfiles/id_223427/cf_259/korvstroganoff_med_ris.jpg",
      ingredients: [
    {
      name: addIngredientName,
      amount: 1,
      unit: "tsk"
    },
    {
      name: "Peppar",
      amount: 1,
      unit: "tsk"
    },
    {
      name: "Smör",
      amount: 100,
      unit: "gram"
    }
  ]
      

    })

    if (response.status === 201) {
      
    }
    setRecipes([...recipes, response.data])

    /* setRecipes([...recipes, newRecipe]);

    axios.post(`${URL}`, newRecipe)
    .then(({data: savedRecipe}) => setRecipes([savedRecipe, ...recipes]))
    .catch(error => {
      console.log(error);
      setRecipes(originalRecipe);
    }) */
  }

  // Delete

  const onDelete = async (recipeId: string) => {

    const response = await axios.delete(`${URL}/${recipeId}`);

    if (response.status === 204) {
      const newRecipe = recipes.filter((recipeKopiaFilter) => recipeKopiaFilter._id !== recipeId)
      setRecipes(newRecipe);
    }


  };


  useEffect(() => {
    /* axios.get<Recipe[]>(`${URL}`)
      .then(response => setRecipes(response.data)); */
      fetchRecipe();
  }, []);

  //fetchRecipe();

  function showHideFunction () {


    let x = document.getElementById("image");



    if (x?.style.display === "none") {
        x.style.display = "block"
    } else {
      x!.style.display = "none"
    }

  };


  return (
    <div className='local'>
      <h1>Local State</h1>
      
      <div> 
        <input type='text' value={addRecipeName} onChange={(event) => setRecipeName(event.target.value)} placeholder='Namnet på recepted'></input>
        <input type='text' value={addIngredientName} onChange={(event) => setIngredientName(event.target.value)} placeholder='Namnet på ingredienten'></input>

        <button onClick={addRecipe}>Lägg till recept</button>
      </div>

      <br></br>
      

      
      <ul>
        {
        recipes.map((recipe) => <RecipeComponent key={recipe._id} recipe={recipe} handleDelete={onDelete} showHideFunction={showHideFunction} />)
        }
      </ul>

    

    </div>
  )
}

export default App
