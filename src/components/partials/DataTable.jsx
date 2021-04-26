const DataTable = ({ tableRowHead, renderTable }) => {  
    tableRowHead = tableRowHead.split(",")
    return (
        <>
        <div className="table-responsive scrollTable">
            <table className="table table-hover">
                <thead className="thead-light">
                    <tr >
                        {tableRowHead.map((item) => <th key={Math.random()} >{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {renderTable()}
                </tbody>
            </table>
        </div>
        </>
    );
};
export default DataTable;