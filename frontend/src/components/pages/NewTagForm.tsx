import axios from "axios"
import {useForm, SubmitHandler} from "react-hook-form";
import { toast } from "react-toastify";



type formInputProps = {
    name: string;  
}
export default function NewTagForm() {

    const { register, handleSubmit, formState: {errors}} = useForm<formInputProps>()

    const handleForm:SubmitHandler<formInputProps> = (data) => {
        axios.post("http://localhost:3000/tag", {...data})
          .then((response) => {
                toast.success("Success")
                console.log(response)
            })
            .catch(function (error) {
                toast.error("Something went wrong")
                console.log(error);
            });

    }
    
    return (

        <form onSubmit={handleSubmit(handleForm)}>
            <label >
                Nom du nouveau tag
                <input defaultValue="" type="text" className="text-field" {...register("name", {required: true})}/>
                {errors.name && <span>This field is required</span>}
            </label>
            <br/>
            <button className="button">Créer</button>
        </form>
        
    )
}