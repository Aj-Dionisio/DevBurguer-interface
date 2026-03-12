import { api } from '../../services/Api';

export function CategoriesCarousel(){

  const [categories, setCategories] = useState([]);

useEffect(()=>{
 async function loadCategories (){
    const response = await api.get('/categories')
console.log(response)

}

loadCategories();


},[]},