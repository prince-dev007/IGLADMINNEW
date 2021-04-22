import  {VscChevronLeft} from 'react-icons/vsc';
import  {VscChevronRight} from 'react-icons/vsc';
const Pagination = ({className = null, total = 0, currentPage = 0,pageSize = 0, lastPage = 0, setCurrentPage}) => {
    const fromPage = currentPage !== 0 ?  ((currentPage - 1) * pageSize) + 1 : 0;
    const toPage = ((currentPage - 1) * pageSize) + pageSize;
    return (
        <ul class={className ? "pagination " + className : "pagination"}>
            <li class="page-item">
                <button disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)} class="page-link btnIconC">
                    <VscChevronLeft />
                </button>
            </li>
            <li class="page-item">
                <span class="page-link d-flex align-items-center" style={{height:'38px',minWidth:'120px' }}>{fromPage} - {toPage} of {total}</span>
            </li>
            <li class="page-item next">
                <button disabled={lastPage <= currentPage} onClick={() => setCurrentPage(currentPage + 1)} class="page-link btnIconC">
                    <VscChevronRight />
                </button>
            </li>
        </ul>
    );
}
export default Pagination;