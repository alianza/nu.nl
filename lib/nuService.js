import xmlToJson from "./xml2json"

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
                return JSON.parse(xmlToJson(data)).rss.channel
            })
    },

    getAlgemeen() {
        return this.doLoad('/Algemeen').then( async data => {
            return data
        }).catch(e => {
            console.log(`Error retrieving Algemeen...`, e)
        })
    },

    getEconomie() {
        return this.doLoad('/Economie').then( async data => {
            return data
        }).catch(e => {
            console.log(`Error retrieving Economie...`, e)
        })
    },
}
