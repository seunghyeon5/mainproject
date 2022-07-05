import KakaoRouter from "passport";
import user from "../models/user";
const KakaoStrategy = require("passport-kakao").Strategy;
import User from "../models/user";
// import jwt from "jsonwebtoken";

const kakaoPassport = () => {
    KakaoRouter.use(
        new KakaoStrategy(
            {
                clientID: "dac164a59bbf862e7c931178d30c3f85", // 카카오 로그인에서 발급받은 REST API 키
                callbackURL: "http://localhost:8080/api/user/kakao/callback" // 카카오 로그인 Redirect URI 경로
            },
            async (accessToken: any, refreshToken: any, profile: any, done: any) => {
                let email: string;
                email = profile._json.kakao_account.email;
                try {
                    const existUser = await User.findOne({
                        // 카카오 플랫폼에서 로그인 했고 이메일이 일치하는경우
                        //email: profile._json.kakao_account_email
                        email:email
                    });
                    //console.log(email);
                    //console.log(existUser);
                    // 이미 가입된 카카오 프로필이면 성공
                    if (existUser) {
                        done(null, existUser); // 로그인 인증 완료
                    } else {
                        const newUser = await User.create({
                            //email: profile._json.kakao_account_email,
                            email: email,
                            nickname: profile.username,
                            password: "111"//이후 삭제되어야할 부분
                        });
                        console.log(newUser);
                        done(null, newUser); // 회원가입하고 로그인 인증 완료
                        return;
                    }
                    // const _id ; user._id
                    // const Accesstoken = jwt.sign({ email }, "main-secret-key", { expiresIn: "1d" });
                    // console.log(Accesstoken);
                    // return done(null, profile, {
                    //     accessToken: Accesstoken,
                    //     email
                    // });
                } catch (err) {
                    console.log(err);
                    done(err);
                }
            }
        )
    );

    KakaoRouter.serializeUser((user, done) => {
        done(null, user);
    });

    KakaoRouter.deserializeUser((user: any, done) => {
        done(null, user);
    });
};

export { kakaoPassport };
