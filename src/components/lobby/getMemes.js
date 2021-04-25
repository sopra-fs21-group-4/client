/**
 * this file will be called by the LobbyMaster and send the memes to the server according to the predefined lobby specs
 *  
 */

/**             userAgent: global.navigator.userAgent,
            clientId: "0Fr36RPWNt-F3g",
            clientSecret: "hWLk6igtgRKUxN5S7AzKZNbRcRotUQ",
            endpointDomain: "reddit.com",
*/

var express = require('express')
const { URLSearchParams } = require('url')
var router = express.Router()
const fetch = require('node-fetch')

const REDDIT_ACCESS_TOKEN_URL = 'https://www.reddit.com/api/v1/access_token'
const APP_ONLY_GRANT_TYPE = 'https://oauth.reddit.com/grants/installed_client'

const fetchRedditTrendingData = (sub, param, accessToken) =>
    fetch(`https://oauth.reddit.com/r/${sub}/${param}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(data => data.json())

    /**
     * Authenicates and fetches the memes
     * @param {*} subbredit  DEFAULT r/memes
     * @param {*} param DEFAULT rising
     * @param {*} amount DEFAULT 100
     * @param {*} res no fucking clue what the fuck this is but idc pr
     */
export const getMemes = (subbredit = "memes", param = "rising", amount = 100) =>{
    const REDDIT_CLIENT_ID = "0Fr36RPWNt-F3g"

    try {
        // Creating Body for the POST request which are URL encoded
        const params = new URLSearchParams()
        params.append('grant_type', APP_ONLY_GRANT_TYPE)
        params.append('device_id', 'DO_NOT_TRACK_THIS_DEVICE')

        // Trigger POST to get the access token
        const tokenData = await fetch(REDDIT_ACCESS_TOKEN_URL, {
            method: 'POST',
            body: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${REDDIT_CLIENT_ID}:`).toString('base64')}` // Put password as empty
            }
        }).then(res => res.json())

        if (!tokenData.error) {
            // Fetch Reddit data by passing in the access_token
            const trendData = await fetchRedditTrendingData(subbredit, param, tokenData.access_token)

            // Finding just the title of the post
            const trendingResult = trendData.data.children.map(
                child => child.data.title
            )

            return trendingResult;
        }
    
    } catch (error) {
        console.log(error)
    }
}
