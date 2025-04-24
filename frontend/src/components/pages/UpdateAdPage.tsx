import axios from "axios"
import {useEffect, useState } from "react"
import {useForm, SubmitHandler} from "react-hook-form";
import { toast } from "react-toastify"
import {useParams } from "react-router";
import { useNavigate } from "react-router";

//Types

type categoryProps = {
    id: number;
    name: string
}

type tagsProps = categoryProps

type formInputProps = {
    title: string;
    description: string;
    owner: string;
    price: number;
    location: string;
    image: string;
    category: categoryProps;
    tags: [string]
}

type AdProps = {
    title: string;
    description: string;
    owner: string;
    price: number;
    location: string;
    image: string;
    category: categoryProps;
    tags: [{
        id: number;
        name: string
    }]
}



export default function UpdateAdPage () {

//Getting the categories from the backend to add to the form
    const [categories, setCategories] = useState<categoryProps[]>([])
    const [tags, setTags] = useState<tagsProps[]>([])
    const navigate = useNavigate()
    
    async function  getCategories() {
        const results = await axios.get<categoryProps[]>("http://localhost:3000/categories")
        console.log(results)
        setCategories(results.data)
    }

    async function  getTags() {
        const results = await axios.get<tagsProps[]>("http://localhost:3000/tags")
        console.log(results)
        setTags(results.data)
    }


    const categoriesChildren = categories.map((category) => {
        return (
            <option value={category.id} key={category.id}>{category.name}</option>
        )
    })

    
//Getting ad from the backend
const [ad, setAd] = useState<AdProps>()
const { id } = useParams()


async function  getAd() {
    const results = await axios.get<AdProps>(`http://localhost:3000/ad/${id}`)
    console.log(results.data)
    setAd(results.data)
}

useEffect(() => {
    getCategories()
    getTags()
    getAd()

}, [id])

// Handling the input defaultValue={ad.}"" from the form

const { register, handleSubmit,  formState: {errors}} = useForm<formInputProps>()


    const handleForm: SubmitHandler<formInputProps> = (data) =>  {
        console.log(data)
        axios.put(`http://localhost:3000/ad/${id}`, data)
          .then((response) => {
                toast.success("Success")
                console.log(response)
                navigate(`/ad/${id}`)
            })
            .catch(function (error) {
                toast.error("Something went wrong")
                console.log(error);
            });
    
    
    
    console.log(data)

    }

   

    
if (ad === undefined) {
    return <p>Loading</p>
}

return (
    <form onSubmit={handleSubmit(handleForm)}>
        {/* <input defaultValue={ad.}"" type="text" defaultValue={ad.}"yay" {...register("example", {required: true})} />
        {errors.example && <span>This field is required</span>} */}
        <label >
            Titre de l'annonce
            <input defaultValue={ad.title} type="text" className="text-field" {...register("title", {required: true})}/>
            {errors.title && <span>This field is required</span>}
        </label>
        <br/>

        <label >
            Description du produit
            <input defaultValue={ad.description} type="text"  className="text-field" {...register("description")}/>
        </label>
        <br/>

        <label >
            Prix
            <input defaultValue={ad.price} type="number"  className="text-field" {...register("price", {required: true, min: 1, max: 100})}/>
            {errors.price && <span>This field is required, the price must be between 1 and 100</span>}
        </label>
        <br/>

        <label >
            Vendeur
            <input defaultValue={ad.owner} type="text"  className="text-field" {...register("owner")}/>
        </label>
        <br/>

        <label >
            Adresse
            <input defaultValue={ad.location} type="text"  className="text-field" {...register("location", {required: true})}/>
            
        </label>
        <br/>

        <label >
            Une image pour illustrer
            <input defaultValue={ad.image} type="text"  className="text-field" {...register("image")}/>
        </label>
        <br/>

        <label>
            La catégorie
            <select defaultValue={ad.category.id} {...register("category", {required: true})}>
                {categoriesChildren}
            </select>
        </label>

        <div>
            Sélectionne les tags: 
            {tags.map((tag)=>{
                return (
                    <div key={tag.id}>
                        <label >
                            {tag.name}
                            <input value={tag.id} type="checkbox" key={tag.id} {...register(`tags`)}
                            defaultChecked= {ad.tags.find((el)=> el.id === tag.id) !== undefined} // la comparaison renvoie true ou false, la fonction some fonctionne aussi
                            />
                        </label> 
                    </div>
                       
    )
})}
        </div>
        <button className="button">Envoyer</button>
    </form>
)

    
};