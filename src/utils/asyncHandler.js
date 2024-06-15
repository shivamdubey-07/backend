// whereever i have to use async await , i will use this 
// as a wrapper
// there are two ways to do it 
// - with try catch
// - with promise



const asyncHandler=(requestHandler)=>{
 return  (req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next))
    .catch((err)=> next(err))
   }
   
} 



export {asyncHandler}

// const asyncHandler =()=>{}
// const asyncHandler =(func)=>async()=>{}



// const asyncHandler = (fn)=> async( req,res,next)=>  {

//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success:false,
//             message:"Error in asynchandler ",err
//         })
//     }       


// }
