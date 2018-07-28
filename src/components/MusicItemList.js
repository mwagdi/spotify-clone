import React from 'react';
import MusicItem from './MusicItem';

const MusicItemList = ({items}) => (
    <div className="musiclist">
        {items.map((item,i) => (<MusicItem item={item} key={i} />))}
    </div>
);

export default MusicItemList;
