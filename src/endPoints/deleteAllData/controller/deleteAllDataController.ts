
import { Request, Response } from "express"

// import { deleteAllDataBaseRepositoriry } from "../../repository/deleteAllDataRepository"
import { deleteAllDataBaseRepositoriry } from "../repository/deleteAllDataRepository"
import { SETTINGS, httpStatusCodes } from "../../../settings"





export const deletAllDataController = async(req:Request , res:Response)=>{
   if (req.url === SETTINGS.PATH.dellAllData) {
      const isEmptyBlogs = await deleteAllDataBaseRepositoriry()
      if (isEmptyBlogs.length === 3) {
         res.status(httpStatusCodes.NO_CONTENT).send('All data is deleted')
         return
      }
   }
   else{
      res.send('Can not dellete all data , somthing went wrong!!!')
   }
}