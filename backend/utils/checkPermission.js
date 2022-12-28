import UnAuthenticatedError from "../errors/unauthenticated.js";

const checkPermission=(requestUser,resourceUserId)=>{
    if(requestUser.role==='admin') return;
    if(requestUser.userId===resourceUserId.toString()) return
    throw new UnAuthenticatedError('You are not authorize to access this route')
}

export default checkPermission