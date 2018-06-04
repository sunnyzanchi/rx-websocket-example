/**
 * @returns {WebSocket}
 */
const initWs = () => {
  // Sets up connection, ws or wss based on http or https
  if (window.location.protocol === 'http:') {
    return new WebSocket(`ws://${window.location.hostname}:8000`);
  }
  if (window.location.protocol === 'https:') {
    return new WebSocket(`wss://${window.location.hostname}:8000`);
  }
};

export default initWs;
