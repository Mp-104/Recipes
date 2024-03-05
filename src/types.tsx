export interface Recipe0 {

    title: string
    description: string
    
    _id: string
  
  }

  export interface Recipe {
    _id: string
    title: string
    description: string
    ratings?: [number]
    imageUrl: string
    timeInMins: number
    categories: [string]
    instructions: [string]
    password?: string
    ingredients: [IngredientInterface: {
        name: string
        amount: number
        unit: string
        }]
    }

export interface IngredientInterface {
    name: string
    amount:	number
    unit: string
    }