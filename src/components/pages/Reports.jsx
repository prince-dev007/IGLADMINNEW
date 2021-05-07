import { useEffect } from "react";
// import DataTable from '../partials/DataTable';
// animation
import {motion} from 'framer-motion'
import Animation from '../../common/Animation';

const Reports = () => {
    window.$('#activePageHead').text('Reports');
    // const [dataArr, setDataArr]  = useState([]);
    // const renderTable = () => {

    // }
    useEffect(() => {
        document.title = 'IGL ADMIN | Reports';
        window.$('#pageSpinner').hide();
    },[])
    return (
        <div className="page-wrapper">
            <div className="page-content-wrapper">
                <motion.div initial={Animation.variants.out} animate={Animation.variants.in} exit={Animation.variants.exit} transition={Animation.PageTransition} className="page-content">
                    <div className="card dataCard">
                        <div className="card-body">
                            <div className="card-title ">
                            </div>
                            <div className="table-responsive">
                                <table className='table' >
                                    <thead>
                                        <tr>
                                            <th>S .No.</th>
                                            <th>Full Name</th>
                                            <th>Email</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr key={Math.random()} >
                                            <td>
                                                <div className="loadingWrapper " >
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
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );

}
export default Reports;