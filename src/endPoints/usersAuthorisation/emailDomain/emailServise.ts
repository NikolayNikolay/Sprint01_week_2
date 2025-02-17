import nodemailer from "nodemailer";


export const emailServise ={
   async sendEmail(email:any,confirmCode:any){
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
         console.log(`try to send confirm code  to ${email}`);
         
           const result = await transporter.sendMail({
           from: '"Blog Platform" <modovod228@gmail.com>', // sender address
           to: `${email}`, // list of receivers
           subject: "Confimation Code", // Subject line
           html:`<h1>Thank for your registration</h1>
           <p>To finish registration please follow the link below:
              <a href='https://somesite.com/confirm-email?code=${confirmCode}'>complete registration</a>
           </p>` // plain text body
          })
         console.log(result);
         
       } 
       catch (err) {
         console.error(err);
       }
   }
}
