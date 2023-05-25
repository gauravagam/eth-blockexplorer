import React, { memo } from 'react';
import LatestBlockList from '../LatestBlockList/LatestBlockList';
import LatestTxnsList from '../LatestTxnsList/LatestTxnsList';

const HomePage = ({alchemy}) => {
    
    return (
        <div className='px-3'>
            <div className='d-flex w-100 gap-5'>
                <LatestBlockList alchemy={alchemy}/>
                <LatestTxnsList  alchemy={alchemy}/>
            </div>
        </div>
    );
};

export default memo(HomePage);