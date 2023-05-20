import React, { memo, useEffect, useState } from 'react';
import LatestBlockList from '../LatestBlockList/LatestBlockList';
import LatestTxnsList from '../LatestTxnsList/LatestTxnsList';
import './HomePage.css';

const HomePage = ({alchemy}) => {
    const [latestBlockNumber,setLatestBlockNumber] = useState(null);
    useEffect(()=>{
        async function getLatestBlockNumber(){
            const latestBlockNumber = await alchemy.core.getBlockNumber();
            setLatestBlockNumber(latestBlockNumber);
        }
        getLatestBlockNumber()
    },[])
    return (
        <div className='px-3'>
            <div className='d-flex w-100 gap-5'>
                <LatestBlockList alchemy={alchemy} latestBlockNumber={latestBlockNumber}/>
                <LatestTxnsList  alchemy={alchemy} latestBlockNumber={latestBlockNumber}/>
            </div>
        </div>
    );
};

export default memo(HomePage);