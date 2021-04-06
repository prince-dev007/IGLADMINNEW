import {withRouter} from 'react-router-dom';

const Profile = e => {
    console.log('Profile : props', e);
    return (
        <h1>Profile logged in </h1>
    );
}
export default Profile;