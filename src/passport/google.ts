import User from "../models/user";
import GoogleRouter from "passport";
import { Strategy } from "passport-google-oauth2";
import config from "../config/config";

const googlePassport = () => {

  GoogleRouter.serializeUser((user, done) => {
    done(null, user);
});

GoogleRouter.deserializeUser((user: any, done) => {
    done(null, user);
});

    }   
  GoogleRouter.use(
    new Strategy(
      {
        clientID: config.social.google_id as string,
        clientSecret: config.social.google_secret as string,
        callbackURL: config.social.google_url as string,
        scope:["openid","https://www.googleapis.com/auth/userinfo.profile","profile","email","https://www.googleapis.com/auth/userinfo.email"]        
      },
      async function ( accessToken, refreshToken, profile, done ) {           
        try {
          const email: string = profile._json.email;
          const provider: string = profile.provider;
          console.log("here",profile);
            

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




export { googlePassport };
