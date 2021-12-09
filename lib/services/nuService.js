import xmlToJson from "../xml2json"

export const NuService = {
    baseUrl: "https://www.nu.nl/rss",

    doLoad(url) { // Base method for doing http Get requests
        if (!url.includes(this.baseUrl)) { url = this.baseUrl + url }

        // console.log(url)
        return fetch(url).then(response => {
            if (response.status === 404) { return '' }
            if (response.status === 200) { return response.text() }})
            .then(data => {
                // console.log(data)
                const channel = JSON.parse(xmlToJson(data)).rss.channel // Convert xml to json and return the channel
                channel.item = channel.item.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate)) // Sort items by date
                return channel
            })
    },

    getAlgemeen() {
        return this.doLoad('/Algemeen').then( data => {
            return data
        }).catch(e => {
            console.log(`Error retrieving Algemeen...`, e)
        })
    },

    getEconomie() {
        return this.doLoad('/Economie').then( data => {
            return data
        }).catch(e => {
            console.log(`Error retrieving Economie...`, e)
        })
    },

    getSport() {
        return this.doLoad('/Sport').then( data => {
            return data
        }).catch(e => {
            console.log(`Error retrieving Sport...`, e)
        })
    },

    getAchterklap() {
        return this.doLoad('/Achterklap').then( data => {
            return data
        }).catch(e => {
            console.log(`Error retrieving Achterklap...`, e)
        })
    },

    getOpmerkelijk() {
        return this.doLoad('/Opmerkelijk').then( data => {
            return data
        }).catch(e => {
            console.log(`Error retrieving Opmerkelijk...`, e)
        })
    },

    getMuziek() {
        return this.doLoad('/Muziek').then( data => {
            return data
        }).catch(e => {
            console.log(`Error retrieving Muziek...`, e)
        })
    },

    getFilm() {
        return this.doLoad('/Film').then( data => {
            return data
        }).catch(e => {
            console.log(`Error retrieving Film...`, e)
        })
    },

    getWetenschap() {
        return this.doLoad('/Wetenschap').then( data => {
            return data
        }).catch(e => {
            console.log(`Error retrieving Wetenschap...`, e)
        })
    },

    getTech() {
        return this.doLoad('/Tech').then( data => {
            return data
        }).catch(e => {
            console.log(`Error retrieving Tech...`, e)
        })
    },

    getGezondheid() {
        return this.doLoad('/Gezondheid').then( data => {
            return data
        }).catch(e => {
            console.log(`Error retrieving Gezondheid...`, e)
        })
    },

    getPodcast() {
        return this.doLoad('/Podcast').then( data => {
            return data
        }).catch(e => {
            console.log(`Error retrieving Podcast...`, e)
        })
    },


}
