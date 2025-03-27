import axios from "axios"
import {useEffect, useState } from "react"
import {useForm, SubmitHandler} from "react-hook-form";
import { toast } from "react-toastify"

// price accepts string
//how to type the categories in formInput defaultValue=""Props

//Types

type categoryProps = {
    id: number;
    name: string
}

type formInputProps = {
    title: string;
    description: string;
    owner: string;
    price: number;
    location: string;
    image: string;
    category: categoryProps
}

export default function NewAdForm () {

//Getting the categories from the backend to add to the form
    const [categories, setCategories] = useState<categoryProps[]>([])
    
    async function  getCategories() {
        const results = await axios.get<categoryProps[]>("http://localhost:3000/categories")
        console.log(results)
        setCategories(results.data)
    }

    useEffect(() => {getCategories()}, [])

    const children = categories.map((category) => {
        return (
            <option value={category.id} key={category.id}>{category.name}</option>
        )
    })



// Handling the input defaultValue="" from the form

const { register, handleSubmit, formState: {errors}} = useForm<formInputProps>()

    const handleForm: SubmitHandler<formInputProps> = (data) =>  {
        axios.post("http://localhost:3000/ad", {...data})
          .then((response) => {
                toast.success("Success")
                console.log(response)
            })
            .catch(function (error) {
                toast.error("Something went wrong")
                console.log(error);
            });
    
    
    
    console.log(data)

    }

   

    


    return (
        <form onSubmit={handleSubmit(handleForm)}>
            {/* <input defaultValue="" type="text" defaultValue="yay" {...register("example", {required: true})} />
            {errors.example && <span>This field is required</span>} */}
            <label >
                Titre de l'annonce
                <input defaultValue="Une belle voiture" type="text" className="text-field" {...register("title", {required: true})}/>
                {errors.title && <span>This field is required</span>}
            </label>
            <br/>

            <label >
                Description du produit
                <input defaultValue="Nouvelle! C'est pas une arnaque, promis!!!" type="text"  className="text-field" {...register("description")}/>
            </label>
            <br/>

            <label >
                Prix
                <input defaultValue="100" type="number"  className="text-field" {...register("price", {required: true, min: 1, max: 100})}/>
                {errors.price && <span>This field is required, the price must be between 1 and 100</span>}
            </label>
            <br/>

            <label >
                Vendeur
                <input defaultValue="John PasLouch's" type="text"  className="text-field" {...register("owner")}/>
            </label>
            <br/>

            <label >
                Adresse
                <input defaultValue="Marseille" type="text"  className="text-field" {...register("location", {required: true})}/>
                
            </label>
            <br/>

            <label >
                Une image pour illustrer
                <input defaultValue="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=pexels-pixabay-210019.jpg&fm=jpg" type="text"  className="text-field" {...register("image")}/>
            </label>
            <br/>

            <label>
                La catégorie
                <select {...register("category", {required: true})}>
                    {children}
                </select>
            </label>
            <button className="button">Envoyer</button>
        </form>
    )
};