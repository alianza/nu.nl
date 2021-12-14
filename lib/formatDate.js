const days = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"]
const months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "October", "November", "December"]

export function formatDate(dateToParse) {
    const dt = new Date(dateToParse),
        date = dt.getDate(),
        month = months[dt.getMonth()],
        diffDays = new Date().getDate() - date,
        diffMonths = new Date().getMonth() - dt.getMonth(),
        diffYears = new Date().getFullYear() - dt.getFullYear()

    console.log(diffDays)
    console.log(diffMonths)
    console.log(diffYears)

    if (diffYears === 0 && diffDays === 0 && diffMonths === 0) { return "Vandaag" }
    else if (diffYears === 0 && diffDays === 1) { return "Gisteren" }
    else if (diffYears === 0 && diffMonths === 0 && (diffDays < -1 && diffDays > -7)) { return days[dt.getDay()] }
    else if (diffDays < 7 && diffYears === 0) { return `${date} ${month}` }
    else if (diffYears >= 1) { return `${date} ${month}, ${new Date(dateToParse).getFullYear()}` }
    else { return `${date} ${month}` }
}