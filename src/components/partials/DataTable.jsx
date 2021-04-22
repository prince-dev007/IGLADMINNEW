const DataTable = ({ tableRowHead, renderTable }) => {  
    return (
        <>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead class="thead-light">
                    <tr>
                        {((tableRowHead = tableRowHead.split(",")), tableRowHead.map((item) =>
                            <th>{item}</th>))}
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