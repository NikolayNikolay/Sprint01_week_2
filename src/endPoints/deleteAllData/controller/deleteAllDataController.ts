
import { Request, Response } from "express"

// import { deleteAllDataBaseRepositoriry } from "../../repository/deleteAllDataRepository"
import { deleteAllDataBaseRepositoriry } from "../repository/deleteAllDataRepository"
import { SETTINGS, httpStatusCodes } from "../../../settings"





export const deletAllDataController = async(req:Request , res:Response)=>{
   if (req.url === SETTINGS.PATH.dellAllData) {
      const isEmptyBlogs = await deleteAllDataBaseRepositoriry()
      res.status(httpStatusCodes.NO_CONTENT_204).send('All data is deleted')
   }
   else{
      res.send('Can not dellete all data , somthing went wrong!!!')
   }
}