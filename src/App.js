import React, {Component} from "react";
import AppRouter from "./components/shared/routers/AppRouter";
import UpdateLoop from "./components/shared/UpdateLoop";
import wallpaper from "./image/wallpaper/meme-collage-colorful.jpg"
import User from "./components/shared/models/User";
import {api, handleError} from "./helpers/api";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appUpdater: new UpdateLoop(this, 100),
            eventSource: null,
            initializingSse: false,
            lastConnectionTest: 0
        };
    }

    componentDidMount() {
        this.state.appUpdater.addClient(this);
        this.state.appUpdater.start();
    }

    componentWillUnmount() {
        this.state.appUpdater.removeClient(this);
    }

    update() {
        this.refreshSSE();
    }

    refreshSSE() {
        if (!User.isPresentInSessionStorage()) return;
        if (this.state.eventSource) {
            if (this.state.eventSource.readyState < 2) return;
            if (Date.now() - this.state.lastConnectionTest < 4000) return;
        }
        if (this.state.initializingSse) return;
        this.setState({
            initializingSse: true,
        })
        if (this.state.eventSource) this.state.eventSource.close();

        // let eventSource = response.data;
        let eventSource = new EventSource(`http://localhost:8080/createEmitter/${User.getAttribute('userId')}`);
        this.setState({
            eventSource: eventSource,
            initializingSse: false,
        })

        eventSource.onopen = (event) => {
            // console.log("sse connection opened")
        }

        eventSource.onerror = (event) => {
            // console.log("sse connection closed")
            this.setState({eventSource: null});
        }

        eventSource.addEventListener("ActivationRequest", (event) => {
            const emitterToken = event.data;
            try {
                // request setup
                const url = `/activateEmitter`;
                const config = { headers: User.getUserAuthentication() };
                api.put(url, emitterToken, config);
                console.log("sse activated");
            } catch (error) {
                alert(`Something went wrong while setting up sse: \n${handleError(error)}`);
            }
        });

        eventSource.addEventListener("ConnectionTest", (event) => {
            this.setState({
                lastConnectionTest: Date.now()
            })
        })

        eventSource.addEventListener("Update", (event) => {
            const data = JSON.parse(event.data);
            for (let key in data['observedEntities']) sessionStorage.setItem(key, JSON.stringify(data['observedEntities'][key]))
            if (data['lobbies']) sessionStorage.setItem('lobbies', JSON.stringify(data['lobbies']));
            console.log(event);
        })

    }

    render() {
        return (
            <div
                style={{
                    backgroundImage: `url(${wallpaper})`,
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    imageRendering: 'auto',
                    minHeight: '100vh',
                    // width: '100vw',

                }}>
                <AppRouter updateLoop={this.state.appUpdater}/>
            </div>
        );
    }
}

export default App;
