import User from "../models/user";
import GoogleRouter from "passport";
import GoogleStrategy, { Strategy } from "passport-google-oauth2";

const googlePassport = () => {
    GoogleRouter.serializeUser((user, done) => {
        done(null, user);
    });

    GoogleRouter.deserializeUser((user: any, done) => {
        done(null, user);
    });

    GoogleRouter.use(
        new Strategy(
            {
                clientID: "815398021427-9dtl8rrtqq6dc0jn567m5vr9r6002tp6.apps.googleusercontent.com",
                clientSecret: "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",
                callbackURL: "http://localhost:8080/api/user/google/callback"
            },
            async function (accessToken: any, refreshToken: any, profile: any, cb: any) {
                let email: string;
                email = profile._json.email;
                console.log(email);
                try {
                    const user = await User.findOne({ email: email });
                    //동일한 이메일을 가졌을 때는 이미 가입중인 사용자라면 바로 로그인하도록 아니라면 신규 사용자 생성
                    if (user) {
                        // user.socialId = profile.id;
                        // user.save();
                        return cb(null, user);
                    } else {
                        const newUser = await User.create({
                            // socialtype: "google",
                            // socialId: profile.id,
                            // profile_image: profile._json.picture,
                            nickname: profile._json.name,
                            email: email
                        });
                        return cb(null, newUser);
                    }
                } catch (error) {
                    return cb(error);
                }
            }
        )
    );
};

export { googlePassport };
