import {StatusCodes} from 'http-status-codes'

class CUSTOMAPIError extends Error{
    constructor(message){
        super(message)
    }
}

export default CUSTOMAPIError