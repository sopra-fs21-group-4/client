import React, { Component } from "react";
import Header from "./views/header/Header";
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
      updateLoop: new UpdateLoop(100),
    };
  }

  componentDidMount() {
    this.state.updateLoop.start();
  }

  render() {
    return (
      <div>
        <AppRouter updateLoop={this.state.updateLoop} />
      </div>
    );
  }
}

export default App;
