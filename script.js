
const { DateTime } = luxon

const originDateTime = localStorage.getItem('originDateTime');

function calculateDuration(date1, date2) {
    const diff = date1.diff(date2, ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']).values;
    diff.seconds = Math.trunc(diff.seconds);
    return diff;
}

function calculateWeekDuration(date1, date2) {
    const diff = date1.diff(date2, ['weeks', 'days']).values;
    diff.days = Math.trunc(diff.days);
    return diff;
}

function generateDurationString(durationObject, weekDate) {
    const { years, months, weeks, days, hours, minutes } = durationObject;

    const yearsArray = ["an", "ans"];
    const weeksArray = ["semaine", "semaines"];
    const daysArray = ["jour", "jours"];
    const hoursArray = ["heure", "heures"];

    const yearsString = years === 1 ? `${years} ${yearsArray[0]} ` : years > 1 ? `${years} ${yearsArray[1]} ` : '';

    const monthsString = months == null || months == 0 ? '' : `${months} mois `;

    const weeksString = weeks === 1 ? `${weeks} ${weeksArray[0]} ` : weeks > 1 ? `${weeks} ${weeksArray[1]} ` : '';

    const daysString = days === 1 ? `${days} ${daysArray[0]} ` : days > 1 ? `${days} ${daysArray[1]} ` : '';

    const hoursString = hours === 1 ? `${hours} ${hoursArray[0]} ` : hours > 1 ? `${hours} ${hoursArray[1]} ` : '';

    const minutesString = minutes == null ? '' : `${minutes} minutes `;

    const string = `${yearsString}${monthsString}${weeksString}${daysString}${hoursString}${minutesString}`;

    const durationString = !weekDate ? string : 'ou ' + string;

    return durationString;
}

function setElementText(string, elementID) {
    const element = document.getElementById(elementID);
    element.textContent = string;
}

if (!originDateTime) {
    localStorage.setItem('originDateTime', DateTime.fromISO("2023-07-17T00:04:00"));
}

function updateText(date1, date2) {
    const duration = calculateDuration(date1, date2);
    const string = generateDurationString(duration);
    setElementText(string, 'elapsedTime');
    return duration.seconds;
}

const durationSeconds = updateText(DateTime.now(), DateTime.fromISO(originDateTime));
setElementText(durationSeconds + ' secondes', 'seconds')

let seconds = durationSeconds;

// Refresh every second
setInterval(() => {
    setElementText(seconds + ' secondes', 'seconds')
    seconds++;
    if (seconds > 60) {
        setElementText(0 + ' secondes', 'seconds')
        updateText(DateTime.now(), DateTime.fromISO(originDateTime));
        seconds = 0;
    }
}, 1000);

let weeks = calculateWeekDuration(DateTime.now(), DateTime.fromISO(originDateTime));
let weeksString = generateDurationString(weeks, true);
setElementText(weeksString, "weeksTime");
