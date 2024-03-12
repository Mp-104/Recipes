import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { Recipe, IngredientInterface } from './types'
import RecipeComponent from './components/RecipeComponent'
import IngredientComponent from './components/IngredientComponent'
import Header from './pages/Header'


/* interface Recipe {

  title: string
  description: string

} */



function App() {
  //const [count, setCount] = useState(0)

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [addRecipeName, setRecipeName] = useState("");
  
  const [ingredient, setIngredient] = useState<IngredientInterface[]>([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState(Number);
  const [ingredientUnit, setIngredientUnit] = useState("");
 
  const [user, setUser] = useState("");

  const URL = "https://sti-java-grupp5-wjfjet.reky.se/recipes"

  // GET
  const fetchRecipe = async () => {
    const response = await axios.get(`${URL}`);
    if(response.status === 200) {
      setRecipes(response.data)
    }

  };



  const addIngredient = () => {

    const newIngredient = {

      name: ingredientName,
      amount: ingredientAmount,
      unit: ingredientUnit
    };

    setIngredient([...ingredient, newIngredient]);
    setIngredientName("");
    setIngredientAmount(0);

  };


  // POST 
  const addRecipe = async () => {
    const originalRecipe = [...recipes]
    const newRecipe = { title: "testTitle", description: "tasty"}


    

    const response = await axios.post(`${URL}`, {
      title: addRecipeName,
      description: "testDescription",
      imageUrl: "https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/imagevaultfiles/id_223427/cf_259/korvstroganoff_med_ris.jpg",
      ingredients: ingredient
      

    })

    if (response.status === 201) {
      
    }
    setRecipes([...recipes, response.data])
    setRecipeName("");
    setIngredientName("");
    setIngredientAmount(0);
    setIngredient([]);

    /* setRecipes([...recipes, newRecipe]);

    axios.post(`${URL}`, newRecipe)
    .then(({data: savedRecipe}) => setRecipes([savedRecipe, ...recipes]))
    .catch(error => {
      console.log(error);
      setRecipes(originalRecipe);
    }) */
  };

  // Delete

  const onDelete = async (recipeId: string) => {

    const response = await axios.delete(`${URL}/${recipeId}`);

    if (response.status === 204) {
      const newRecipe = recipes.filter((recipeKopiaFilter) => recipeKopiaFilter._id !== recipeId)
      setRecipes(newRecipe);
    }


  };

  const deleteAll = async ()=> {

    const response = await axios.get("https://sti-java-grupp5-wjfjet.reky.se/clear")

    if (response.status === 200 ) {

      alert("all clear")
      setRecipes([])
    }

  }


  useEffect(() => {
    /* axios.get<Recipe[]>(`${URL}`)
      .then(response => setRecipes(response.data)); */
      //fetchRecipe();
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
      <Header/>
      <h1>Local State</h1>
      
      <div> 
        <input type='text' value={addRecipeName} onChange={(event) => setRecipeName(event.target.value)} placeholder='Namnet på receptet'></input>
        <br /><br />
        <input type='text' value={ingredientName} onChange={(event) => setIngredientName(event.target.value)} placeholder='Ingredient'></input>
        <input type="number" value={ingredientAmount} onChange={(event) => setIngredientAmount(event.target.valueAsNumber)} placeholder='Amount'/>
        <input type="text" value={ingredientUnit} onChange={(event) => setIngredientUnit(event.target.value)} placeholder='Unit' />


        <button onClick={addIngredient}>Lägg till ingredient</button>
        <br /><br />
        <button onClick={addRecipe}>Lägg till recept</button>
        <button onClick={deleteAll}>Radera all recept</button>
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
