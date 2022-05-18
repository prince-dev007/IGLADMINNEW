import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";

import { Form, InputGroup, Table } from "react-bootstrap";
// icons
import { IoRefreshOutline, IoHandRightOutline } from "react-icons/io5";
import { FcFeedback } from "react-icons/fc";
import { RiGasStationLine, RiDeleteBinLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { FaFistRaised, FaPlusCircle } from "react-icons/fa";

// components
import Pagination from "../partials/Pagination";
import Animation from "../../common/Animation";

// utils
import { callAPI } from "../../common/common";

// Date 
import dateGenerator from "../../common/date";

// Context
import { AppContext } from "../../Context/Context";

// import image
import NoImg from "../../assets/images/image-not.png";
import Manager from "./Manager";

const Helpdesk = () => {
    const { user, contextDispatch } = useContext(AppContext);

    useEffect(() => {
        contextDispatch({
            type: "SET_PAGE_TITLE",
            payload: "PriceBook",
        });
        contextDispatch({
            type: "SET_ACTIVE_PAGE_HEAD",
            payload: "PriceBook",
        });
        // window.$("#pageSpinner").hide();

        return () => {
            contextDispatch({
                type: "SET_ACTIVE_PAGE_SPINNER",
                payload: true,
            });
        };

    }, [contextDispatch]);

    const location = [
        {
            label: "Noida",
            key: "NOIDA"
        },
        {
            label: "Delhi",
            key: "DELHI"
        }
    ];

    const modal = (action = null, data = null) => {
        if (action === "NEW" || action === "EDIT") {
            window.$("#pricebook #modalSpinner").hide();
            window.$("#pricebook").modal("show");
        }
    }

    // get all
    const [searchStr, setSearchStr] = useState("");
    const triggerGetAll = () => setRandom(Math.random());
    const [random, setRandom] = useState(0);
    const [dataArr, setDataArr] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [total, setTotal] = useState(0);


    return (
        <div className="page-wrapper">
            <div className="page-content-wrapper">
                <motion.div initial={Animation.variants.out} animate={Animation.variants.in} exit={Animation.variants.exit} transition={Animation.PageTransition} className="page-content">
                    <div className="card dataCard">
                        <div className="card-body">
                            <div className="card-title cardC__head">
                                <div>
                                    <div className="input-group inputGroupC" style={{ width: "unset" }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <RiGasStationLine />
                                            </span>
                                        </div>
                                        <input type="text" className="form-control" title={"Search"} onChange={(e) => setSearchStr(e.target.value)} placeholder="Search here" />
                                    </div>
                                </div>


                                <button type="button" onClick={triggerGetAll} title={"Refresh"} className="btn btnIconC border mr-2">
                                    <IoRefreshOutline />
                                </button>
                                <InputGroup className="inputGroupC">
                                    <Form.Select className="form-control inputGroupC__input" title="Station" onChange={(e) => setLimit(e.target.value)} defaultValue={limit}>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="500">500</option>
                                        <option value="1000">1000</option>
                                    </Form.Select>
                                </InputGroup>
                                <button type="button" onClick={() => modal("NEW")} title={"Create A PriceBook"} className="btn btnIconC border mr-2">
                                    Create a Pricebook
                                </button>
                                <Pagination className="mb-0" total={total} currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={limit} />
                            </div>
                            <Table bordered responsive hover>
                                <thead>
                                    <tr>
                                        <th>Location Name</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="modal fade" id="pricebook">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header mb-3 mt-3 ">
                                    <h5 className="modal-title">Create A Pricebook</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <form>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <fieldset className="formBox">
                                                    <legend>Location</legend>
                                                    <select className="formField">
                                                        <option value="">-- Select Location --</option>
                                                        {
                                                            location.map((lc) => {
                                                                return (
                                                                    <option value={lc.key} key={lc.key}>
                                                                        {lc.label}
                                                                    </option>
                                                                );
                                                            }
                                                            )};
                                                    </select>
                                                </fieldset>
                                            </div>
                                            <div className="col-md-6">
                                                <fieldset className="formBox">
                                                    <legend>Price</legend>
                                                    <input className="formField" type="number" min="0"/>
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div className="modal-footer mt-3">
                                            <input type="submit" value="Save" className="btn btn-primary" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </motion.div>
            </div >
        </div >
    )
};
export default Helpdesk;