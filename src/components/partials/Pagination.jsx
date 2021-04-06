import  {VscChevronLeft} from 'react-icons/vsc';
import  {VscChevronRight} from 'react-icons/vsc';
const Pagination = ({className = null}) => {
    return (
        <ul class={className ? "pagination " + className : "pagination"}>
            <li class="page-item">
                <button class="page-link btnIconC">
                    <VscChevronLeft />
                </button>
            </li>
            <li class="page-item">
                <span class="page-link d-flex align-items-center" style={{height:'38px',minWidth:'120px' }}>1 - 50 of 1500</span>
            </li>
            <li class="page-item next">
                <button class="page-link btnIconC">
                    <VscChevronRight />
                </button>
            </li>
        </ul>
    );
}
export default Pagination;