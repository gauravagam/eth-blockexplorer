import React, { memo, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap'
import moment from 'moment';
import './LatestBlockList.css';
import { Link } from 'react-router-dom';

const LatestBlockList = ({alchemy}) => {
    const [blockList,setBlockList] = useState([]);

    useEffect(()=>{
        async function getLatestBlocks() {
            const latestBlockNumber = await alchemy.core.getBlockNumber();
            // eslint-disable-next-line react-hooks/exhaustive-deps
            const blockListArr = [];
            for(let i=0;i<5;i++){
                blockListArr.push(await alchemy.core.getBlock(latestBlockNumber-i));
            }
            setBlockList(blockListArr);
        }
        getLatestBlocks();
    },[])

    return (
        <div id="latest_block_list" className='w-50'>
                <Card
                    className="my-2 latest-section-bg shadow"
                >
                    <CardHeader tag="h5" className='latest-section-bg'>Latest Blocks</CardHeader>
                    <CardBody className='pt-0'>
                    {blockList?.length === 0 ?
                        <img src='loading_icon.gif' width={200} height={150}  className="loading-icon"/>
                        : <>
                        {blockList.map((block => {
                            return <div key={block.number} className="d-flex py-2 border-bottom">
                                <div className='d-flex flex-column block-number-div'>
                                    <span><Link to={`/block/${block?.number}`}> {block?.number}</Link></span>
                                    <span className='fw-light'>{moment(block?.timestamp * 1000).fromNow()}</span>
                                </div>
                                <div className='receipint-div'>
                                    <span className='text-truncate w-100'>Fee Recipient {block?.miner}</span>
                                    <span className='fw-bold'>{block?.transactions?.length} txns</span>
                                </div>
                            </div>
                        }))}
                        <div className='text-center pt-2'><Link to="/blocks"> View All Blocks</Link></div>
                        </>
                        }
                    </CardBody>
                </Card>
        </div>
    );
};

export default memo(LatestBlockList);