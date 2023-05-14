import React, { memo, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap'
import moment from 'moment';
import './LatestBlockList.css';

const LatestBlockList = ({alchemy}) => {
    const [blockList,setBlockList] = useState([]);

    useEffect(()=>{
        async function getLatestBlocks() {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            const latestBlockNumber = await alchemy.core.getBlockNumber();
            const blockListArr = [];
            for(let i=1;i<=5;i++){
                console.log('i ',i)
                blockListArr.push(await alchemy.core.getBlock(latestBlockNumber-i));
            }
            setBlockList(blockListArr);
        }
        getLatestBlocks();
    },[])

    console.log('block ',blockList[0])
    return (
        <div id="latest_block_list">
            <Card
                className="my-2"
                color="light"
                outline
            >
                <CardHeader><h5>Latest Blocks</h5></CardHeader>
                <CardBody>
                    {blockList.map((block => {
                        return <div key={block.number} className="d-flex py-2 border-bottom">
                            <div className='d-flex flex-column block-number-div'>
                                <span>{block.number}</span>
                                <span>{moment(block.timestamp*1000).fromNow()}</span>
                            </div>
                            <div className='receipint-div'>
                                <span className='d-inline-block text-truncate w-100'>Fee Recipient {block.miner}</span>
                                <span>{block?.transactions?.length} txns</span>
                            </div>
                        </div>
                    }))}
                </CardBody>
            </Card>
            
        </div>
    );
};

export default memo(LatestBlockList);

// const LatestBlockDetail=memo(()=>{
//     return (
//         <div>

//         </div>
//     )
// })