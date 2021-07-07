import { useState, useEffect } from 'react';
import DataTable from '../partials/DataTable';
import { motion } from "framer-motion";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import '../../assets/css/sale.pdf.css';
// images
// import img_vnp from '../../assets/images/custom/vnp.jpg';
// import img_vnp1 from '../../assets/images/custom/vnp1.png';
// import img_vnp2 from '../../assets/images/custom/vnp2.png';

// icons
import { IoSearchOutline, IoRefreshOutline } from 'react-icons/io5';
import { BiExport } from 'react-icons/bi';

// components
import Pagination from '../partials/Pagination';
import Animation from '../../common/Animation';
import { callAPI, fDate } from '../../common/common';

const Sales = () => {
    document.title = 'IGL ADMIN | Sales';
    window.$('#activePageHead').text('Sales');

    const [activeItem, setActiveItem] = useState({});
    // modal
    const modal = (action = null, data = null) => {
        if(action === 'VIEW') {
            window.$('#saleModal').modal('show');
            setActiveItem(data);
        } else if(action === 'EXPORT') {
            window.$('#exportModal').modal('show');
            // initExport();
        }
    }

    // 

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
    let saleCounter = 0;
    const renderTable = () => {
        if(dataArr == null)
            return renderProgress(10,10);
        return (
            <>
            {
                dataArr.length > 0 ? dataArr.map(item => (
                    <tr key={Math.random()} onClick={() => modal('VIEW', item)}>
                        <td>{++saleCounter}</td>
                        <td>{item.billNumber}</td>
                        <td>{item.Station ? item.Station.stationName : item.Station}</td>
                        <td>{fDate(item.createdAt)}</td>
                        <td>{item.dispensor}<br/> { 'Side : ' + item.side}</td>
                        <td>{item.name} <br/> {item.contactNumber}</td>
                        <td>{item.vehicleNumber}</td>
                        <td>{item.quantity}</td>
                        <td>{item.CNGRate}</td>
                        <td>{item.amount}</td>
                        <td></td>
                    </tr>
                )) 
                :
                <tr>
                    <td className='text-center' colSpan={10} > <span className='badge badge-info'>Record Not Found</span></td>
                </tr>
             }
            </>
        );
    }

    // export
    // const initExport = async () => {

    //     // all stations
    //     const response = await callAPI({
    //         URL: 'stations/mini' 
    //     });
    //     setStationArr(response.status === 200 ? response.data : []);

    // }
    const exportData = async format => {
        if(format === 'PDF') {
            window.$('#exportModal #closeBtn').click();

            setTimeout(() => {
                window.print();
            }, 250);
            

        } else if(format === 'XLS') {
            // const response = await callAPI({
            //     URL :  '/sales/export'
            // })
        }
    }


    // const [submitNoteClass, setSubmitNoteClass] = useState('');
    // const [submitNoteTxt, setSubmitNoteTxt] = useState('');
    // const [stationArr, setStationArr] = useState([]);
    // const [employeeArr, setEmployeeArr] = useState(null);

    // get all
    const triggerGetAll = () => setRandom(Math.random());
    const [random, setRandom] = useState(0);
    const [dataArr, setDataArr] = useState(null);
    const [currentPage,setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [limit,setLimit] = useState(50);
    const [total,setTotal] = useState(0);
    useEffect( e => {
        const getAllSale = async () => {    
            setDataArr(null);
            const response = await callAPI({
                URL : 'sales/all?page=' + currentPage + '&limit=' + limit,
                abort : true
            });
            if(response.status !== 200 && response.status !== 404)
                return ;
            setLastPage(response.lastPage);
            setTotal(response.total);
            setDataArr(response.status === 200 ? response.data : []);
        }
        getAllSale();
        return () => {
            window.$('#pageSpinner').show();
        }
    }, [currentPage,limit, random]);

    return (
        <div  className="page-wrapper">
            <div className="page-content-wrapper">
                <motion.div initial={Animation.variants.out} animate={Animation.variants.in} exit={Animation.variants.exit} transition={Animation.PageTransition} className="page-content">
                    <div className="card dataCard">
                        <div className="card-body">
                            <div className="card-title ">
                                <div className="row">
                                    <div className="col-12 pageHead">
                                        <div>
                                            <div className="input-group" style={{width:'unset'}}>
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><IoSearchOutline /></span>
                                                </div>
                                                <input type="text" title={'Search'} className="form-control" placeholder="Search here" />
                                            </div>
                                        </div>
                                        <div>
                                            <button type="button" data-toggle="tooltip" data-placement="top" title={'Excprt PDF'} onClick={e => modal('EXPORT')} className="btn btnIconC mr-2 border" >
                                                <BiExport />
                                            </button>
                                            <button type="button" data-toggle="tooltip" data-placement="top" title={'Refresh'} onClick={triggerGetAll} className="btn btnIconC mr-2 border" >
                                                <IoRefreshOutline />
                                            </button>
                                            <div className="form-group mb-0 w-50 mr-2">
                                                <select title={'Result limit'} onChange={e => setLimit(e.target.value)} defaultValue={limit} value={limit} className="form-control">
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                    <option value="500">500</option>
                                                    <option value="1000">1000</option>
                                                </select>
                                            </div>
                                            <Pagination className='mb-0' total={total} currentPage={currentPage} setCurrentPage={setCurrentPage} lastPage={lastPage} pageSize={limit} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DataTable
                                tableRowHead={'Sr No.,Bill No.,Station,DateTime,Dispensor,Customer,Vehicle,Qty(Kg),Rate,Amount, DSM'}
                                renderTable={renderTable}
                            />
                        </div>
                    </div>
                    {/* modal */}
                    <div className="modal fade" id="saleModal">
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Sale Details</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className='row textBlock'>
                                        <div className='col-md-6 col-sm-12' >
                                            <div className="block " >
                                                <label className='blockHead'>Bill Details</label>
                                                <label>CNG Station</label>
                                                <span>{activeItem.Station ? activeItem.Station.stationName : ''}</span>
                                                <label>Bill No.</label>
                                                <span>{activeItem.billNumber}</span>
                                                <label>Quantity (KG) </label>
                                                <span>{activeItem.quantity} </span>
                                                <label>Amount</label>
                                                <span>{activeItem.amount} </span>
                                                <label>CNG Rate</label>
                                                <span>{activeItem.CNGRate} </span>
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-sm-12' >
                                            {/* <div className="block d-flex justify-content-center " style={{ borderRadius: '8px' }} >
                                                <label className='blockHead'>Vehicle Image</label>
                                                <img src={activeItem.vehicleImage} className='img-fluid' alt="" />
                                            </div> */}
                                            <div className="block" >
                                                <label className='blockHead'>Customer Details</label>
                                                <label>Name</label>
                                                <span>{activeItem.name} </span>
                                                <label>Contact No.</label>
                                                <span>{activeItem.contactNumber} </span>
                                                <label>Vehicle No.</label>
                                                <span>{activeItem.vehicleNumber} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  export modal */}
                    <div className="modal fade" id="exportModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Export Sales</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-12">
                                            {/* <fieldset className='formBox' >
                                                <legend>Station Name</legend>
                                                <select className='formField' name="stationId" >
                                                    <option>All Station</option>
                                                    {stationArr.map(stationItem => <option key={stationItem._id} value={stationItem._id} >{stationItem.stationName}</option>)}
                                                </select>
                                            </fieldset>
                                            <fieldset className='formBox' >
                                                <legend>Employee</legend>
                                                <select className='formField' name="stationId" >
                                                    <option>All Employee</option>
                                                </select>
                                            </fieldset>
                                            <fieldset className='formBox' >
                                                <legend>Start Date</legend>
                                                <input type="date" placeholder='Start Date'  className='formField' />
                                            </fieldset>
                                            <fieldset className='formBox' >
                                                <legend>End Date</legend>
                                                <input type="date" placeholder='End Date'  className='formField' />
                                            </fieldset> */}
                                            <ReactHTMLTableToExcel
                                                className="btn btn-sm btn-info m-2 border"
                                                table="dataTable"
                                                filename="Sales"
                                                sheet="Sales"
                                                buttonText="Export as XLS" 
                                            />
                                            <button class="btn btn-info btn-sm m-2" onClick={e => exportData('PDF')} > Export as PDF</button>
                                            {/* <button class="btn btn-info" onClick={e => exportData('XLS')} >Export as XLS</button> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer mt-3">
                                    <div className="submitNote" >
                                        {/* <span className={submitNoteClass} >{submitNoteTxt}</span>    */}
                                    </div>
                                    <div id="modalSpinner" style={{ transform: 'scale(0.7)' }} >
                                        <div className="spinner-border text-success" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-secondary" id="closeBtn"  data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
export default Sales;