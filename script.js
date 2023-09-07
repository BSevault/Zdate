const originDateTime = localStorage.getItem('originDateTime');

function calculateDuration(date1, date2) {
    const diff = date1.diff(date2, ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']).values;
    diff.seconds = Math.round(diff.seconds);
    return diff;
}

function generateDurationString(durationObject) {
    const { years, months, weeks, days, hours, minutes, seconds } = durationObject;

    const yearsArray = ["an", "ans"];
    const weeksArray = ["semaine", "semaines"];
    const daysArray = ["jour", "jours"];
    const hoursArray = ["heure", "heures"];

    const yearsString = years === 1 ? `${years} ${yearsArray[0]} ` :
        years > 1 ? `${years} ${yearsArray[1]} ` : '';

    const weeksString = weeks === 1 ? `${weeks} ${weeksArray[0]} ` :
        weeks > 1 ? `${weeks} ${weeksArray[1]} ` : '';

    const daysString = days === 1 ? `${days} ${daysArray[0]} ` :
        days > 1 ? `${days} ${daysArray[1]} ` : '';

    const hoursString = hours === 1 ? `${hours} ${hoursArray[0]} ` :
        hours > 1 ? `${hours} ${hoursArray[1]} ` : '';

    const durationString = `${yearsString}${months} mois ${weeksString}${daysString}${hoursString}${minutes} minutes ${seconds} secondes`;

    return durationString;
}

function setElementText(string, elementID) {
    const element = document.getElementById(elementID);
    element.textContent = string;
}

if (!originDateTime) {
    localStorage.setItem('originDateTime', luxon.DateTime.fromISO("2023-07-17T00:04:00"));
}

// Refresh every second
setInterval(() => {
    const duration = calculateDuration(luxon.DateTime.now().setLocale('fr'), luxon.DateTime.fromISO(originDateTime));
    const string = generateDurationString(duration);
    setElementText(string, "elapsedTime");
}, 1000);