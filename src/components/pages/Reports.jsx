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
    const renderTable = () => {
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
                        <>
                            <tr key={Math.random()} >
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr key={Math.random()} >
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr key={Math.random()} >
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr key={Math.random()} >
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr key={Math.random()} >
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr key={Math.random()} >
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr key={Math.random()} >
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr key={Math.random()} >
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr key={Math.random()} >
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr key={Math.random()} >
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="loadingWrapper">
                                        <div className="activity"></div>
                                    </div>
                                </td>
                            </tr>
                        </>
                }
            </>
        );
    }

    const [filerDate, setFilterDate] = useState(dateModule.date())
    const [filterStation, setFilterStation] = useState('null');

    const triggerGetAll = () => setRandom(Math.random());
    const [random, setRandom] = useState(0);
    const [dataArr, setDataArr] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(50);
    setLimit(50);
    const [total, setTotal] = useState(50000);
    useEffect(e => {
        const getAllBill = async () => {
            setDataArr([]);
            const response = await callAPI({
                URL: 'sales/all?page=' + currentPage + '&limit=' + limit + '&date=' + filerDate + (filterStation === 'null' ? '' : '&station=' + filterStation),
                abort: true
            });
            if (response.status !== 200 && response.status !== 404)
                return;
            setTotal(response.total);
            setDataArr(response.status === 200 ? response.data : []);
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
                                                <select defaultValue={'null'} onChange={e => setFilterStation(e.target.value)} className="form-control">
                                                    <option key={'null'} value={'null'} >Select Station</option>
                                                    {stationArr.map(stationItem => <option key={stationItem._id} value={stationItem._id} >{stationItem.stationName}</option>)}
                                                </select>
                                            </div>
                                            <div className="form-group mb-0 w-50">
                                                <input type="date" value={filerDate} onChange={e => setFilterDate(e.target.value)} className="form-control" />
                                            </div>
                                            <button type="button" onClick={e => { setFilterDate(dateModule.date()); setFilterStation('null') }} className="btn ml-1 btnIconC border" >
                                                <MdClear />
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" onClick={triggerGetAll} className="btn btnIconC border" >
                                                <IoRefreshOutline />
                                            </button>
                                            <Pagination className='mb-0 ' total={total} currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={limit} />
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