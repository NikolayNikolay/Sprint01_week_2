import nodemailer from "nodemailer";


export const emailServise ={
   async sendEmailForRegistration(email:string,confirmCode:string){
      const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
         service: 'gmail',
         auth: {
           user: "modovod228@gmail.com",
           pass: "nopg yxnp exiw cetd",
         },
       });
       try {
         
           const result = await transporter.sendMail({
           from: '"Blog Platform" <modovod228@gmail.com>', // sender address
           to: `${email}`, // list of receivers
           subject: "Confimation Code", // Subject line
           html:`<h1>Thank for your registration</h1>
           <p>To finish registration please follow the link below:
              <a href='https://somesite.com/confirm-email?code=${confirmCode}'>complete registration</a>
           </p>` // plain text body
          })
       } 
       catch (err) {
         console.error(err);
       }
   },
   async sendEmailForRecoveryPassword(email:string,confirmCode:string){
    const transporter = nodemailer.createTransport({
      host:'smtp.gmail.com',
      port:465,
       service: 'gmail',
       auth: {
         user: "modovod228@gmail.com",
         pass: "nopg yxnp exiw cetd",
       },
     });
     try {
       
         const result = await transporter.sendMail({
         from: '"Blog Platform" <modovod228@gmail.com>', // sender address
         to: `${email}`, // list of receivers
         subject: "Password recovery", // Subject line
         html:`<h1>Password recovery</h1>
       <p>To finish password recovery please follow the link below:
          <a href='https://somesite.com/password-recovery?recoveryCode=${confirmCode}'>recovery password</a>
      </p>` // plain text body
        })
     } 
     catch (err) {
       console.error(err);
     }
 }
}
