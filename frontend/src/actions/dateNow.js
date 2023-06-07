import moment from "moment-timezone"

export const dateNow = (date) => {
    const now = moment().tz("America/Sao_Paulo")
    const utcDate = moment.utc(date)
    const createdAt = utcDate.tz('America/Sao_Paulo')
    const diff = moment.duration(now.diff(createdAt))
    const minutesAgo = diff.asMinutes()
    const roundedMinutesAgo = Math.round(minutesAgo)
    if (roundedMinutesAgo === 0) {
        return 'Postado agora'
    }
    if (roundedMinutesAgo >= 1440) {
        return `Postado há ${Math.round(roundedMinutesAgo / 1440)} dias atrás`
    }
    if (roundedMinutesAgo >= 60) {
        return `Postado há ${Math.round(roundedMinutesAgo / 60)} horas atrás`
    }
    return `Postado há ${roundedMinutesAgo} minutos atrás`
}