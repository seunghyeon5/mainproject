import User from "../models/user";
import NaverRouter from "passport";
const NaverStrategy = require("passport-naver").Strategy;
import config from "../config/config";

const naverPassport = () => {
  NaverRouter.use(
    new NaverStrategy(
      {
        clientID: config.social.naver_id,
        clientSecret: config.social.naver_secret,
        callbackURL: config.social.naver_url,         
      },
      async function ( accessToken:any, refreshToken:any, profile:any, done:any ) {           
        try {
          console.log("profile contents",profile);
          const email: string = profile.email;
          const provider: string = profile.provider;          
          console.log("email :",email," provider :",provider);         
            

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


export { naverPassport };
