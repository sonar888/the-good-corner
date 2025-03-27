import { useParams } from "react-router"


export default function AdDetails () {
    const params = useParams()

    return (
        <p>These are the details of the ad {params.id}</p>
    )
}