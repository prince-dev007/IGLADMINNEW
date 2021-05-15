import { useEffect, useState } from "react";

import { callAPI } from '../../common/common';

import Pagination from '../partials/Pagination';
import DataTable from '../partials/DataTable';

// animation
import { motion } from 'framer-motion'
import Animation from '../../common/Animation';

// icons
import { IoRefreshOutline } from 'react-icons/io5';
import { MdClear } from 'react-icons/md';


const dateModule = require('../../common/date');

const Reports = () => {
    const renderProgress = (row = 0, col = 0) => {
        const tableSize = [row, col];
        return [...Array(tableSize[0])].map((tr, trIdx) =>
            <tr key={trIdx}>
                {[...Array(tableSize[1])].map((a, tdIdx, arr) =>
                    <td key={trIdx + tdIdx}>
                        <div className="loadingWrapper">
                            <div className="activity"></div>
                        </div>
                    </td>
                )}
            </tr>
        )
    }
    const renderTable = () => {
        if(dataArr == null) 
            return renderProgress(10,10);
        return (
            <>
                {
                    dataArr.length > 0 ? dataArr.map(item => (
                        <tr key={Math.random()} >
                            <td>{item.Station}</td>
                            <td>{item.dispensor}</td>
                            <td>{item.side}</td>
                            <td>{item.name}</td>
                            <td>{item.contactNumber}</td>
                            <td>{item.billNumber}</td>
                            <td>{item.vehicleNumber}</td>
                            <td>{item.CNGRate}</td>
                            <td>{item.quantity}</td>
                            <td>{item.amount}</td>
                        </tr>
                    ))
                        :
                        <tr>
                            <td className='text-center' colSpan={10} >...Record Not Found</td>
                        </tr>
                }
            </>
        );
    }

    const [filerDate, setFilterDate] = useState(dateModule.date())
    const [filterStation, setFilterStation] = useState('DEFAULT');

    const triggerGetAll = () => setRandom(Math.random());
    const [random, setRandom] = useState(0);
    const [dataArr, setDataArr] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [total, setTotal] = useState(0);
    useEffect(e => {
        const getAllBill = async () => {
            setDataArr(null);
            const response = await callAPI({
                URL: 'sales/all?page=' + currentPage + '&limit=' + limit + '&date=' + filerDate + (filterStation === 'DEFAULT' ? '' : '&station=' + filterStation),
                abort: true
            });
            if (response.status !== 200 && response.status !== 404)
                return;
            setTotal(response.total);
            setDataArr(response.status === 200 ? response.data : []);
            window.$('#pageSpinner').hide();
        }
        getAllBill();
        return () => {
            window.$('#pageSpinner').show();
        }
    }, [currentPage, limit, random, filerDate, filterStation]);

    // getting stations for dropdown
    const [stationArr, setStationArr] = useState([]);
    useEffect(() => {
        const getAllStation = async () => {
            const response = await callAPI({
                URL: 'stations/mini'
            });
            if (response.status === 200) {
                setStationArr(response.data);
            }
        }
        getAllStation();
        window.$('#activePageHead').text('Reports');
        window.$('#pageSpinner').hide();
        document.title = 'IGL ADMIN | Reports';
    }, [])
    return (
        <div className="page-wrapper">
            <div className="page-content-wrapper">
                <motion.div initial={Animation.variants.out} animate={Animation.variants.in} exit={Animation.variants.exit} transition={Animation.PageTransition} className="page-content">
                    <div className="card dataCard">
                        <div className="card-body">
                            <div className="card-title ">
                                <div className="row">
                                    <div className="col-12 pageHead">
                                        <div>
                                            <div className="form-group mb-0 mr-2 outline-none" style={{ width: '50%' }}>
                                                <select defaultValue={filterStation} value={filterStation} onChange={e => setFilterStation(e.target.value)} title={'Stations wise filter'} className="form-control">
                                                    <option key={'null'} value={'DEFAULT'} >Select Station</option>
                                                    {stationArr.map(stationItem => <option key={stationItem._id} value={stationItem._id} >{stationItem.stationName}</option>)}
                                                </select>
                                            </div>
                                            <div className="form-group mb-0 w-50 mr-2">
                                                <input type="date" value={filerDate} title={'Date wise filter'} onChange={e => setFilterDate(e.target.value)} className="form-control" />
                                            </div>
                                            <button type="button" title={'Reset filter'} onClick={e => { setFilterDate(dateModule.date()); setFilterStation('DEFAULT') }} className="btn btnIconC border" >
                                                <MdClear />
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" title={'Refresh'} onClick={triggerGetAll} className="btn btnIconC border" >
                                                <IoRefreshOutline />
                                            </button>
                                            <div className="form-group mb-0 ml-2">
                                                <select title={'Result limit'} onChange={e => setLimit(e.target.value)} defaultValue={limit} value={limit} className="form-control">
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                    <option value="500">500</option>
                                                    <option value="1000">1000</option>
                                                </select>
                                            </div>
                                            <Pagination className='mb-0' total={total} currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={limit} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DataTable
                                tableRowHead={'Station,Dispensor,Side,Name,Contact Number,Bill Number,Vehicle Number, CNG Rate,Quantity (Kg),Amount (INR)'}
                                renderTable={renderTable}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );

}
export default Reports;