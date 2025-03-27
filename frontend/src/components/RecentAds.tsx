import axios from "axios"
import AdCard, { AdCardProps } from "./AdCard"
import { useEffect, useState } from "react"


export default function RecentAds () {

  const [ads, setAds] = useState<AdCardProps[]>([])
  async function  fetchData (){
    const results = await axios.get<AdCardProps[]>('http://localhost:3000/ads')
    setAds(results.data)
    console.log(ads)
  }

 useEffect(()=>{
  fetchData()
 }, [])

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
            {children}   
          </section>
      </>
    )
}