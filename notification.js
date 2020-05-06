const notifyMessage = (Sucess,Msg,Data,Err) => {
    const notify = {
        sucess: Sucess,
        msg: Msg,
        data: Data,
        err: Err
    }
    return notify;
}

module.exports.notifyMessage = notifyMessage;