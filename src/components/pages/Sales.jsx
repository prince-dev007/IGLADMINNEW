import { useState, useEffect } from 'react';
import DataTable from '../partials/DataTable';
import { motion } from "framer-motion";

// images
import img_vnp from '../../assets/images/custom/vnp.jpg';
import img_vnp1 from '../../assets/images/custom/vnp1.png';
import img_vnp2 from '../../assets/images/custom/vnp2.png';

// icons
import { IoSearchOutline, IoRefreshOutline } from 'react-icons/io5';
import Pagination from '../partials/Pagination';
import Animation from '../../common/Animation';

const Sales = () => {

    const [activeItem, setActiveItem] = useState({});
    // modal
    const modal = (action = null, data = null) => {
        window.$('#saleModal').modal('show');
        setActiveItem(data);

    }
    const renderTable = () => {
        let count = 0;
        return (
            <>
                {
                    dataArr.length > 0 ? dataArr.map(item => (
                        <tr onClick={() => modal('edit', item)}>
                            <td>{++count}</td>
                            <td>{item.CNGStation}</td>
                            <td>{item.manager}</td>
                            <td>{item.DSM}</td>
                            <td>{item.dispensor}</td>
                            <td>{item.site}</td>
                            <td>{item.name}</td>
                            <td>{item.contactNumber}</td>
                            <td>{item.billNumber}</td>
                            <td>{item.vehicleNumber}</td>
                            <td><img src={item.vehicleImage} alt={item.vehicleNumber} /></td>
                            <td>{item.CNGRate}</td>
                            <td>{item.quantity}</td>
                            <td>{item.amount}</td>
                        </tr>
                    )) : <tr><td colSpan='8' className="text-center ">RECORD NOT FOUND</td> </tr>
                }
            </>
        );
    }

    const [dataArr, setDataArr] = useState([]);
    useEffect(e => {
        document.title = 'IGL ADMIN | Sales';
        window.$('#activePageHead').text('Sales');
        window.$('#pageSpinner').hide();
        setDataArr([{
            CNGStation: 'IGL Udyan Marg New Delhi',
            manager: "Ishwar Singh",
            DSM: 'Dipesh Kumar',
            dispensor: '1',
            site: 'A',
            name: 'Prince Singh',
            contactNumber: '8299727265',
            billNumber: 'IGLUDM0001',
            vehicleNumber: 'MH12 DE 1433',
            vehicleImage: img_vnp,
            fuelType: 'CNG',
            CNGRate: '34.50',
            quantity: 50,
            amount: 218.89
        },
        {
            CNGStation: 'IGL Udyan Marg New Delhi',
            manager: "Ishwar Singh",
            DSM: 'Dipesh Kumar',
            dispensor: '1',
            site: 'A',
            name: 'Rohan Singh',
            contactNumber: '8989765643',
            billNumber: 'IGLUDM0003',
            vehicleNumber: 'DL1 RS 1081',
            vehicleImage: img_vnp2,
            fuelType: 'CNG',
            CNGRate: '34.50',
            quantity: 50,
            amount: 218.89
        },
        {
            CNGStation: 'IGL Udyan Marg New Delhi',
            manager: "Ishwar Singh",
            DSM: 'Dipesh Kumar',
            dispensor: '1',
            site: 'A',
            name: 'Prince Singh',
            contactNumber: '8299727265',
            billNumber: 'IGLUDM0005',
            vehicleNumber: 'DL1 RS 1081',
            vehicleImage: img_vnp,
            fuelType: 'CNG',
            CNGRate: '34.50',
            quantity: 50,
            amount: 218.89
        },
        {
            CNGStation: 'IGL Udyan Marg New Delhi',
            manager: "Ishwar Singh",
            DSM: 'Dipesh Kumar',
            dispensor: '1',
            site: 'A',
            name: 'Asif Ahmad',
            contactNumber: '8400987456',
            billNumber: 'IGLUDM0002',
            vehicleNumber: 'DL1 RS 1081',
            vehicleImage: img_vnp1,
            fuelType: 'CNG',
            CNGRate: '34.50',
            quantity: 50,
            amount: 218.89
        },
        {
            CNGStation: 'IGL Udyan Marg New Delhi',
            manager: "Ishwar Singh",
            DSM: 'Dipesh Kumar',
            dispensor: '1',
            site: 'A',
            name: 'Rohan Singh',
            contactNumber: '8989765643',
            billNumber: 'IGLUDM0003',
            vehicleNumber: 'DL1 RS 1081',
            vehicleImage: img_vnp2,
            fuelType: 'CNG',
            CNGRate: '34.50',
            quantity: 50,
            amount: 218.89
        },
        {
            CNGStation: 'IGL Udyan Marg New Delhi',
            manager: "Ishwar Singh",
            DSM: 'Dipesh Kumar',
            dispensor: '1',
            site: 'A',
            name: 'Prince Singh',
            contactNumber: '8299727265',
            billNumber: 'IGLUDM0001',
            vehicleNumber: 'DL1 RS 1081',
            vehicleImage: img_vnp1,
            fuelType: 'CNG',
            CNGRate: '34.50',
            quantity: 50,
            amount: 218.89
        },
        {
            CNGStation: 'IGL Udyan Marg New Delhi',
            manager: "Ishwar Singh",
            DSM: 'Dipesh Kumar',
            dispensor: '1',
            site: 'A',
            name: 'Rohan Singh',
            contactNumber: '8989765643',
            billNumber: 'IGLUDM0003',
            vehicleNumber: 'DL1 RS 1081',
            vehicleImage: img_vnp1,
            fuelType: 'CNG',
            CNGRate: '34.50',
            quantity: 50,
            amount: 218.89
        },
        {
            CNGStation: 'IGL Udyan Marg New Delhi',
            manager: "Ishwar Singh",
            DSM: 'Dipesh Kumar',
            dispensor: '1',
            site: 'A',
            name: 'Shivam Singh',
            contactNumber: '7878543223',
            billNumber: 'IGLUDM0004',
            vehicleNumber: 'MH12 TH 7878',
            vehicleImage: img_vnp,
            fuelType: 'CNG',
            CNGRate: '34.50',
            quantity: 50,
            amount: 218.89
        },
        {
            CNGStation: 'IGL Udyan Marg New Delhi',
            manager: "Ishwar Singh",
            DSM: 'Dipesh Kumar',
            dispensor: '1',
            site: 'A',
            name: 'Prince Singh',
            contactNumber: '8299727265',
            billNumber: 'IGLUDM0001',
            vehicleNumber: 'MH12 DE 14323',
            vehicleImage: img_vnp,
            fuelType: 'CNG',
            CNGRate: '34.50',
            quantity: 50,
            amount: 218.89
        },
        {
            CNGStation: 'IGL Udyan Marg New Delhi',
            manager: "Ishwar Singh",
            DSM: 'Dipesh Kumar',
            dispensor: '1',
            site: 'A',
            name: 'Prince Singh',
            contactNumber: '8299727265',
            billNumber: 'IGLUDM0005',
            vehicleNumber: 'DL1 RS 1081',
            vehicleImage: img_vnp1,
            fuelType: 'CNG',
            CNGRate: '34.50',
            quantity: 50,
            amount: 218.89
        },
        {
            CNGStation: 'IGL Udyan Marg New Delhi',
            manager: "Ishwar Singh",
            DSM: 'Dipesh Kumar',
            dispensor: '1',
            site: 'A',
            name: 'Rohan Singh',
            contactNumber: '8989765643',
            billNumber: 'IGLUDM0003',
            vehicleNumber: 'DL1 RS 1081',
            vehicleImage: img_vnp1,
            fuelType: 'CNG',
            CNGRate: '34.50',
            quantity: 50,
            amount: 218.89
        },
        {
            CNGStation: 'IGL Udyan Marg New Delhi',
            manager: "Ishwar Singh",
            DSM: 'Dipesh Kumar',
            dispensor: '1',
            site: 'A',
            name: 'Asif Khan',
            contactNumber: '7676453423',
            billNumber: 'IGLUDM0006',
            vehicleNumber: 'DL1 RS 1081',
            vehicleImage: img_vnp2,
            fuelType: 'CNG',
            CNGRate: '34.50',
            quantity: 50,
            amount: 218.89
        },
        {
            CNGStation: 'IGL Udyan Marg New Delhi',
            manager: "Ishwar Singh",
            DSM: 'Dipesh Kumar',
            dispensor: '1',
            site: 'A',
            name: 'Rohan Singh',
            contactNumber: '8989765643',
            billNumber: 'IGLUDM0003',
            vehicleNumber: 'DL1 RS 1081',
            vehicleImage: img_vnp1,
            fuelType: 'CNG',
            CNGRate: '34.50',
            quantity: 50,
            amount: 218.89
        }]);
        return () => {
            window.$('#pageSpinner').show();
        }
    }, []);

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
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><IoSearchOutline /></span>
                                                </div>
                                                <input type="text" class="form-control" placeholder="Search here" />
                                            </div>
                                            <div class="form-group mb-0 w-50  ">
                                                <select class="form-control">
                                                    <option>Default select</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <button type="button" class="btn btnIconC border" >
                                                <IoRefreshOutline />
                                            </button>
                                            <Pagination className='mb-0 ' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DataTable
                                tableRowHead={'S. No,CNG Station,Manager,DSM,Dispensor, Site,Name,Contact Number,Bill Number,Vehicle Number,Vehicle Image, CNG Rate,Quantity (Kg),Amount (INR)'}
                                renderTable={renderTable}
                            />
                        </div>
                    </div>
                    {/* modal */}
                    <div class="modal fade" id="saleModal" tabindex="-1">
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Sale Details</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
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
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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