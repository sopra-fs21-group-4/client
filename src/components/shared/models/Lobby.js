/**
 * Lobby model
 */
class Lobby {
  constructor(data = {}) {
    this.lobbyId = null;
    this.name = null;
    this.gameState = null;
    this.round = null;
    this.maxRounds = null;
    this.maxTimer = null;
    this.maxPlayers = null;
    this.players = null;
    Object.assign(this, data);
  }
}
export default Lobby;
