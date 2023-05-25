import React, { memo, useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import moment from 'moment';
import { Utils } from 'alchemy-sdk';
const PER_PAGE_RECORDS = 10;

const AllBlocksPage = ({alchemy}) => {
    const [blockList,setBlockList] = useState([]);
    const [latestBlockNumber,setLatestBlockNumber] = useState(0);
    
    useEffect(()=>{
        async function getBlocks(){
            const latestBlockNumber = await alchemy.core.getBlockNumber();
            setLatestBlockNumber(latestBlockNumber);
            const tmpBlockList = [];
            for(let i=0;i<10;i++){
                tmpBlockList.push(await alchemy.core.getBlock(latestBlockNumber-i));
            }
            setBlockList(tmpBlockList);
        }
        getBlocks()
    },[]);

    return (
        <div className='px-3'>
            <h4>Blocks</h4>
            <div className='latest-section-bg'>
                <div className='fw-bold p-3'>
                    Total of {Number(latestBlockNumber).toLocaleString("en-us")} blocks
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>Block No.</th>
                            <th>Age</th>
                            <th>Txn</th>
                            <th>Fee Recipient</th>
                            <th>Gas Used</th>
                            <th>Gas Limit</th>
                            <th>Base Fee</th>
                        </tr>
                    </thead>
                        <tbody>
                        {blockList?.length > 0 ?
                            blockList.map((block) => {
                                return (
                                    <tr scope="row">
                                        <td>{block?.number || "0"}</td>
                                        <td>{block?.timestamp ? moment(block.timestamp * 1000).fromNow() : ""}</td>
                                        <td>{block?.transactions?.length}</td>
                                        <td>{block?.miner}</td>
                                        <td>{block?.gasUsed ? Number(block.gasUsed).toLocaleString("en-us") : ""} ({((block.gasUsed / block.gasLimit) * 100).toFixed(2)}%)</td>
                                        <td>{block?.gasLimit ? Number(block.gasLimit).toLocaleString("en-us") : ""}</td>
                                        <td>{Number(Utils.formatUnits(block?.baseFeePerGas?._hex, "gwei")).toFixed(2)} Gwei</td>
                                    </tr>
                                )
                            })
                            : <tr><td colSpan={8}><img src='loading_icon.gif' width={200} height={150} className="loading-icon" /></td></tr>}
                        </tbody> 
                </Table>
            </div>
        </div>
    );
};

export default memo(AllBlocksPage);