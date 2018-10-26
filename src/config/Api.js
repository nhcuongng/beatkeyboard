import { API_ROOT } from './ApiRoot'
import openSocket from 'socket.io-client';


const  socket = openSocket(`${ API_ROOT }`);
function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}


export { subscribeToTimer };