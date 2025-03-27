import { Link } from "react-router";

export type AdCardProps = {
    id? : number;
    title : string;
    image : string;
    price : number ;
    link: string
}

export default function AdCard({title, image, price, link}: AdCardProps) {
    return (
        <div className="ad-card-container">
            <Link className="ad-card-link" to={link}>
                <img className="ad-card-image" src={image} alt={title}/>
                <div className="ad-card-text">
                    <div className="ad-card-title">{title}</div>
                    <div className="ad-card-price">{price} €</div>
                </div>
            </Link>
            
        </div>

    )
    
}