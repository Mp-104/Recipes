import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { RecipeInterface, IngredientInterface } from './types'
import RecipeComponent from './components/RecipeComponent'
import IngredientComponent from './components/IngredientComponent'
import Header from './pages/Header'
import AddDynamicInputFields from './components/AddInput'
import Form from './components/Form'


/* interface Recipe {

  title: string
  description: string

} */



function App() {
  //const [count, setCount] = useState(0)

  const [recipes, setRecipes] = useState<RecipeInterface[]>([]);
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setDescription] = useState("");
  const [timeInMins, setTimeInMinutes] = useState(Number);
  const [imageURL, setImageURL] = useState("");
  const [rating, setRating] = useState("");
  
  /* const [ingredient, setIngredient] = useState<IngredientInterface[]>([{ name: "", amount: 0, unit:"" }]); */
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState(Number);
  const [ingredientUnit, setIngredientUnit] = useState("");

  const [instructions, setInstructions] = useState("");
  const [categories, setCategories] = useState("");
 
 
  const [user, setUser] = useState("");

  const URL = "https://sti-java-grupp5-wjfjet.reky.se/recipes"

  // GET
  const fetchRecipes = async () => {
    const response = await axios.get<RecipeInterface[]>(`${URL}`);  //Include <RecipeInterface[]> ?
    if(response.status === 200) {
      setRecipes(response.data)
    }

  };

  // Funktion till att addera ingridiener till vårt objekt 'ingridients'
  const addIngredient1 = () => {

    setRecipes((prevData) => ({
      ...prevData, ingredients: [
        ...prevData.ingredients,
        { name: "", amount: 0, unit: "" },
      ],
    }));
  };


  // add Ingredient to addRecipe
  const addIngredient = () => {

    const newIngredient = {

      name: ingredientName,
      amount: ingredientAmount,
      unit: ingredientUnit
    };

    setIngredient([...ingredient, newIngredient]);
    setIngredientName("");
    setIngredientAmount(0);
    setIngredientUnit("");

  };


  // POST 
  const addRecipe = async () => {
    const originalRecipe = [...recipes]
    const newRecipe = { title: "testTitle", description: "tasty"}

    const categoryArray = categories.split(',').map((category) => category.trim());
    const instructionsArray = instructions.split(",").map((instructions) => instructions.trim());


    const response = await axios.post(`${URL}`, {
      title: recipeName,
      description: recipeDescription,
      ratings: [rating],
      imageUrl: imageURL,
      timeInMins: timeInMins,
      categories: categoryArray,
      instructions: instructionsArray,
      ingredients: ingredient
      

    })

    if (response.status === 200) {
      setRecipes([...recipes, response.data]);
      alert("Recept tillagt!")

      setRecipeName("");
      setIngredientName("");
      setIngredientAmount(0);
      setIngredient([]);
      setDescription("");
      setTimeInMinutes(0);
      setImageURL("");
      setRating("");
      setCategories("");
      setInstructions("");
    } else {
      alert("Error")
    }
    

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
      //fetchRecipes();
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

  function handleSubmit(formData: FormData) {
    console.log(formData);
  };






  const [counter, setCounter] =useState(0);
  const [inputValues, setInputValues] = useState<any>({});


  const handleClick = () => {

    setCounter(counter +1);
    console.log(counter);

  };

  const handleOnChange = (event:any) => {
    const abc:any = {};
    abc[event.target.className] = event.target.value;
    setInputValues({...inputValues, ...abc})

  };

  const handleOnChange2 = (event:any) => {

    setIngredientName(event.target.value)

    /* const abc:any = {};
    abc[event.target.className] = event.target.value;
    setInputValues({...inputValues, ...abc}) */

  };

  const [ingredient, setIngredient] = useState<IngredientInterface[]>([{ name: "", amount: 0, unit:"" }]);

  console.log(ingredient);

  const handleIngredientAdd = () => {

    setIngredient([...ingredient, { name: "", amount: 0, unit: ""}])

  }

  const handleIngredientRemove = (index:number) => {
    const list = [...ingredient];
    list.splice(index, 1);
    setIngredient(list);
  }

  const handleIngredientChange = (e:any, index:any) => {
    const {name, value} = e.target
    const list = [...ingredient];
    list[index][name] = value;
    setIngredient(list);
  }
  

  return (
    

    <div className='local'>

      {ingredient.map((singleIngredient, index) => (
        <div key={index}>
          <input value={singleIngredient.name} onChange={(e) => handleIngredientChange(e, index)} name='name' type="text" placeholder='Ingredient'/> 
          <input value={singleIngredient.amount} onChange={(e) => handleIngredientChange(e, index)} name='amount' type="number" placeholder='Unit'/> 

          <input value={singleIngredient.unit} onChange={(e) => handleIngredientChange(e, index)} name='unit' type="text" placeholder='Unit'/> 
          {ingredient.length > 1 && (<button type='button' onClick={() => handleIngredientRemove(index)}>Remove</button>)}
          
          <br />
          {ingredient.length - 1 === index && (<div> <br /><button type='button' onClick={handleIngredientAdd} >Add Ingredient?</button></div>) }
          
        </div>
      ))}


      {Object.keys(inputValues).map((c) => {
        return <p>{inputValues[c]}</p>;
      })}
      
      {Array.from(Array(counter)).map((c, index) => {
        return <form>
                <input onChange={handleOnChange} key={c} className={index} type="text" placeholder='lägg till ingredient'/> 
                <input onChange={handleOnChange} key={c} className={index} type="text" placeholder='lägg till unit'/> 
                <input onChange={handleOnChange} key={c} className={index} type="text" placeholder='lägg till amount'/> 
                  {/* <input type='text' value={ingredientName} onChange={(event) => setIngredientName(event.target.value)} placeholder='Ingredient'></input>
                  <input type="number" value={ingredientAmount} onChange={(event) => setIngredientAmount(event.target.valueAsNumber)} placeholder='Amount'/>
                  <input type="text" value={ingredientUnit} onChange={(event) => setIngredientUnit(event.target.value)} placeholder='Unit' /> */}

              </form>
      })}
      <br />
      <button onClick={handleClick}>Add input field</button>





      {/* <Form onSubmit={handleSubmit}></Form> */}
      <Header/>
      <h1>Local State</h1>
      
      <div> 
        <input type='text' value={recipeName} onChange={(event) => setRecipeName(event.target.value)} placeholder='Namnet på receptet'></input>
        <input type="text" value={recipeDescription} onChange={(event) => setDescription(event.target.value)} placeholder='Description' />
        <input type="number" value={timeInMins} onChange={(event) => setTimeInMinutes(event.target.valueAsNumber)} placeholder='Tid i minuter'/>
        <br />
        <input type="text" value={imageURL} onChange={(event) => setImageURL(event.target.value)} placeholder='Länk till bild'/>

        
        <input type='number' onChange={(event) => setRating(event.target.value)} min={1} max={5} placeholder='Rating'/>

        <br /><br />
        
        <textarea rows={4} cols={30} onChange={(event) => setInstructions(event.target.value)} placeholder='Instruktioner' ></textarea>
        <br />

        <input type="text" onChange={(event) => setCategories(event.target.value)} placeholder='Kategorier'/>


        <br /><br />
        <input type='text' value={ingredientName} onChange={(event) => setIngredientName(event.target.value)} placeholder='Ingredient'></input>
        <input type="number" value={ingredientAmount} onChange={(event) => setIngredientAmount(event.target.valueAsNumber)} placeholder='Amount'/>
        <input type="text" value={ingredientUnit} onChange={(event) => setIngredientUnit(event.target.value)} placeholder='Unit' />



        {Array.from(Array(counter)).map((c, index) => {
        return <span key={c} className={index}>
                {/* <input onChange={handleOnChange} key={c} className={index} type="text" placeholder='lägg till ingredient'/> 
                <input onChange={handleOnChange} key={c} className={index} type="text" placeholder='lägg till unit'/> 
                <input onChange={handleOnChange} key={c} className={index} type="text" placeholder='lägg till amount'/>  */}
                  <input key={c} className={index} type='text' value={ingredientName} onChange={handleOnChange2} placeholder='Ingredient'></input>
                  

              </span>
      })}
      <br />
      <button onClick={handleClick}>Add ingredient input field</button>




        <button onClick={addIngredient}>Lägg till ingredient</button>
        <br /><br />
        <button onClick={addRecipe}>Lägg till recept</button>
        <button onClick={deleteAll}>Radera alla recept</button>
        <br /> <br />
        <button onClick={fetchRecipes}>Visa alla recept</button>
      </div>

      <br></br>
      

      
      <ul>
        {
        recipes.map((recipe) => 
        <RecipeComponent key={recipe._id} recipe={recipe} handleDelete={onDelete} showHideFunction={showHideFunction} />)
        }
      </ul>

       
    

    </div>
  )
}

export default App
