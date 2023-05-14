import React, { memo } from 'react';
import LatestBlockList from '../LatestBlockList/LatestBlockList';

const HomePage = memo(({alchemy}) => {
    return (
        <div className='px-3'>
            <LatestBlockList alchemy={alchemy}/>
        </div>
    );
});

export default HomePage;