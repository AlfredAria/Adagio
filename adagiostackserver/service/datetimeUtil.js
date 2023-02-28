// Prints the current server date time in YYYY-MM-DD HH:MM:SS format
// at the time of function call.
module.exports.isoDateTime = () => {
    return dateToIsoDateTime(new Date());
}

function padZeroToTwoDigits(num) {
    return (`0${num}`).slice(-2);
}

function dateToIsoDateTime(dateObject) {
    // current date
    // adjust 0 before single digit date
    const date = padZeroToTwoDigits(dateObject.getDate());
    
    // current month
    const month = padZeroToTwoDigits(dateObject.getMonth() + 1);
    
    // current year
    const year = dateObject.getFullYear();
    
    // current hours
    const hours = padZeroToTwoDigits(dateObject.getHours());
    
    // current minutes
    const minutes = padZeroToTwoDigits(dateObject.getMinutes());
    
    // current seconds
    const seconds = padZeroToTwoDigits(dateObject.getSeconds());

    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}

module.exports.dateToIsoDateTime = dateToIsoDateTime;

function timestampToIsoDateTime(timestamp) {
    return dateToIsoDateTime(new Date(timestamp));
}

module.exports.timestampToIsoDateTime = timestampToIsoDateTime;