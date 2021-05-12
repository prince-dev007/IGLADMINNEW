import { useState, useEffect } from 'react';
import DataTable from '../partials/DataTable';
import { motion } from "framer-motion";

// icons
import { IoRefreshOutline } from 'react-icons/io5';
import {RiGasStationLine} from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';
import Pagination from '../partials/Pagination';
import Animation from '../../common/Animation';
import { callAPI } from '../../common/common';

const Stations = () => {
    // defaults
    document.title = 'IGL ADMIN | Stations';
    window.$('#activePageHead').text('Stations');
    window.$('#pageSpinner').hide();
    window.$('#stationModal #modalSpinner').hide();

    const renderTable = () => {
        return (
            <>
                {
                    dataArr.length > 0 ? dataArr.map(item => (
                        <tr key={Math.random()} onClick={() => modal('edit', item)}>
                            <td>{item.stationName}</td>
                            <td>{item.DSO}</td>
                            <td>{item.address}</td>
                            <td>{item.pincode}</td>
                        </tr>
                    ))
                        :
                        <tr>
                            <td colSpan={4}>...Record Not Found</td>
                        </tr>
                }
            </>
        );
    }

    // submit form PUT/POST
    const submitForm = async e => {
        e.preventDefault();
        window.$('#stationModal #modalSpinner').show();
        await callAPI({
            URL: 'stations/' + stationId,
            method: stationId === 'new' ? 'POST' : 'PUT',
            body: {
                stationName, DSO, address, pincode
            }
        });
        window.$('#stationModal #modalSpinner').hide();
        window.$('#stationModal #closeBtn').click();
        triggerGetAll();
    }

    // modal
    const [stationId, setStationId] = useState('new');
    const [stationName, setStationName] = useState('');
    const [DSO, setDSO] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const modal = (action = null, data = null) => {
        if (action === 'new' || action === 'edit') {
            window.$('#stationModal').modal('show');
            setStationName(action === 'edit' ? data.stationName : '');
            setDSO(action === 'edit' ? data.DSO : '');
            setAddress(action === 'edit' ? data.address : '');
            setPincode(action === 'edit' ? data.pincode : '');
            setStationId(action === 'edit' ? data._id : action);
        }
    }

    // get all
//     const progessPageholder = <div className="loadingWrapper " >
//     <div className="activity"></div>
// </div>;
    const triggerGetAll = () => setRandom(Math.random());
    const [random, setRandom] = useState(0);
    const [dataArr, setDataArr] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [total, setTotal] = useState(50000);
    useEffect(e => {
        const getAllStation = async () => {
            setDataArr([]);
            const response = await callAPI({
                URL: 'stations/all?page=' + currentPage + '&limit=' + limit,
                abort : true
            });
            if (response.status !== 200 && response.status !== 404)
                return;
            setTotal(response.total);
            setDataArr(response.status === 200 ? response.data : []);
        }
        getAllStation();
        return () => {
            window.$('#pageSpinner').show();
        }
    }, [currentPage, limit, random]);

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
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><RiGasStationLine /></span>
                                                </div>
                                                <input type="text" className="form-control" placeholder="Search here" />
                                            </div>
                                            <div className="form-group mb-0 w-50  ">
                                                <select onChange={e => setLimit(e.target.value)} defaultValue={'50'} className="form-control">
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
                                                <IoMdAdd /> New
                                            </button>
                                            <button type="button" onClick={triggerGetAll} className="btn btnIconC border" >
                                                <IoRefreshOutline />
                                            </button>
                                            <Pagination className='mb-0 ' total={total} currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={limit} />
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
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header mb-3 mt-3 ">
                                    <h5 className="modal-title">Station Details</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <form onSubmit={submitForm}>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <fieldset className='formBox' >
                                                    <legend>Station Name </legend>
                                                    <input type="text" placeholder="Station Name" value={stationName} onChange={e => setStationName(e.target.value)} className='formField' />
                                                </fieldset>
                                                <fieldset className='formBox' >
                                                    <legend>Address</legend>
                                                    <input type="text" value={address} placeholder='Address of Station' onChange={e => setAddress(e.target.value)} className='formField' />
                                                </fieldset>
                                            </div>
                                            <div className="col-md-6">
                                                <fieldset className='formBox' >
                                                    <legend>DSO Name</legend>
                                                    <input type="text" value={DSO} placeholder='DSO name' onChange={e => setDSO(e.target.value)} className='formField' />
                                                </fieldset>
                                                <fieldset className='formBox' >
                                                    <legend>Pincode </legend>
                                                    <input type="number" placeholder='Pincode of Station' value={pincode} onChange={e => setPincode(e.target.value)} className='formField' />
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer mt-3">
                                        <div id="modalSpinner" style={{ transform: 'scale(0.7)' }} >
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