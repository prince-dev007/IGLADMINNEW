import { getIsLoggedIn, getUser } from "./Auth";
export const backendbaseURL = "https://iglapi.herokuapp.com/Admin/";
// export const backendbaseURL = "https://iglapistaging.herokuapp.com/";
// export const backendbaseURL = "http://localhost:3000/Admin/";

let abortController = null;
export const callAPI = async({ URL = "", method = "GET", body = "", bodyType = "raw", abort = false }) => {
    try {
        // checking internet connection
        if (!navigator.onLine) {
            return {
                status: 500,
                message: "NO_INTERNET_CONNECTION",
            };
        }

        window.$("#pageSpinner").show();
        if (abort) {
            abortController && abortController.abort();
        }

        const options = {
            method: method,
        };

        // adding body
        if (body) {
            options.body = bodyType === "raw" ? JSON.stringify(body) : body;
            if (bodyType === "raw")
                options.headers = {
                    "Content-Type": "application/json",
                };
        }

        // adding auth token
        if (!URL.includes("auth") && getIsLoggedIn()) {
            if (!options.headers) options.headers = {};
            options.headers.authToken = getUser("authToken");
            options.headers.userId = getUser("_id");
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
        window.$("#pageSpinner").hide();

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
    var newDate = `${dateObj.hour}:${dateObj.min}:${dateObj.sec} - ${dateObj.day} ${dateObj.month} ${dateObj.year}`;
    return newDate;
};