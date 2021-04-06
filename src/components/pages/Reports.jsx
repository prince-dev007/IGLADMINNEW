import { useEffect } from "react";

const Reports = () => {
    window.$('#activePageHead').text('Reports');
    useEffect(() => {
        window.$('#pageSpinner').hide();
    },[])
    return (
        <div className="page-wrapper">
            <div className="page-content-wrapper">
                <div className="page-content">
                    {/* <h1>Reports</h1> */}
                </div>
            </div>
        </div>
        
    );

}
export default Reports;