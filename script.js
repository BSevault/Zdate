const { DateTime } = luxon;

const children = [
    {
        name: "Zoé",
        birthDate: "2023-07-17T00:04:00",
        gender: "F"
    },
    {
        name: "Sacha",
        birthDate: "2026-07-25T04:40:00",
        gender: "M"
    }
];

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
    const monthsString = months == null || months === 0 ? '' : `${months} mois `;
    const weeksString = weeks === 1 ? `${weeks} ${weeksArray[0]} ` : weeks > 1 ? `${weeks} ${weeksArray[1]} ` : '';
    const daysString = days === 1 ? `${days} ${daysArray[0]} ` : days > 1 ? `${days} ${daysArray[1]} ` : '';
    const hoursString = hours === 1 ? `${hours} ${hoursArray[0]} ` : hours > 1 ? `${hours} ${hoursArray[1]} ` : '';
    const minutesString = minutes == null ? '' : `${minutes} minutes `;

    const string = `${yearsString}${monthsString}${weeksString}${daysString}${hoursString}${minutesString}`;
    return !weekDate ? string : 'ou ' + string;
}

// Initialisation et création de la structure HTML pour chaque enfant
const container = document.getElementById('children-container');

const childData = children.map((child, index) => {
    const birth = DateTime.fromISO(child.birthDate);

    // Création des éléments HTML
    const wrapper = document.createElement('div');
    wrapper.classList.add('child-block');
    if (index > 0) wrapper.style.marginTop = "40px"; // Espacement entre les enfants

    const h1 = document.createElement('h1');
    h1.textContent = `${child.name} est ${child.gender === "F" ? "née" : "né"} le ${birth.toFormat('dd/MM/yyyy à HH:mm')} , soit il y a :`;

    const timeDiv1 = document.createElement('div');
    timeDiv1.classList.add('time');
    const elapsedSpan = document.createElement('span');
    const secondsSpan = document.createElement('span');
    secondsSpan.id = `seconds-${index}`;
    elapsedSpan.id = `elapsedTime-${index}`;
    timeDiv1.appendChild(elapsedSpan);
    timeDiv1.appendChild(secondsSpan);

    const timeDiv2 = document.createElement('div');
    timeDiv2.classList.add('time');
    timeDiv2.id = `weeksTime-${index}`;

    wrapper.appendChild(h1);
    wrapper.appendChild(timeDiv1);
    wrapper.appendChild(timeDiv2);
    container.appendChild(wrapper);

    // Calcul initial
    const now = DateTime.now();
    const duration = calculateDuration(now, birth);
    elapsedSpan.textContent = generateDurationString(duration);

    let currentSeconds = duration.seconds;
    secondsSpan.textContent = currentSeconds + ' secondes';

    const weeks = calculateWeekDuration(now, birth);
    timeDiv2.textContent = generateDurationString(weeks, true);

    return {
        birth,
        elapsedSpan,
        secondsSpan,
        timeDiv2,
        seconds: currentSeconds
    };
});

// Mise à jour chaque seconde pour tous les enfants
setInterval(() => {
    const now = DateTime.now();
    childData.forEach((data, index) => {
        data.seconds++;
        data.secondsSpan.textContent = data.seconds + ' secondes';

        if (data.seconds > 60) {
            data.secondsSpan.textContent = '0 secondes';
            const duration = calculateDuration(now, data.birth);
            data.elapsedSpan.textContent = generateDurationString(duration);

            const weeks = calculateWeekDuration(now, data.birth);
            data.timeDiv2.textContent = generateDurationString(weeks, true);

            data.seconds = 0;
        }
    });
}, 1000);