import React from 'react';
import { Link } from 'react-router-dom';

const MusicItem = ({item}) => (
    <Link to={`/${item.album_type==='album'? 'albums':'songs'}/${item.id}`} className="musiclist__item">
        <div className="musiclist__item_image" style={{backgroundImage:`url(${item.images[0].url})`}}>
            <div className="musiclist__item_content">
                <p className="musiclist__item_name">{item.name}</p>
                <p className="musiclist__item_artists">
                    {item.artists.map((artist,i)=>(<span key={i}>{i!==0? `, ${artist.name}`:artist.name}</span>))}
                </p>
            </div>
        </div>
    </Link>
);

export default MusicItem;
