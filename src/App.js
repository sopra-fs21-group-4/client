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
            updateLoop: new UpdateLoop(1000),
            eventSource: null,
        };
    }

    componentDidMount() {
        // this.subscribeSSE();

        // TODO delete later
        this.state.updateLoop.addClient(this);
        this.state.updateLoop.start();
    }

    update() {
        this.subscribeSSE();
    }

     subscribeSSE() {

        if (!User.isPresentInSessionStorage()) return;
        if (this.state.eventSource) return;

         // let eventSource = response.data;
         let eventSource = new EventSource(`http://localhost:8080/createEmitter/${User.getAttribute('userId')}`);

         this.setState({
            eventSource: eventSource,
         })

        eventSource.onopen = (event) => {
            console.log("sse connection opened")
        }

        // eventSource.onmessage = (event) => {
        //     console.log(event);
        //
        //     if (event.data.activationToken) console.log("test");
        //
        //
        //     const data = JSON.parse(localStorage.getItem('data'));
        //     let updated = {...data, ...event.data}
        //     localStorage.setItem('data', JSON.stringify(updated));
        // }

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

         eventSource.addEventListener("Update", (event) => {
             const updates = JSON.parse(event.data);
             const data = JSON.parse(localStorage.getItem('data'));
             localStorage.setItem('data', JSON.stringify({...data, ...updates}));
         })

        eventSource.onerror = (event) => {
            eventSource.close();
            console.log("sse connection closed")
            this.setState({eventSource: null});
            this.subscribeSSE();
        }

        // console.log(eventSource);

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
