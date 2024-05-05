import data from './data.json'
import { Recipe } from '../../modules'

export const RecipePage = () => {
	return <Recipe defaultRecipe={data} />
}
