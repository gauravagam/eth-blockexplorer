import React, { memo, useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import moment from 'moment';
import { Utils } from 'alchemy-sdk';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import localInfo from 'rc-pagination/lib/locale/en_US';
import './AllBlocksPage.css';
import { Link } from 'react-router-dom';
const PER_PAGE_RECORDS = 10;

const AllBlocksPage = ({alchemy}) => {
    const [blockList,setBlockList] = useState([]);
    const [latestBlockNumber,setLatestBlockNumber] = useState(0);
    const [currentPage,setCurrentPage] = useState(1);
    
    useEffect(()=>{
        async function getBlocks(){
            const latestBlockNumber = await alchemy.core.getBlockNumber();
            setLatestBlockNumber(latestBlockNumber);
            const tmpBlockList = [];
            for(let i=0;i<PER_PAGE_RECORDS;i++){
                tmpBlockList.push(await alchemy.core.getBlock(latestBlockNumber-i));
            }
            setBlockList(tmpBlockList);
        }
        getBlocks()
    },[]);

    const handlePaginationClick=async(current)=>{
        setCurrentPage(current);
        setBlockList([])
        const skip = (current-1)*PER_PAGE_RECORDS;
        const newPageBlockNumber = current > currentPage ? latestBlockNumber-skip : latestBlockNumber + skip;
        const tmpBlockList = [];
        for(let i=0;i<PER_PAGE_RECORDS;i++){
            if((newPageBlockNumber-i)===0){
                break;
            }
            const newBlock = await alchemy.core.getBlock(newPageBlockNumber-i);
            tmpBlockList.push(newBlock);
        }
        setBlockList(tmpBlockList);
    }

    return (
        <div className='px-3'>
            <h4>Blocks</h4>
            <div className='latest-section-bg pb-3'>
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
                                console.log('block number ',block?.number,Utils.formatEther(block?.baseFeePerGas?._hex)*Utils.formatEther(block?.gasUsed?._hex))
                                return (
                                    <tr key={`block_row_${block?.number}`}>
                                        <td><Link to={`/block/${block?.number}`}>{block?.number || "0"}</Link></td>
                                        <td>{block?.timestamp ? moment(block.timestamp * 1000).fromNow() : ""}</td>
                                        <td>{block?.transactions?.length}</td>
                                        <td>{block?.miner}</td>
                                        <td>{block?.gasUsed ? Number(block.gasUsed).toLocaleString("en-us") : ""} ({((block.gasUsed / block.gasLimit) * 100).toFixed(2)}%)</td>
                                        <td>{block?.gasLimit ? Number(block.gasLimit).toLocaleString("en-us") : ""}</td>
                                        <td>{block?.baseFeePerGas ? Number(Utils.formatUnits(block?.baseFeePerGas?._hex, "gwei")).toFixed(2): 0 } Gwei</td>
                                    </tr>
                                )
                            })
                            : <tr><td colSpan={8}><img src='loading_icon.gif' width={200} height={150} className="loading-icon" alt='loading'/></td></tr>}
                        </tbody> 
                </Table>
                <div className='d-flex justify-content-center'>
                    <Pagination 
                        total={latestBlockNumber} 
                        pageSize={PER_PAGE_RECORDS}
                        defaultPageSize={PER_PAGE_RECORDS}
                        current={currentPage}
                        onChange={(current)=>handlePaginationClick(current)}
                        simple>
                    </Pagination>
                </div>
            </div>
        </div>
    );
};

export default memo(AllBlocksPage);