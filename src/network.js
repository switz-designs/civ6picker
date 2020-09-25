const axios = require('axios');


export function getAllLeaders(setUserDataCallback, getRandomLeaderCallback, setErrorCallback,
                              setUsingUserDataCallback, setFetchingDataCallback) {
    // const url = "http://localhost:5000/getall";
    const url = "https://civ6pickerapi.herokuapp.com/getall";
    console.log("Fetching achievements for all leaders...");
    setFetchingDataCallback(true);
    axios.get(url, { timeout: 15000 })
        .then((response) => {
            setUserDataCallback(response.data);
            getRandomLeaderCallback(response.data);
            setUsingUserDataCallback(false)
        })
        .catch((error) => {
            handleError(error, setErrorCallback)
        })
        .then(() => {
            setFetchingDataCallback(false)
        })
}

export function getUserLeaders(steamId, setUserDataCallback, getRandomLeaderCallback, setErrorCallback,
                               setUsingUserDataCallback, setFetchingDataCallback) {
    // const url_root = "http://localhost:5000/getuserall/";
    const url_root = "https://civ6pickerapi.herokuapp.com/getuserall/";
    console.log("Fetching data for Steam ID " + steamId);
    let url = url_root + steamId.toString();
    setFetchingDataCallback(true);
    axios.get(url, { timeout: 15000 })
        .then((response) => {
            setUserDataCallback(response.data);
            getRandomLeaderCallback(response.data);
            setUsingUserDataCallback(true)
        })
        .catch((error) => {
            handleError(error, setErrorCallback)
        })
        .then(() => {
            setFetchingDataCallback(false)
        })
}

function handleError(error, setErrorCallback) {
    let errorText;
    console.log(error);
    if (error.code === "ECONNABORTED") {
        errorText = "Could not connect to server";
    }
    else if (error.response) {
        errorText = error.response.data;
    }
    else {
        errorText = "Unknown error";
    }
    console.log("Request failed: " + errorText);
    setErrorCallback({
        error: true,
        errorText: errorText
    });
}


// Obsolete code for server-side random logic

// export function getLeaderByUser(steamId, setUserDataCallback, setErrorCallback) {
//     const url_root = "http://localhost:5000/getuserrandom/";
//     // console.log("Fetching data for Steam ID " + steamId);
//     let url = url_root + steamId.toString();
//     axios.get(url)
//         .then((response) => {
//             console.log("Request succeeded!");
//             // console.log(response);
//             setUserDataCallback(response.data)
//         })
//         .catch((error) => {
//             console.log("Request failed: " + error.response.data);
//             setErrorCallback({
//                 error: true,
//                 errorText: error.response.data
//             })
//         })
// }
//
// export function getLeader(setUserDataCallback, setErrorCallback) {
//     const url = "http://localhost:5000/getrandom";
//     // console.log("Fetching achievements for random leader...");
//     axios.get(url)
//         .then((response) => {
//             setUserDataCallback(response.data)
//         })
//         .catch((error) => {
//             console.log("Request failed: " + error.response.data);
//             setErrorCallback({
//                 error: true,
//                 errorText: error.response.data
//             })
//         })
// }