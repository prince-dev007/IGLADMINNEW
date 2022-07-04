import { getUser } from "../Context/Reducer";
// export const backendbaseURL = "https://iglapi.herokuapp.com/Admin/";
// export const backendbaseURL = "https://iglapistaging.herokuapp.com/admin/";
// export const backendbaseURL = "http://localhost:3000/Admin/";

// IGL API
// export const backendbaseURL = "http://43.204.104.42:3000/admin/";

// Local API
// export const backendbaseURL = "http://192.168.68.77:3000/admin/";

// Local ShivamVish API
export const backendbaseURL = "http://127.0.0.1:4000/admin/";

let abortController = null;
export const callAPI = async({ URL = "", method = "GET", body = "", bodyType = "RAW", abort = false }) => {
    try {
        // checking internet connection
        if (!navigator.onLine) {
            return {
                status: 500,
                message: "NO_INTERNET_CONNECTION",
            };
        }

        if (abort) {
            abortController && abortController.abort();
        }

        const options = {
            method: method,
        };

        // adding body
        if (body) {
            if (bodyType === "RAW"){
                options.headers = {
                    "Content-Type": "application/json",
                }
                options.body = JSON.stringify(body);
            } else if(bodyType === 'FORM_DATA') {
                // options.headers = {'Content-Type': 'multipart/form-data'};
                const formDataObj = new FormData();
                for(const key in body) {
                    formDataObj.append(key,body[key]);
                }

                for(var pair of formDataObj.entries()) {
                    console.log(pair[0]+ ', '+ pair[1]);
                }

                options.body = formDataObj;
            }
        }

        // adding auth token
        if (!URL.includes("auth")) {
            const user = getUser();
            if (!options.headers) options.headers = {};
            options.headers.authToken = user.authToken;
            options.headers.userId = user._id;
        }
        URL = backendbaseURL + URL;

        console.log("FETCH_OPTIONS : ", URL, options);

        // abort controller
        abortController = new AbortController();
        options.signal = abortController.signal;

        // fetching
        const response = await fetch(URL, options);

        // getting response
        console.log("FETCH_RESPONSE  : ", response);

        if (response.status !== 200) {
            console.log(await response.text());
            return {
                status: 500,
            };
        }
        const resJSON = parseJSON(await response.text());
        console.log("FETCH_RESULT : ", resJSON);
        return resJSON;
    } catch (err) {
        return errorHandler(err);
    }
};

const parseJSON = (text) => {
    try {
        return JSON.parse(text);
    } catch (err) {
        return {
            status: 500,
            data: text,
        };
    }
};

function errorHandler(err) {
    const errString = err.toString();
    if (errString === "AbortError: The user aborted a request.") {
        console.log("REQUEST_ABORTED");
        return {
            status: 0,
        };
    }
    if (!err.status) console.log("error : ", err);
    return {
        status: 500,
        message: "FETCH_SERVER_ERROR",
        error: err.toString(),
    };
}
export const fDate = (date) => {
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var defDate = new Date(date);
    const dateObj = {
        sec: defDate.getSeconds() / 10 < 1 ? "0" + defDate.getSeconds() : defDate.getSeconds(),
        min: defDate.getMinutes() / 10 < 1 ? "0" + defDate.getMinutes() : defDate.getMinutes(),
        hour: defDate.getHours() / 10 < 1 ? "0" + defDate.getHours() : defDate.getHours(),
        day: defDate.getDate() / 10 < 1 ? "0" + defDate.getDate() : defDate.getDate(),
        month: month[defDate.getMonth()],
        year: defDate.getFullYear(),
    };
    var newDate = `${dateObj.day} ${dateObj.month} ${dateObj.year} ${dateObj.hour}:${dateObj.min}:${dateObj.sec}`;
    return newDate;
};