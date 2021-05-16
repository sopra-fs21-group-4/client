import React, {Component} from "react";
import AppRouter from "./components/shared/routers/AppRouter";
import UpdateLoop from "./components/shared/UpdateLoop";
import wallpaper from "./image/wallpaper/meme-collage-colorful.jpg"

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 */
class App extends Component {
    constructor() {
        super();
        this.state = {
            updateLoop: new UpdateLoop(1000),
        };
    }

    componentDidMount() {
        this.state.updateLoop.start();
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
