import axios from "axios"
import AdCard, { AdCardProps } from "./AdCard"
import { useEffect, useState } from "react"

import { useSearchParams } from "react-router";





export default function AdsInCategory () {
    const [ads, setAds] = useState<AdCardProps[]>([])
    const [searchParams] = useSearchParams();

    let name = searchParams.get("name")
    let url = `http://localhost:3000/ads/category/${name}`
    async function  fetchData (){
        const results = await axios.get<AdCardProps[]>(url)
        setAds(results.data)
        console.log(ads)
  }

 useEffect(()=>{
  fetchData()
 }, [name])

 

  const children = ads.map(ad => {
    return (
      <div key={ad.id}>
        <AdCard 
          image= {ad.image}
          link= {`http://localhost:5173/ad/${ad.id}`}
          title= {ad.title}
          price = {ad.price}/>
      </div>
      
    )
  })

    return (
        <> 
          <h2>Annonces récentes</h2>
          <section className="recent-ads">
            {ads.length > 0 ? children : <p>Il n'y a pas d'annonces dans cette catégorie pour l'instant</p>}   
          </section>
      </>
    )

}