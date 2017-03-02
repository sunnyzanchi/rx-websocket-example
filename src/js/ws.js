export default function initWs(){
  // Sets up connection, ws or wss based on http or https
  if(window.location.protocol === 'http:')
    return new WebSocket(`ws://${window.location.host}`);
  if(window.location.protocol === 'https:')
    return new WebSocket(`wss://${window.location.host}`);
}
