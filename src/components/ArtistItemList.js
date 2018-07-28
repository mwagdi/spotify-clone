import React from 'react';
import ArtistItem from './ArtistItem';

const ArtistItemList = ({artists}) => (
    <div className="artistlist">
        {artists.map((artist, i) => (<ArtistItem artist={artist} key={i} />))}
    </div>
);

export default ArtistItemList;