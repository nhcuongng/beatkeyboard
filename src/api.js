import openSocket from 'socket.io-client';
const  socket = openSocket("https://beatkeyboard-server.herokuapp.com");
 
export { socket };