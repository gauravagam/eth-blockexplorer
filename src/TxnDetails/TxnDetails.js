import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Row from '../Row/Row';
import moment from 'moment';
import { Utils } from 'alchemy-sdk';

const TxnDetails = ({alchemy}) => {
    const { txnHash } = useParams();
    const [txnDetails,setTxnDetails] = useState({});
    const [txnReceipt,setTxnReceipt] = useState({});

    useEffect(()=>{
        async function getTxnDetails(){
            const txnObj = await alchemy.transact.getTransaction(txnHash);
            const txnReceipt = await alchemy.core.getTransactionReceipt(txnHash);
            setTxnDetails(txnObj);
            setTxnReceipt(txnReceipt);
        }
        getTxnDetails();
    },[])
    
    return (
        <div className='px-3'>
            <h4>Transaction Details</h4>
            <div className='latest-section-bg p-3'>
                {txnDetails?.hash ? 
                <>
                <Row title="Txn Hash" value={txnDetails?.hash}></Row>
                <Row title="Status" value={txnReceipt?.status === 1 ? "Success" : "Failed"}></Row>
                <Row title="Block" value={txnDetails?.blockNumber}/>
                <Row title="Confirmations" value={txnReceipt?.confirmations}/>
                {txnDetails?.timestamp ? 
                    <Row title="Timestamp" value={`${moment(txnDetails?.timestamp*1000).fromNow()} (${moment(txnDetails?.timestamp*1000).utc().format("MMM-DD-YYYY LTS").toString()} +UTC)`}/> 
                    : null}
                <Row title="From" value={txnDetails?.from}/>
                <Row title="To" value={txnDetails?.to}/>
                <Row title="Value" value={`${txnDetails?.value ? Utils.formatEther(txnDetails?.value) : 0} ETH`}/>
                <Row title="Transaction Fee" value={`${txnDetails?.gasPrice && txnReceipt?.gasUsed ? Utils.formatEther(Number(txnDetails?.gasPrice)*Number(txnReceipt?.gasUsed)) : 0} ETH`} />
                <Row title="Gas Price" value={`${txnDetails?.gasPrice ? Utils.formatEther(txnDetails?.gasPrice) : 0} ETH`}/>
                </>: <img src='../loading_icon.gif' width={200} height={150} className="loading-icon" alt='loading'/>}
            </div>
        </div>
    )
}

export default memo(TxnDetails)