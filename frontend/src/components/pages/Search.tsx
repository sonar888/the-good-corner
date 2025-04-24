import { useParams, } from "react-router"
import AdCard from "../AdCard"
import { useState, useEffect } from "react"
import axios from "axios"

import { AdCardProps } from "../AdCard"


export default function SearchPage() {



    const {keyword} = useParams()
    console.log(keyword)
    
    const [ads, setAds] = useState<AdCardProps[]>([])
    async function  fetchData (){
    const results = await axios.get<AdCardProps[]>(`http://localhost:3000/ads/search/${keyword}`)
    setAds(results.data)
    console.log(ads)
  }

 useEffect(()=>{
  fetchData()
 }, [keyword])

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
            {ads.length > 0? children : <p>Il n'y a pas d'annonces qui corespondent à votre recherche</p>}   
          </section>
      </>
    )
}