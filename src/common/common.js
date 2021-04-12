export const backendbaseURL = 'https://iglapi.herokuapp.com/Admin/';

export const callAPI = async({ URL = '', method = 'GET', body = '', bodyType = 'raw' }) => {
    try {
        const options = {
            method: method
        }
        if (body) {
            options.body = bodyType === 'raw' ? JSON.stringify(body) : body;
            if (bodyType === 'raw')
                options.headers = {
                    'Content-Type': 'application/json'
                }
        }
        URL = backendbaseURL + URL;
        console.log('FETCH_OPTIONS : ', URL, options);
        const response = await fetch(URL, options);
        console.log('FETCH_RESPONSE  : ', response);
        if (response.status !== 200) {
            return {
                status: 500
            }
        }
        const resJSON = parseJSON(await response.text());
        console.log('FETCH_RESULT : ', resJSON);
        return resJSON;

    } catch (err) {
        return errorHandler(err);
    }
}



const parseJSON = text => {
    try {
        return JSON.parse(text);
    } catch (err) {
        return {
            status: 500,
            data: text
        }
    }
}

function errorHandler(err) {
    if (!err.status)
        console.log('error : ', err);
    return {
        status: 500,
        message: 'FETCH_SERVER_ERROR',
        error: err.toString()
    }
}
export const fDate = date => {
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var defDate = new Date(date);
    var newDate = defDate.getDate() + ' ' + month[defDate.getMonth()] + ' ' + defDate.getFullYear() + ' ' + defDate.getHours() + ':' + (defDate.getMinutes() / 10 < 1 ? '0' + defDate.getMinutes() : defDate.getMinutes()) + ':' + (defDate.getSeconds() / 10 < 1 ? '0' + defDate.getSeconds() : defDate.getSeconds());
    return newDate;
}