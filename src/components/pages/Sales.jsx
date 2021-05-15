import { useState, useEffect } from 'react';
import DataTable from '../partials/DataTable';
import { motion } from "framer-motion";

// images
// import img_vnp from '../../assets/images/custom/vnp.jpg';
// import img_vnp1 from '../../assets/images/custom/vnp1.png';
// import img_vnp2 from '../../assets/images/custom/vnp2.png';

// icons
import { IoSearchOutline, IoRefreshOutline } from 'react-icons/io5';
import Pagination from '../partials/Pagination';
import Animation from '../../common/Animation';
import { callAPI } from '../../common/common';

const Sales = () => {
    document.title = 'IGL ADMIN | Sales';
    window.$('#activePageHead').text('Sales');
    window.$('#pageSpinner').hide();

    const [activeItem, setActiveItem] = useState({});
    // modal
    const modal = (action = null, data = null) => {
        window.$('#saleModal').modal('show');
        setActiveItem(data);
    }
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
                    <tr key={Math.random()} onClick={() => modal('edit', item)}>
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
                                            <button type="button" data-toggle="tooltip" data-placement="top" title={'Refresh'} onClick={triggerGetAll} className="btn btnIconC mr-2 border" >
                                                <IoRefreshOutline />
                                            </button>
                                            <div className="form-group mb-0 w-50">
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
                                tableRowHead={'Station,Dispensor,Side,Name,Contact Number,Bill Number,Vehicle Number, CNG Rate,Quantity (Kg),Amount (INR)'}
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
                                            <div className="block d-flex justify-content-center " style={{ marginTop: '20px', borderRadius: '8px' }} >
                                                <label className='blockHead'>Vehicle Image</label>
                                                <img src={activeItem.vehicleImage} className='img-fluid' alt="" />
                                            </div>
                                            <div className="block" style={{ marginTop: '30px' }}>
                                                <label className='blockHead'>Site Details</label>
                                                <label>CNG Station</label>
                                                <span>{activeItem.CNGStation}</span>
                                                <label>Manager</label>
                                                <span>{activeItem.manager} </span>
                                                <label>DSM</label>
                                                <span> {activeItem.DSM} </span>
                                                <label>Dispensor</label>
                                                <span>{activeItem.dispensor} </span>
                                                <label>Site</label>
                                                <span>{activeItem.site} </span>
                                            </div>

                                        </div>
                                        <div className='col-md-6 col-sm-12' >
                                            <div className="block " style={{ marginTop: '20px' }} >
                                                <label className='blockHead'>Bill Details</label>
                                                <label>Bill No.</label>
                                                <span>{activeItem.billNumber}</span>
                                                <label>Quantity (KG) </label>
                                                <span>{activeItem.quantity} </span>
                                                <label>Amount</label>
                                                <span>{activeItem.amount} </span>
                                                <label>CNG Rate</label>
                                                <span>{activeItem.CNGRate} </span>
                                            </div>
                                            <div className="block " style={{ marginTop: '30px' }}>
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
                </motion.div>
            </div>
        </div>
    );
}
export default Sales;