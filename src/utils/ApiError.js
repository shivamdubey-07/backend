//node.js Error class provide krati hai for simplicity 
//and need we are overriding some methods


class ApiError extends Error{

    constructor(
        statusCode,
        message="Something Went Wrong",
        errors=[],
        stack=""
    ){
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false
        this.errors=errors

        if(stack){
            this.stack=stack

        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }

    }

}

export {ApiError}