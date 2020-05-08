//notify message---------------------------------
const notifyMessage = (Sucess,Msg,Data,Err) => {
    const notify = {
        sucess: Sucess,
        msg: Msg,
        data: Data,
        err: Err
    }
    return notify;
}
//export function-------------------------------
module.exports.notifyMessage = notifyMessage;