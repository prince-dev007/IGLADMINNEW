import  {VscChevronLeft} from 'react-icons/vsc';
import  {VscChevronRight} from 'react-icons/vsc';
const Pagination = ({className = null, total = 0, currentPage = 0,pageSize = 0, setCurrentPage}) => {
    pageSize = Number(pageSize) ? Number(pageSize) : pageSize;
    let fromPage = currentPage !== 0 ?  ((currentPage - 1) * pageSize) + 1 : 0;
    fromPage = total === 0 ? 0 : fromPage;
    let toPage = ((currentPage - 1) * pageSize) + pageSize;
    toPage = toPage > total  ? total : toPage;
    return (
        <ul className={className ? "pagination " + className : "pagination"}>
            <li className="page-item">
                <button disabled={currentPage <= 1} onClick={() => setCurrentPage(currPage =>  currPage - 1)} className="page-link btnIconC">
                    <VscChevronLeft />
                </button>
            </li>
            <li className="page-item">
                <span className="page-link d-flex align-items-center" style={{height:'38px',minWidth:'120px',textAlign:'center', justifyContent:'center' }}>{fromPage} - {toPage} of {total}</span>
            </li>
            <li className="page-item next">
                <button disabled={toPage === total} onClick={() => setCurrentPage(currPage =>  currPage + 1)} className="page-link btnIconC">
                    <VscChevronRight />
                </button>
            </li>
        </ul>
    );
}
export default Pagination;