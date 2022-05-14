const dateGenerator = {
	dateTime: fTimestamp, // mysql timestamp
	fDateTIme: fDate, //with month name in words
	currentTimestamp: timeStamp, //with just numbers only
	date: getDate, // date only no time. (mysql date)
	time: getTime,
	rawDate: dateObj,
};

function getDate(date = new Date()) {
	const rawDate = dateObj(date);
	const dateStr = rawDate.year + "-" + rawDate.month + "-" + rawDate.day;
	return dateStr;
}

function getTime(time = new Date()) {
	const rawDate = dateObj(time);
	const timeStr = rawDate.hours + ":" + rawDate.mins + ":" + rawDate.secs;
	return timeStr;
}

function timeStamp() {
	return rawTimeStamp(new Date(), "str");
}

function fTimestamp(dateTime = new Date()) {
	return rawTimeStamp(dateTime);
}

function fDate(date = new Date()) {
	var monthArr = ["index0", "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const dateObject = dateObj(date);
	dateObject.month = monthArr[Number(dateObject.month)];
	var newDate = dateObject.day + " " + dateObject.month + " " + dateObject.year + " " + dateObject.hours + ":" + dateObject.mins + ":" + dateObject.secs;
	return newDate;
}

function rawTimeStamp(dateTime = new Date(), type = "") {
	const dateObject = dateObj(dateTime);
	if (!type) return dateObject.year + "-" + dateObject.month + "-" + dateObject.day + " " + dateObject.hours + ":" + dateObject.mins + ":" + dateObject.secs;
	else return dateObject.year + "" + dateObject.month + "" + dateObject.day + "" + dateObject.hours + "" + dateObject.mins + "" + dateObject.secs + "" + dateObject.miliSecs;
}

function dateObj(dateTime = new Date()) {
	const defaultDateTime = new Date(dateTime);
	const year = defaultDateTime.getFullYear();
	let month = defaultDateTime.getMonth() + 1;
	month = month / 10 < 1 ? "0" + month : month;
	console.log(month)
	const weekDay = defaultDateTime.getDay();
	let day = defaultDateTime.getDate();
	day = day / 10 < 1 ? "0" + day : day;
	let hrs = defaultDateTime.getHours();
	hrs = hrs / 10 < 1 ? "0" + hrs : hrs;
	let mins = defaultDateTime.getMinutes();
	mins = mins / 10 < 1 ? "0" + mins : mins;
	let secs = defaultDateTime.getSeconds();
	secs = secs / 10 < 1 ? "0" + secs : secs;
	let miliSecs = defaultDateTime.getMilliseconds();
	miliSecs = miliSecs / 10 < 1 ? "00" + miliSecs : miliSecs / 100 < 1 ? "0" + miliSecs : miliSecs;
	return {
		year: year,
		month: month,
		day: day,
		weekDay: weekDay,
		hours: hrs,
		mins: mins,
		secs: secs,
		miliSecs: miliSecs,
	};
}

export default dateGenerator;