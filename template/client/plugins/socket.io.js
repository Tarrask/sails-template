
import socketIOClient from 'socket.io-client'
import sailsIOClient from 'sails.io.js'

export default (ctx, inject) => {
  const io = sailsIOClient(socketIOClient)
  ctx.$io = io
  ctx.$socket = io.socket
  inject('socket', io.socket)
}
