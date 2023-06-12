import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { Utils } from 'alchemy-sdk';
import Row from '../Row/Row';

const BlockDetails = () => {
    const { blockNumber = 0 } = useParams();
    const [blockObj,setBlockObj] = useState({});

    useEffect(()=>{
        async function getBlockDetalis(){
            const response = await axios.post(process.env.REACT_APP_ALCHEMY_API_URL, {
                jsonrpc: "2.0",
                id: 1,
                method: "eth_getBlockByNumber",
                params: [
                    Utils.hexlify(Number(blockNumber)),
                    false
                ]
            })
            setBlockObj(response?.data?.result);
        }
        getBlockDetalis();
    },[])

    return (
        <div className='px-3'>
            <h4>Block #{blockNumber}</h4>
            <div className='latest-section-bg p-3'>
                {blockObj?.number ? 
                <>
                    <Row title="Block Number" value={blockObj?.number} dataType="hex"></Row>
                    <Row title="Timestamp" 
                        value={`${moment(blockObj?.timestamp*1000).fromNow()} (${moment(blockObj?.timestamp*1000).utc().format("MMM-DD-YYYY LTS").toString()} +UTC)`}></Row>
                    <Row title="Transactions" value={blockObj?.transactions?.length}/>
                    <Row title="Fee Recipient" value={blockObj?.miner}/>
                    <Row title="Size" value={`${Number(blockObj?.size || 0).toLocaleString()} bytes`}/>
                    <Row title="Gas Used" value={`${Number(blockObj?.gasUsed || 0).toLocaleString()}(${(Number(blockObj?.gasUsed)/Number(blockObj?.gasLimit)*100).toFixed(2)}%)`}/>
                    <Row title="Gas Limit" value={Number(blockObj?.gasLimit || 0).toLocaleString()}/>
                    <Row title="Base Fee Per Gas" value={`${blockObj?.baseFeePerGas ? Utils.formatEther(blockObj?.baseFeePerGas) : 0} ETH`}/>
                    <Row title="Hash" value={blockObj?.hash}/>
                    <Row title="Parent Hash" value={blockObj?.parentHash}/>
                    <Row title="State Root" value={blockObj?.stateRoot}/>
                    <Row title="Withdrawls Root" value={blockObj?.withdrawalsRoot}/>
                    <Row title="Nonce" value={blockObj?.nonce}/>
                </> : <img src='../loading_icon.gif' width={200} height={150} className="loading-icon" alt='loading'/>}
            </div>
        </div>
    )
}

export default memo(BlockDetails)