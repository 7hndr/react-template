import pelmeni from './data.json'
import { Recipe } from '../../components'

export const RecipePage = () => {
	return <Recipe data={pelmeni} />
}
