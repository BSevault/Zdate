<<<<<<< HEAD:script/script.js
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

    const yearsString = years === 1 ? `${years} ${yearsArray[0]} ` : years > 1 ? `${years} ${yearsArray[1]} ` : '';

    const weeksString = weeks === 1 ? `${weeks} ${weeksArray[0]} ` : weeks > 1 ? `${weeks} ${weeksArray[1]} ` : '';

    const daysString = days === 1 ? `${days} ${daysArray[0]} ` : days > 1 ? `${days} ${daysArray[1]} ` : '';

    const hoursString = hours === 1 ? `${hours} ${hoursArray[0]} ` : hours > 1 ? `${hours} ${hoursArray[1]} ` : '';

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
=======
function calculateDuration(e,t){const n=e.diff(t,["years","months","weeks","days","hours","minutes","seconds"]).values;return n.seconds=Math.round(n.seconds),n}function generateDurationString(e){const{years:t,months:n,weeks:o,days:s,hours:i,minutes:a,seconds:r}=e,u=["an","ans"],m=["semaine","semaines"],$=["jour","jours"],c=["heure","heures"],l=1===t?`${t} ${u[0]} `:t>1?`${t} ${u[1]} `:"",g=1===o?`${o} ${m[0]} `:o>1?`${o} ${m[1]} `:"",d=1===s?`${s} ${$[0]} `:s>1?`${s} ${$[1]} `:"",D=1===i?`${i} ${c[0]} `:i>1?`${i} ${c[1]} `:"",T=`${l}${n} mois ${g}${d}${D}${a} minutes ${r} secondes`;return T}function setElementText(e,t){const n=document.getElementById(t);n.textContent=e}const originDateTime=localStorage.getItem("originDateTime");originDateTime||localStorage.setItem("originDateTime",luxon.DateTime.fromISO("2023-07-17T00:04:00.000+02:00")),setInterval(()=>{const e=calculateDuration(luxon.DateTime.now(),luxon.DateTime.fromISO(originDateTime)),t=generateDurationString(e);setElementText(t,"elapsedTime")},1e3);
>>>>>>> ae9167e7ef35a4be20206eb161653cc958ef7044:script.js
