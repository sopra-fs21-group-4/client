import React, { Component } from "react";
import AppRouter from "./components/shared/routers/AppRouter";
import UpdateLoop from "./components/shared/UpdateLoop";
import wallpaper from "./image/wallpaper/meme-collage-mono-light.jpg"

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
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            imageRendering: 'auto',
          height: '100vh',
          width: '100vw',
        }}>
          <AppRouter updateLoop={this.state.updateLoop} />
        </div>
    );
  }
}

export default App;
