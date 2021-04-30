/**
 * this file will be called by the LobbyMaster and send the memes to the server according to the predefined lobby specs
 *  
 */

/**             userAgent: global.navigator.userAgent,
            clientId: "0Fr36RPWNt-F3g",
            clientSecret: "hWLk6igtgRKUxN5S7AzKZNbRcRotUQ",
            endpointDomain: "reddit.com",
*/
import React from 'react';
import { withRouter } from 'react-router-dom';

class getMemes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            REDDIT_ACCESS_TOKEN_URL: 'https://www.reddit.com/api/v1/access_token',
            APP_ONLY_GRANT_TYPE: 'https://oauth.reddit.com/grants/installed_client',
            REDDIT_CLIENT_ID: "0Fr36RPWNt-F3g",
            accessToken: null,
        };
    }


    /**
     * Authenicates and calls fetch
     * @param {*} subbredit  DEFAULT r/memes
     * @param {*} param DEFAULT rising
     * @param {*} amount DEFAULT 100
     */
    async getMemes(subredit = "memes", param = "rising", amount = 100) {
        console.log("Please just work  ");
        try {
            // Creating Body for the POST request which are URL encoded
            const params = new URLSearchParams()
            params.append('grant_type', 'APP_ONLY_GRANT_TYPE')
            params.append('device_id', 'DO_NOT_TRACK_THIS_DEVICE')

            // Trigger POST to get the access token
            const tokenData = await fetch(this.REDDIT_ACCESS_TOKEN_URL, {
                method: 'POST',
                body: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${Buffer.from(`${this.REDDIT_CLIENT_ID}:`).toString('base64')}` // Put password as empty
                }
            }).then(res => res.json())

            console.log(tokenData);

            if (!tokenData.error) {
                // Fetch Reddit data by passing in the access_token
                const url = `https://oauth.reddit.com/r/${subredit}/${param}`
                const trendData = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`
                    }
                })

                // Finding just the link of the post
                console.log(trendData);
                return trendData;
            }

        } catch (error) {
            console.log(error)
        }
    }
}
export default withRouter(getMemes);