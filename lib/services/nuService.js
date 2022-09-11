import xmlToJson from "../xml2json"

export const NuService = {
    baseUrl: "https://www.nu.nl/rss",

    async doLoad(url) { // Base method for doing http Get requests
        if (!url.includes(this.baseUrl)) { url = this.baseUrl + url}

        const response = await fetch(url)
        if (response.status !== 200) { return '' }
        const data = await response.text()

        const channel = JSON.parse(xmlToJson(data)).rss.channel // Convert xml to json and return the channel
        channel.item = channel.item.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate)) // Sort items by date
        channel.item.forEach(item => {
            if (item.description?.toString().includes("<a")) { // If the item contains a link
                item.description = item.description.replace('<a href=', '<a target="_blank" rel="noreferrer" href=')
            }
        })
        return channel
    },

    async getAllChannels() {
        return [
            await this.getVoorpagina('4'),
            await this.getAlgemeen('4'),
            await this.getOpmerkelijk('4'),
            await this.getWetenschap('4'),
            await this.getGezondheid('4'),
            await this.getTech('4'),
            await this.getSport('4'),
            await this.getEconomie('4'),
            await this.getFilm('4'),
            await this.getMuziek('4'),
            await this.getAchterklap('4'),
            await this.getPodcast('4')
        ]
    },

    getVoorpagina(length) {
        return this.doLoad('').then( data => {
            if (length) { data.item = data.item.slice(0, length) }
            data.title = 'NU - Voorpagina'
            data.link = 'https://www.nu.nl/voorpagina'
            return data
        }).catch(e => console.log(`Error retrieving Algemeen...`, e))
    },

    getAlgemeen(length) {
        return this.doLoad('/Algemeen').then( data => {
            if (length) { data.item = data.item.slice(0, length) }
            return data
        }).catch(e => console.log(`Error retrieving Anders...`, e))
    },

    getEconomie(length) {
        return this.doLoad('/Economie').then( data => {
            if (length) { data.item = data.item.slice(0, length) }
            return data
        }).catch(e => console.log(`Error retrieving Economie...`, e))
    },

    getSport(length) {
        return this.doLoad('/Sport').then( data => {
            if (length) { data.item = data.item.slice(0, length) }
            return data
        }).catch(e => console.log(`Error retrieving Sport...`, e))
    },

    getAchterklap(length) {
        return this.doLoad('/Achterklap').then( data => {
            if (length) { data.item = data.item.slice(0, length) }
            return data
        }).catch(e => console.log(`Error retrieving Achterklap...`, e))
    },

    getOpmerkelijk(length) {
        return this.doLoad('/Opmerkelijk').then( data => {
            if (length) { data.item = data.item.slice(0, length) }
            return data
        }).catch(e => console.log(`Error retrieving Opmerkelijk...`, e))
    },

    getMuziek(length) {
        return this.doLoad('/Muziek').then( data => {
            if (length) { data.item = data.item.slice(0, length) }
            return data
        }).catch(e => console.log(`Error retrieving Muziek...`, e))
    },

    getFilm(length) {
        return this.doLoad('/Film').then( data => {
            if (length) { data.item = data.item.slice(0, length) }
            return data
        }).catch(e => console.log(`Error retrieving Film...`, e))
    },

    getWetenschap(length) {
        return this.doLoad('/Wetenschap').then( data => {
            if (length) { data.item = data.item.slice(0, length) }
            return data
        }).catch(e => console.log(`Error retrieving Wetenschap...`, e))
    },

    getTech(length) {
        return this.doLoad('/Tech').then( data => {
            if (length) { data.item = data.item.slice(0, length) }
            return data
        }).catch(e => console.log(`Error retrieving Tech...`, e))
    },

    getGezondheid(length) {
        return this.doLoad('/Gezondheid').then( data => {
            if (length) { data.item = data.item.slice(0, length) }
            return data
        }).catch(e => console.log(`Error retrieving Gezondheid...`, e))
    },

    getPodcast(length) {
        return this.doLoad('/Podcast').then( data => {
            if (length) { data.item = data.item.slice(0, length) }
            return data
        }).catch(e => console.log(`Error retrieving Podcast...`, e))
    },
}
