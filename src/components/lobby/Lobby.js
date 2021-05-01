import React from 'react';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import {HorizontalBox} from "../../views/design/Containers";
import User from "../shared/models/User";
import Form from "../general/Form";


class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            generalCollapsed: true,
            timersCollapsed: true,
            subreddit: this.props.game['subreddit'],
            memeType: this.props.game['memeType'],
            totalRounds: this.props.game['totalRounds'],
            maxSuggestSeconds:this.props.game['maxSuggestSeconds'],
            maxVoteSeconds:this.props.game['maxVoteSeconds'],
            maxAftermathSeconds: this.props.game['maxAftermathSeconds'],
            settingsUpdated: false,
        };
    }

    async componentDidMount() {
        this.props.updateLoop.addClient(this);
    }

    async componentWillUnmount() {
        this.props.updateLoop.removeClient(this);
    }

    async updateSettings() {
        try {

            // console.log("test")
            // const getPosts = () => {
            //     //if(!_.startsWith(window.location.protocol,"http"))
            //     return redditApi(`/api/info.json?jsonp&url=${window.location.href}`)
            //         .then((o)=>_.get(o, 'data.data.children', []).map(p=>p.data))
            // };
            // let test = await getPosts()
            // console.log(test)
            //
            //
            //
            // // Reddit API here, getting posts from subreddit
            // const redditUrl = `https://reddit.com/r/${this.state.subreddit}/${this.state.memeType.toLowerCase()}.json?sort=${this.state.memeType.toLowerCase()}&limit=100`
            // const data = await redditApi.get(redditUrl            )
            // // TODO error
            //
            // let children = data.data.data.children
            // // console.log(children)
            //
            // if(children.length < this.state.totalRounds){
            //     //todo error
            //     console.log("error, not enough memes")
            // }
            //
            // let urls = []
            // for(let child of children){
            //     if(child.data.url.includes(".jpg") || child.data.url.includes(".png") || child.data.url.includes(".gif")){ //
            //         urls.push(child.data.url)
            //     }
            // }
            //
            // // take the correct amount of memes
            // urls = urls.slice(0,this.state.totalRounds)
            // // console.log(urls)



            // request setup
            const url = `/games/${this.props.match.params['gameId']}/update`;
            const requestBody = JSON.stringify({
                subreddit: this.state.subreddit,
                memeType: this.state.memeType,
                totalRounds: this.state.totalRounds,
                maxSuggestSeconds: this.state.maxSuggestSeconds,
                maxVoteSeconds: this.state.maxVoteSeconds,
                maxAftermathSeconds: this.state.maxAftermathSeconds,
            });
            const config = {headers: User.getUserAuthentication()};

            // send request
            const response = await api.put(url, requestBody, config);
            console.log(response);

            this.setState({["settingsUpdated"]:true});

        } catch (error) {
            alert(`Something went wrong on updating the game settings: \n${handleError(error)}`);
        }
    }

    async sendReady() {
        try {

            // check for applied settings
            if(!this.state.settingsUpdated&&this.isGameMaster()&&!this.isReady()){
                alert("please apply settings first")
                return
            }

            // request setup
            const url = `/games/${this.props.match.params['gameId']}/ready`;
            const requestBody = this.isReady()? 'false' : 'true';
            const config = {headers: User.getUserAuthentication()};

            // send request
            const response = await api.put(url, requestBody, config);
            console.log(response);

        } catch (error) {
            alert(`Something went wrong while setting you ready: \n${handleError(error)}`);
        }
    }

    async leave() {
        try {
            // request setup
            const url = `/games/${this.props.match.params['gameId']}/leave`;
            const requestBody = "";
            const config = {headers: User.getUserAuthentication()};

            // send request
            const response = await api.put(url, requestBody, config);
            console.log(response);
            this.props.history.push('/')

        } catch (error) {
            alert(`Something went wrong while leaving the game: \n${handleError(error)}`);
        }
    }

    isGameMaster() {
        return User.getAttribute('userId') == this.props.game['gameMaster'];
    }

    isReady() {
        let playerState = this.props.game.playerStates[User.getAttribute('userId')];
        return playerState == 'READY' || playerState == 'GM_READY';
    }

    async update() {
        if(!this.isGameMaster()){
            // TODO update settings for all joined users when gamemaster updates them TEST
            this.setState({
                subreddit: this.props.game['subreddit'],
                memeType: this.props.game['memeType'],
                totalRounds: this.props.game['totalRounds'],
                maxSuggestSeconds:this.props.game['maxSuggestSeconds'],
                maxVoteSeconds:this.props.game['maxVoteSeconds'],
                maxAftermathSeconds: this.props.game['maxAftermathSeconds'],
            });
        }
    }

    render() {
        // TODO game settings: update visuals (and states?) in the frontend
        // TODO better proportions for UserList (maybe also absolute position?)
        // TODO gamemaster can ban players
        return (
            <HorizontalBox>
                <div>
                    {this.gameSettings()}

                </div>
                {/* ready button */}

            </HorizontalBox>
        );
    }

    handleInputChange(key, value) {
        this.setState({[key]: value})
        this.setState({["settingsUpdated"]:false})
    }

    gameSettings() {

        // const general = { label: 'General', key: 'general', type: 'Group' };

        const subreddit = { label: 'Subreddit', key: 'subreddit', type: 'Input',
            props:{defaultValue: this.props.game['subreddit'], disabled: !this.isGameMaster()} };

        const memeType = { label: 'Meme Type', key: 'memeType', type: 'Select',
            options: [
                {name:'Hot',value:'HOT'},
                {name:'New',value:'NEW'},
                {name:'Rising',value:'RISING'},
                {name:'Top',value:'TOP'}],
            props:{defaultValue: this.props.game['memeType'], disabled: !this.isGameMaster()} };

        const totalRounds = { label: 'Number of Rounds', key: 'totalRounds', type: 'Range',
            props:{ min:1, max:30, defaultValue: 5, disabled: !this.isGameMaster() } };

        const timers = { label: 'Timers', key: 'timers', type: 'Group' };

        const namingTime = { label: 'Naming Time', key: 'maxSuggestSeconds', type: 'Range', group: 'timers',
            props:{ min:10, max:60, disabled: !this.isGameMaster() } };

        const votingTime = { label: 'Voting Time', key: 'maxVoteSeconds', type: 'Range', group: 'timers',
            props:{ min:10, max:60, disabled: !this.isGameMaster() } };

        const resultsTime = { label: 'Results Time', key: 'maxAftermathSeconds', type: 'Range', group: 'timers',
            props:{ min:3, max:30, disabled: !this.isGameMaster() } };

        return <Form
            title='Game Settings'
            attributes={[subreddit, memeType, totalRounds, timers, namingTime, votingTime, resultsTime]}
            listener={this}
            initialState={{
                timersCollapsed: true,
                ...this.state}}
            submitButtonText={this.isReady()? "Hold on.." : "I'm ready"}
            onSubmit={() => this.sendReady()}
            cancelButtonText='Leave'
            onCancel={() => this.leave()}



            withApplyButton={true}
            settingsUpdated={this.state.settingsUpdated}
            isGamemaster={this.isGameMaster()}
            applyButtonText='apply settings'
            onApply={() => this.updateSettings()}

        />
    }

}

export default withRouter(Lobby);
