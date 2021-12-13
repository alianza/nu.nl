const days = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"]
const months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "October", "November", "December"]

export function formatDate(dateToParse) {
    const dt = new Date(dateToParse),
        date = dt.getDate(),
        month = months[dt.getMonth()],
        timeDiff = dateToParse - Date.now(),
        diffDays = new Date().getDate() - date,
        diffMonths = new Date().getMonth() - dt.getMonth(),
        diffYears = new Date().getFullYear() - dt.getFullYear()

    if (diffYears === 0 && diffDays === 0 && diffMonths === 0) { return "Vandaag" }
    else if (diffYears === 0 && diffDays === 1) { return "Gisteren" }
    else if (diffYears === 0 && (diffDays < -1 && diffDays > -7)) { return days[dt.getDay()] }
    else if (diffYears >= 1) { return `${date} ${month}, ${new Date(dateToParse).getFullYear()}` }
    else if (diffDays < 7) { return `${days[dt.getDay()]} ${date} ${month}` }
    else { return `${date} ${month}` }
}
