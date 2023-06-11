import React, { memo, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import moment from 'moment';
import './LatestTxnsList.css';
import { Utils } from 'alchemy-sdk';
import { Link } from 'react-router-dom';

const LatestTxnsList = ({alchemy}) => {
    const [txnList,setTxnList] = useState([]);
    const [timestamp,setTimestamp] = useState(0);

    useEffect(()=>{
        async function getTxnsFromBlock(){
            const latestBlockNumber = await alchemy.core.getBlockNumber();
            const latestBlock = await alchemy.core.getBlockWithTransactions(latestBlockNumber);
            
            if(latestBlock?.transactions?.length > 0) {
                setTxnList(latestBlock.transactions.slice(0,5));
                setTimestamp(latestBlock?.timestamp);
            }
        }
        getTxnsFromBlock();
    },[])
    
    return (
        <div id="latest_txns_list" className='w-50'>
            <Card
                className="my-2 latest-section-bg shadow"
            >
                <CardHeader tag="h5" className='latest-section-bg'>Latest Transactions</CardHeader>
                <CardBody className='pt-0'>
                    {txnList?.length === 0 ?
                        <img src='loading_icon.gif' width={200} height={150}  className="loading-icon"/>
                        : txnList.map(txn=>{
                            return <div key={txn.hash} className="d-flex py-2 border-bottom gap-4">
                                <div className='d-flex flex-column txn-hash-time-wrapper'>
                                    <span className='d-inline-block text-truncate w-100'><Link to={`/txn/${txn?.hash}`}>{txn?.hash}</Link></span>
                                    <span className='fw-light'>{timestamp ? moment(timestamp * 1000).fromNow() : ""}</span>
                                </div>
                                <div className='d-flex flex-column txn-frm-to-hash-wrapper'>
                                    <span className='d-inline-block text-truncate w-100'>From {txn?.from}</span>
                                    <span className='d-inline-block text-truncate w-100'>To {txn?.to}</span>
                                </div>
                                <div className=''>
                                    {txn?.value?._hex ? `${Utils.formatEther(txn.value._hex)} ETH`: ""}
                                </div>
                            </div>
                        })    
                    }
                </CardBody>
            </Card>
        </div>
    );
};

export default memo(LatestTxnsList);