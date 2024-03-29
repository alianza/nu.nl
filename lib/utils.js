export const days = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"]
export const months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "October", "November", "December"]

export const formatDate = (dateToParse) => {
  const dt = new Date(dateToParse),
    date = dt.getDate(),
    month = months[dt.getMonth()],
    diffDays = new Date().getDate() - date,
    diffMonths = new Date().getMonth() - dt.getMonth(),
    diffYears = new Date().getFullYear() - dt.getFullYear()

  if (diffYears === 0 && diffDays === 0 && diffMonths === 0) { return "Vandaag" }
  else if (diffYears === 0 && diffDays === 1) { return "Gisteren" }
  else if (diffYears === 0 && diffMonths === 0 && (diffDays < -1 && diffDays > -7)) { return days[dt.getDay()] }
  else if (diffDays < 7 && diffYears === 0) { return `${date} ${month}` }
  else if (diffYears >= 1) { return `${date} ${month}, ${new Date(dateToParse).getFullYear()}` }
  else { return `${date} ${month}` }
}

export const formatTime = (dateToParse) => `${(`0${dateToParse.getHours()}`).slice(-2)}:${(`0${dateToParse.getMinutes()}`).slice(-2)}`

export const transformTitle = (title, lowerCase = false) => {
  const transformedTitle = title.replace('NU - ', '')
  return lowerCase ? transformedTitle.toLowerCase() : transformedTitle
}

export const smoothScroll = () => {
  window.document.documentElement.style.scrollBehavior = 'smooth'
  setTimeout(() => window.document.documentElement.style.scrollBehavior = 'auto', 100)
}
