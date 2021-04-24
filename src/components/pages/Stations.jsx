import { useState, useEffect } from 'react';
import DataTable from '../partials/DataTable';
import { motion } from "framer-motion";

// icons
import { IoSearchOutline, IoRefreshOutline } from 'react-icons/io5';
import {IoMdAdd} from 'react-icons/io';
import Pagination from '../partials/Pagination';
import Animation from '../../common/Animation';
import { callAPI } from '../../common/common';

const Stations = () => {
    // defaults
    document.title = 'IGL ADMIN | Stations';
    window.$('#activePageHead').text('Stations');
    window.$('#pageSpinner').hide();
    window.$('#stationModal #modalSpinner').hide();


    // modal
    const modal = (action = null, data = null) => {
        if(action === 'new' || action === 'edit' ) {
            window.$('#stationModal').modal('show');
            setStationName(action === 'new' ? data.stationName : '');
            setDSO(action === 'new' ?  data.DSO : '');
            setAddress(action === 'new' ? data.address : '');
            setPincode(action === 'new' ?  data.pincode : '');
            setStationId(action === 'new' ?  data._id : action);
        }      
    }
    const renderTable = () => {
        return (
            <>
                {
                    dataArr.length > 0 ? dataArr.map(item => (
                        <tr  key={Math.random()} onClick={() => modal('edit', item)}>
                            <td>{item.stationName}</td>
                            <td>{item.DSO}</td>
                            <td>{item.address}</td>
                            <td>{item.pincode}</td>
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
                    </tr> 
                     </>
                }
            </>
        );
    }

    const [dataArr, setDataArr] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [limit,setLimit] = useState(50);
    const [total,setTotal] = useState(50000);
    const getAllStation = async () => {    
        window.$('#pageSpinner').show();
        setDataArr([]);   
        const response = await callAPI({
            URL : 'stations/all?page=' + currentPage + '&limit=' + limit,
        });
        if(response.status !== 200 && response.status !== 404)
            return ;
        // setCurrentPage(response.pageNum);
        setLastPage(response.lastPage);
        setLimit(response.pageSize);
        setTotal(response.total);
        setDataArr(response.status === 200 ? response.data : []);
        window.$('#pageSpinner').hide();    
    }

    const [stationId ,setStationId] = useState('new');
    const [stationName, setStationName] = useState('');
    const [DSO, setDSO] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const submitForm = async e => {
        e.preventDefault();
        window.$('#stationModal #modalSpinner').show();
        await callAPI({
            URL : 'stations/' + stationId,
            method : stationId === 'new' ? 'POST' : 'PUT',
            body : {
                stationName,DSO,address,pincode
            }
        });
        window.$('#stationModal #modalSpinner').hide();
        window.$('#stationModal #closeBtn').click();
        getAllStation();
    }
    useEffect(e => {
        getAllStation();
        return () => {
            window.$('#pageSpinner').show();
        }
    }, [currentPage]);

    return (
        <div  className="page-wrapper">
            <div className="page-content-wrapper">
                <motion.div initial={Animation.variants.out} animate={Animation.variants.in} exit={Animation.variants.exit} transition={Animation.PageTransition} className="page-content">
                    <div className="card ">
                        <div className="card-body">
                            <div className="card-title ">
                                <div className="row">
                                    <div className="col-12 pageHead">
                                        <div>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><IoSearchOutline /></span>
                                                </div>
                                                <input type="text" className="form-control" placeholder="Search here" />
                                            </div>
                                            <div className="form-group mb-0 w-50  ">
                                                <select onChange={e => setLimit(e.target.value)} defaultValue={'50'}  className="form-control">
                                                    <option value='50' >Select Result Limit</option>
                                                    <option value="50"  >50</option>
                                                    <option value="100">100</option>
                                                    <option value="500">500</option>
                                                    <option value="1000">1000</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <button type="button" onClick={() => modal('new')} className="btn btnIconC border mr-2" >
                                                <IoMdAdd /> New Station
                                            </button>
                                            <button type="button" onClick={getAllStation} className="btn btnIconC border" >
                                                <IoRefreshOutline />
                                            </button>
                                            <Pagination className='mb-0 ' total={total} currentPage={currentPage} setCurrentPage={setCurrentPage} lastPage={lastPage} pageSize={limit} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DataTable
                                tableRowHead={'Station Name,DSO,Address,Pincode'}
                                renderTable={renderTable}
                            />
                        </div>
                    </div>
                    {/* modal */}
                    <div className="modal fade" id="stationModal">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Station Details</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <form onSubmit={submitForm}>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label htmlFor="inputStationName">Station Name</label>
                                            <input type="text" value={stationName}  onChange={e => setStationName(e.target.value)} className='form-control' id="inputStationName"/>
                                        </div>  
                                        <div className="form-group">
                                            <label htmlFor="inputDSOName">DSO Name</label>
                                            <input type="text" value={DSO} onChange={e => setDSO(e.target.value) } className='form-control' id="inputDSOName"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="inputaddress">Address</label>
                                            <input type="text" value={address} onChange={e => setAddress(e.target.value) } className='form-control' id="inputaddress"/>
                                        </div>  
                                        <div className="form-group">
                                            <label htmlFor="inputPincode">Pincode</label>
                                            <input type="text" value={pincode} onChange={e => setPincode(e.target.value) } className='form-control' id="inputPincode"/>
                                        </div>                   
                                    </div>
                                    <div className="modal-footer">
                                        <div id="modalSpinner" style={{transform:'scale(0.7)'}} >
                                            <div className="spinner-border text-success" role="status">	
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        <button type='submit' className='btn btn-primary' >Submit</button>
                                        <button type="button" id="closeBtn" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
export default Stations;