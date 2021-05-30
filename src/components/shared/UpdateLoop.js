class UpdateLoop {
    constructor(interval) {
        this.state = {
            interval: 100, // (interval? interval : 100),
            clients: [],
            running: false,
        }
    }

    /**
     * starts the update loop
     * @returns {Promise<void>}
     */
    async start() {
        if (this.state.running) return;
        this.state.running = true;
        while (this.state.running) {
            this.runUpdate();
            await new Promise(resolve => setTimeout(resolve, this.state.interval));
        }
    }

    /**
     * stops the update loop
     */
    stop() {
        this.state.running = false;
    }

    /**
     * runs update() on all the clients
     */
    runUpdate() {
        this.state.clients.forEach((c) => {if (c.update) c.update()})
    }

    /**
     * adds a client to the update list
     * @param client must implement update()
     */
    addClient(client) {
        this.state.clients.push(client);
    }


    /**
     * removes a client from the update list
     * @param client
     */
    removeClient(client) {
        let index = this.state.clients.indexOf(client);
        this.state.clients.splice(index, 1);
    }
}
export default UpdateLoop;