import {withRouter} from 'react-router-dom';

const Category = e => {
    console.log('Category : props', e);
    return (
        <h1>Category logged in </h1>
    );
}
export default Category;