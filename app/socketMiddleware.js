import {action as IndexAction} from '../app/reducers/index'

function createSocketMiddleware(socket) {
  let eventFlag = false;
  return store => next => action => {
    if(!eventFlag) {
      eventFlag = true;
      //此处注册需要从服务器返回的推送数据
      socket.on('new_comment', (data) => {
        console.log(data)
        next(IndexAction.achieve_new_comment(data));
      })
    }

    if(action.type === 'REGISTER_USER') {
      socket.emit('register_user', {
        userId: action.userId
      }, (data) => {
        console.log(data);
      })
    }
    return next(action);
  }
}


export default createSocketMiddleware
