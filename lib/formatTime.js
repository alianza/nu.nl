export const formatTime = (dateToParse) => {
    return `${(`0${dateToParse.getHours()}`).slice(-2)}:${(`0${dateToParse.getMinutes()}`).slice(-2)}`
}