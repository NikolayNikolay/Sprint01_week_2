   import {config} from 'dotenv'
   config() // добавление переменных из файла .env в process.env
   
   export const SETTINGS = {
      // все хардкодные значения должны быть здесь, для удобства их изменения
      PORT: process.env.PORT || 5000,
      PATH: {
         blogs:"/blogs",
         posts:"/posts",
         dellAllData:"/testing/all-data",
         postsForBlog:"/:id/posts",
         users: '/users',
         authLogin:'/auth',
         comments:'/comments',
         DATA_BASE_NAME:'Blogers_Platform',
         BLOG_COLLECTION_NAME:"blogs",
         POST_COLLECTION_NAME:"posts",
         USERS_COLLECTION_NAME:"users",
         COMMENTS_COLLECTION_NAME: 'comments'
      },
      SECRET_KEY : process.env.SECRET_KEY || 12345
}

export const mongoURI =  process.env.MONGO_URL || 'mongodb://localhost:27017/'; 


export const httpStatusCodes = {
   OK_200: 200,
   CREATED_201: 201,
   NO_CONTENT_204: 204,
   BAD_REQUEST_400: 400,
   UNAUTHORIZED_401: 401,
   NOT_FOUND_404: 404,
   FORBIDDEN_403: 403
}

export const ADMIN_AUTH = 'admin:qwerty'