import {action} from '../app/reducers/index'


window.socket = socket;

export function socketEmit(userId) {
  socket.emit('register_user', {
    userId
  }, (data) => {
    console.log(data);
  })
}

export function get_new_comment() {
  socket.on('new_comment', msg => {

  })
}

function createSocketMiddleware(socket) {
  let eventFlag = false;
  if(!eventFlag) {
    eventFlag = true;

  }
}


export default createSocketMiddleware
