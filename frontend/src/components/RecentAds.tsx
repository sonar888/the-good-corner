import AdCard from "./AdCard"
import { useGetAllAdsQuery } from "../generated/graphql-types"



export default function RecentAds () {

  const {data, error, loading} = useGetAllAdsQuery()

  if (loading) {
    return <p>Patience, ça charge</p>
  }

  if (error){
    return <p>Oops! Something went wrong...</p>
  }

    return (
        <> 
          <h2>Annonces récentes</h2>
          <h3>Nombre d'annonces récentes: {data?.getAllAds.length}</h3>
          <section className="recent-ads">
            {
              data?.getAllAds.map(ad => {
                return (
                  <div key={ad.id}>
                    <AdCard 
                      image= {ad.image}
                      link= {`ad/${ad.id}`} // remplace le chemin vs ajoute le chemin
                      title= {ad.title}
                      price = {ad.price}/>
                  </div>
                  
                )
              })
            }
               
          </section>
      </>
    )
}