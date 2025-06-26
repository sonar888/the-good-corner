import { useNavigate, useParams } from "react-router"
import {toast} from "react-toastify"
import { useGetOneAdQuery, useDeleteAdMutation, useGetAllAdsQuery } from "../../generated/graphql-types"
import { GET_ALL_ADS } from "../../graphql/operations"




export default function AdDetails () {
    const {id} = useParams()
    const navigate = useNavigate()
    const {data, error, loading} = useGetOneAdQuery({
        variables: { adId: Number(id) },
      })
    const [deleteAd] = useDeleteAdMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GET_ALL_ADS,
      },
    ],
  })

    

    function updateAd() {
        navigate(`/ad/update/${id}`)
    }
    
   if (loading) {
    return <p>Loading Get One Ad...</p>
   }

   if(error) {
    return <p>We didn't start the fire...</p>
   }

    return (  
        <>
            <h2 className="ad-details-title">{data?.getOneAd.title}</h2>
                <section className="ad-details">
                    <div className="ad-details-image-container">
                    <img className="ad-details-image" src={data?.getOneAd.image} />
                    </div>
                    <div className="ad-details-info">
                    <div className="ad-details-price">{data?.getOneAd.price} €</div>
                    <div className="ad-details-description">
                        {data?.getOneAd.description}
                    </div>
                    {data?.getOneAd.tags.map((tag)=> {
                        return (
                            <div>{tag.name}</div>
                        )
                    })}
                    <div>Catégorie: {data?.getOneAd.category.name}</div>
                    <hr className="separator" />
                    <div className="ad-details-owner">
                        Annoncée publiée par <b>{data?.getOneAd.owner}</b> {new Date(data?.getOneAd.createdDate).toLocaleDateString()} dans la catégorie {data?.getOneAd.category.name}.
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

                        <button className="button" onClick={
                            async () => {
                                try {
                                  await deleteAd({ variables: { deleteAdId: Number(id) } });
                                  navigate("/");
                                  toast.success("Ad has been deleted");
                                } catch (err) {
                                  console.log(err);
                                  toast.error("An error occurred");
                                }
                              }
                        }>Supprimer l'annonce</button>
                        <button className="button" onClick={()=>updateAd()}>Modifier l'annonce</button>
                    </div>
                </section>
        </>
    )
}