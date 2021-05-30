import React, {Component} from "react";
import AppRouter from "./components/shared/routers/AppRouter";
import UpdateLoop from "./components/shared/UpdateLoop";
import wallpaper from "./image/wallpaper/meme-collage-colorful.jpg"
import User from "./components/shared/data/User";
import {api, handleError} from "./helpers/api";
import Data from "./components/shared/data/Data";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateLoop: new UpdateLoop(this, 1000),
            eventSource: null,
            initializingSse: false,
            lastConnectionTest: 0,
            connectionTimeout: 0,
        };
    }

    componentDidMount() {
        this.initSSE()
        this.state.updateLoop.addClient(this);
        this.state.updateLoop.start();
    }

    componentWillUnmount() {
        this.state.updateLoop.removeClient(this);
    }

    update() {
        if (!this.state.eventSource) this.initSSE();
        else if (this.state.eventSource.readyState == 2) {
            console.log(this.state.eventSource);
            this.state.eventSource.close();
            this.setState({eventSource: null});
        }
    }

    initSSE() {
        if (!User.isPresentInSessionStorage() || this.state.eventSource) return;

        let eventSource = new EventSource(`http://localhost:8080/createEmitter/${User.getAttribute('userId')}`);
        this.setState({
            eventSource: eventSource,
        })

        eventSource.onopen = (event) => {
            // console.log("sse connection opened")
        }

        eventSource.onerror = (event) => {
            // console.log("sse error")
        }

        eventSource.addEventListener("ActivationRequest", (event) => {
            const emitterToken = event.data;
            try {
                // request setup
                const url = `/activateEmitter`;
                const config = { headers: User.getUserAuthentication() };
                api.put(url, emitterToken, config);
                console.log("sse activated");
                this.setState({initializingSse: false})
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
            for (let key in data['observedEntities']) Data.put(key, (data['observedEntities'][key]))
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
                <AppRouter updateLoop={this.state.updateLoop}/>
            </div>
        );
    }
}

export default App;
