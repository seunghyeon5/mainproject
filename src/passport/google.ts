import User from "../models/user";
import GoogleRouter from "passport";
//import { Strategy } from "passport-google-oauth2";
const GoogleStrategy = require("passport-google-oauth2").Strategy;
import config from "../config/config";

const googlePassport = () => {
    GoogleRouter.use(
    new GoogleStrategy(
      {
        clientID: config.social.google_id,
        clientSecret: config.social.google_secret,
        callbackURL: config.social.google_url,        
        accessType: 'offline',
        prompt: 'consent'    
      },
      async function ( accessToken:any, refreshToken:any, profile:any, done:any ) {           
        try {
          console.log("here",profile);
          const email: string = profile._json.email;
          const provider: string = profile.provider;          
          console.log("here",email,provider);         
            

          const existUser = await User.findOne({$and:[{email: email},{provider:provider}]});
          //console.log("here",existUser);
          //동일한 이메일을 가졌을 때는 이미 가입중인 사용자라면 바로 로그인하도록 아니라면 신규 사용자 생성
          if (existUser) {
            
            return done(null, existUser);
          } else {
            const newUser = await User.create({             
              email,
              nickname: profile._json.name,
              provider                       
            });
            return done(null, newUser);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

    }


export { googlePassport };
