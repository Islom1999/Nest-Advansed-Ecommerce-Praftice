import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from 'src/shared/user.service';

@Injectable()
export class AuthService {

  constructor(private userService: UserService){}

  async signIn(payload: any){
    return await sign(payload, 'secretkey', {expiresIn: "7h"})
  }

  async validateUser(payload: any) {
    return await this.userService.findByPayload(payload)
  }
}
