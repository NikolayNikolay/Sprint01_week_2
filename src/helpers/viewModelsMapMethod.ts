import { DeviceDbModel, DeviceViewModel } from "../endPoints/securityDevices/models/DeviceViewModel"
import { UserDbModel } from "../endPoints/users/models/UserDbModel"
import { MeViewModel } from "../endPoints/usersAuthorisation/models/MeViewModel"


export const mapViewBlogsModel = (data:any):any[] | any =>{
   if (Array.isArray(data)) {
      return data.map((blog:any)=>{
         const {_id , ...item} = blog
         return { id:_id.toString(),
                  name:	item.name,
                  description	: item.description,
                  websiteUrl: item.websiteUrl,
                  createdAt: item.createdAt,
                  isMembership: item.isMembership
               }
      })
   }
   else{
      const {_id , ...item} = data
      return { id:_id.toString(),
               name:	item.name,
               description	: item.description,
               websiteUrl: item.websiteUrl,
               createdAt: item.createdAt,
               isMembership: item.isMembership
      }
   }
}
export const mapViewPostsModel = (data:any):any[] | any=>{
   if (Array.isArray(data)) {
      return data.map((post:any)=>{
         const {_id , ...item} = post
         return { id:_id.toString(),
                  title: item.title,
                  shortDescription:item.shortDescription,
                  content:item.content,
                  blogId:item.blogId,
                  blogName:item.blogName,
                  createdAt: item.createdAt
               }
      })
   }
   else{
      const {_id , ...item} = data
      return { id:_id.toString(),
               title: item.title,
               shortDescription:item.shortDescription,
               content:item.content,
               blogId:item.blogId,
               blogName:item.blogName,
               createdAt: item.createdAt
      }
   }
}
export const mapViewUsersModel = (data:any):any[] | any=>{
   if (Array.isArray(data)) {
      return data.map((post:any)=>{
         const {_id , ...item} = post
         return { id:_id.toString(),
                  login: item.login,
                  email: item.email,
                  createdAt: item.createdAt
               }
      })
   }
   else{
      const {_id , ...item} = data
      return { id:_id.toString(),
               login: item.login,
               email: item.email,
               createdAt: item.createdAt
      }
   }
}
export const mapMeViewModel = (data:UserDbModel):MeViewModel=>{
      const {_id , ...item} = data
      return { userId:_id.toString(),
               login: item.login,
               email: item.email,
      }
}
export const mapViewCommentsModel = (data:any):any[] | any => {   
   if (Array.isArray(data)) {
      return data.map((comment:any)=>{
         const {_id , ...item} = comment
         return { id:_id.toString(),
               content: item.content,
               commentatorInfo: {
                 userId: item.commentatorInfo.userId,
                 userLogin: item.commentatorInfo.userLogin
               },
               createdAt:  item.createdAt
               }
      })
   }
   else{
      const {_id , ...item} = data
      return { id:_id.toString(),
         content: item.content,
         commentatorInfo: {
           userId: item.commentatorInfo.userId,
           userLogin: item.commentatorInfo.userLogin
         },
         createdAt:  item.createdAt
      }
   }
}
export const mapViewDeviceModel = (data:UserDbModel):DeviceViewModel[]=>{
   const resultDeviceView = data.sessionDevice.map((session:DeviceDbModel)=>{
      const {...device} = session
      return{
         ip:device.ip,
         title:device.device_name,
         lastActiveDate: new Date(device.iat * 1000).toISOString(),
         deviceId:device.deviceId,
      }
   })
   return resultDeviceView
}
