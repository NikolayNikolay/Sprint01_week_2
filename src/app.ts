import express from 'express'
import cors from 'cors'
import { SETTINGS } from "./settings";
import { Request, Response } from "express"
import { blogPostRouter } from './endPoints/blogPosts/router/blog-post-router';
import { usersRouter } from './endPoints/users/router/users-router';
import { postsRouter } from './endPoints/posts/router/posts-router';
import { deletAllDataController } from './endPoints/deleteAllData/controller/deleteAllDataController';
import { blogsRouter } from './endPoints/blogs/router/blogs-router';
import { authLoginRouter } from './endPoints/usersAuthorisation/router/authLogin-router';
import { commentsRouter } from './endPoints/commentsAndPostsComments/rourer/comments-router';
import { postsCommentsRouter } from './endPoints/commentsAndPostsComments/rourer/postsCommentsRouter';
import nodemailer from "nodemailer";

export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк


app.use(SETTINGS.PATH.blogs, blogsRouter)

app.use(SETTINGS.PATH.blogs,blogPostRouter)

app.use(SETTINGS.PATH.posts, postsRouter)

app.use(SETTINGS.PATH.users, usersRouter)

app.use(SETTINGS.PATH.authLogin, authLoginRouter)

app.use(SETTINGS.PATH.comments, commentsRouter)

app.use(SETTINGS.PATH.posts, postsCommentsRouter)






app.delete(SETTINGS.PATH.dellAllData, deletAllDataController )



app.post("/sendEmail",async(req:Request, res:Response) => {
      const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: "modovod228@gmail.com",
              pass: "nopg yxnp exiw cetd",
            },
          });
          try {
              const result = await transporter.sendMail({
              from: '"BOOOOOOOO!!!!!!!! 👻" <modovod228@gmail.com>', // sender address
              to: "ulianau67@gmail.com", // list of receivers
              subject: "Hello Baby✔", // Subject line
              text: "Guess, is this?", // plain text body
              html: "<b>Hello world?</b>", // html body
              })
              console.log(result);
              
          } 
          catch (err) {
            console.error(err);
            
          }
      res.sendStatus(200)
})


app.get('/', (req:Request, res:Response) => {
      // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
      res.status(200).json({version: '1.0'})
})