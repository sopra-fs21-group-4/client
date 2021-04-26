import React, { Component } from "react";
import AppRouter from "./components/shared/routers/AppRouter";
import UpdateLoop from "./components/shared/UpdateLoop";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 */
class App extends Component {
  constructor() {
    super();
    this.state = {
      updateLoop: new UpdateLoop(200),
    };
  }

  componentDidMount() {
    this.state.updateLoop.start();
  }

  render() {
    return (
      <AppRouter updateLoop={this.state.updateLoop} />
    );
  }
}

export default App;
