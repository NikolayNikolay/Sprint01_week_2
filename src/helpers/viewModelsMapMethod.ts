

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