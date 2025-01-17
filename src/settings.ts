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
         authLogin:'/auth/login',
         DATA_BASE_NAME:'Blogers_Platform',
         BLOG_COLLECTION_NAME:"blogs",
         POST_COLLECTION_NAME:"posts",
         USERS_COLLECTION_NAME:"users",
      },
}

export const mongoURI = process.env.MONGO_URL || 'mongodb://localhost:27017/'; 


export const httpStatusCodes = {
   OK: 200,
   CREATED: 201,
   NO_CONTENT: 204,
   BAD_REQUEST: 400,
   UNAUTHORIZED: 401,
   NOT_FOUND: 404
}

export const ADMIN_AUTH = 'admin:qwerty'