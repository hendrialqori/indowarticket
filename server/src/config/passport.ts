import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "@/constants/dotenv";
import * as authRepository from "@/repositories/AuthRepository";
import { UserSelect } from "@/db/schemas/User";

const googleStrategy = new GoogleStrategy(
    {
        clientID: String(GOOGLE_CLIENT_ID),
        clientSecret: String(GOOGLE_CLIENT_SECRET),
        callbackURL: "/api/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
        // collect google crendential data
        const googleCredential = {
            display_name: profile.displayName,
            email: String(profile.emails?.[0].value),
            picture: String(profile.photos?.[0].value),
            provider_id: profile.id,
        } as UserSelect;

        // check if there is user with provider id equal to google credential id
        const user = await authRepository.showByProviderId(googleCredential.provider_id);

        // if not exits, create new user with these credential
        if (!user) {
            await authRepository.create(googleCredential);
            return done(null, googleCredential);
        }

        return done(null, user);
    },
);

passport.use(googleStrategy);
