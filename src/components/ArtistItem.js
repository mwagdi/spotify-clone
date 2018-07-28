import React from 'react';
import { Link } from "react-router-dom";

const ArtistItem = ({artist}) => (
    <Link to={`/artists/${artist.id}`} className="artistlist__item">
        {artist.images[0] && 
            <div className="artistlist__item_image" style={{ backgroundImage: `url(${artist.images[0].url})` }}></div>}
        {!artist.images[0] && 
            <div className="artistlist__item_image">
                <p>No Photo</p>    
            </div>}
        <h3>{artist.name}</h3>
    </Link>
);

export default ArtistItem;