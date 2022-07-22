import KakaoRouter from "passport";
const KakaoStrategy = require("passport-kakao").Strategy;
import User from "../models/user";
import config from "../config/config";

const kakaoPassport = () => {
    KakaoRouter.use(
        new KakaoStrategy(
            {
                clientID: config.social.kakao_id, // 카카오 로그인에서 발급받은 REST API 키
                callbackURL: config.social.kakao_url // 카카오 로그인 Redirect URI 경로
            },
            async (accessToken: any, refreshToken: any, profile: any, done: any) => {
                try {
                    let email: string = profile._json.kakao_account.email;
                    let provider: string = profile.provider;
                    const existUser = await User.findOne({
                        // 카카오 플랫폼에서 로그인 했고 이메일이 일치하는경우
                        //email: profile._json.kakao_account_email
                        email: email
                    }, {provider: provider});
                    //console.log(email);
                    //console.log(existUser);
                    // 이미 가입된 카카오 프로필이면 성공
                    if (existUser) {
                        done(null, existUser); // 로그인 인증 완료
                    } else {
                        const newUser = await User.create({
                            provider: provider,
                            email: email,
                            nickname: profile.username
                        });
                        console.log(newUser)
                        
                        done(null, newUser); // 회원가입하고 로그인 인증 완료
                        return;
                    }
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
