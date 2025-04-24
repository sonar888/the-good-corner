import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import {toast} from "react-toastify"
import axios from "axios"


type AdDetailsProps = {
    title: string;
    description: string;
    owner: string;
    price: number;
    image: string;
    location: string;
    createdAt: Date;
    category: {
        id: number;
        name: string
    };
    tags: [{
        id: number;
        name: string
    }]

}


export default function AdDetails () {
    const {id} = useParams()
    const navigate = useNavigate()

    const [ad, setAd] = useState<AdDetailsProps>()
    

    async function getAd() {
        const result = await axios.get<AdDetailsProps>(`http://localhost:3000/ad/${id}`)
        console.log(result.data)
        setAd(result.data)
        console.log(ad)
    }

    useEffect(()=> {
        getAd()
    }, [id])

    async function deleteAd() {
        try {
            await axios.delete(`http://localhost:3000/ad/${id}`) 
            toast.success("Ad was deleted")
            navigate('/')
            
        } catch(error) {
            console.log(error)
            toast.error("An error occurred")
        }

    }

    function updateAd() {
        navigate(`/ad/update/${id}`)
    }
    
    if(ad === undefined) {
        console.log("loading")
        return <p>No ad found with this id</p>
    }

    return (
        
        <>
            <h2 className="ad-details-title">{ad.title}</h2>
                <section className="ad-details">
                    <div className="ad-details-image-container">
                    <img className="ad-details-image" src={ad.image} />
                    </div>
                    <div className="ad-details-info">
                    <div className="ad-details-price">{ad.price} €</div>
                    <div className="ad-details-description">
                        {ad.description}
                    </div>
                    <hr className="separator" />
                    <div className="ad-details-owner">
                        Annoncée publiée par <b>{ad.owner}</b> {new Date(ad.createdAt).toLocaleDateString()} dans la catégorie {ad.category.name}.
                    </div>
                    <a
                        href="mailto:serge@serge.com"
                        className="button button-primary link-button"
                        ><svg
                        aria-hidden="true"
                        width="16"
                        height="16"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
                        // style="stroke: currentcolor; stroke-width: 2.5; fill: none"
                        >
                        <path
                            d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"
                        ></path>
                        </svg>
                        Envoyer un email</a>

                        <button className="button" onClick={()=>deleteAd()}>Supprimer l'annonce</button>
                        <button className="button" onClick={()=>updateAd()}>Modifier l'annonce</button>
                    </div>
                </section>
        </>
    )
}