import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt, Verifiedback } from "passport-jwt"
import { AuthService } from "./auth.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy){
    constructor(
        private authService: AuthService    
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretkey'
        })
    }

    async validate(payload: any, done: Verifiedback){
        const user = await this.authService.validateUser(payload)

        if(!user) { 
            done(new HttpException('unauthorized access', HttpStatus.UNAUTHORIZED),false)
        }

        return done(null, user, payload.iat)
    }
}

