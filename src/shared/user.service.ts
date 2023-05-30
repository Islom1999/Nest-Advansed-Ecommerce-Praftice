import { HttpException, HttpStatus, Injectable ,} from '@nestjs/common';
import { InjectModel, } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/types/user';
import { RegisterDto } from './dto/register-dto';
import { LoginDto } from './dto/login-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>){}

    private omitPassword(username: string){
        return this.userModel.findOne({username}).select('-password')
    }

    async create(userDto: RegisterDto): Promise<User> {
        const {username} = userDto
        const user = await this.userModel.findOne({username})

        if(user) {
            throw new HttpException('User is already exist !!!', HttpStatus.UNAUTHORIZED)
        }

        const createdUser = await this.userModel.create(userDto)
        await createdUser.save()

        return this.omitPassword(username)
    }

    async findByLogin(userDto: LoginDto){
        const {username, password} = userDto
        let user = await this.userModel.findOne({username})

        if(!user) {
            throw new HttpException('Invalid username', HttpStatus.UNAUTHORIZED)
        }

        if(await bcrypt.compare(password, user.password)){
            return this.omitPassword(username) 
            // return user
        }else{
            throw new HttpException('Invalid username', HttpStatus.UNAUTHORIZED)
        }

    }

    async findByPayload(payload: any){
        const {username} = payload
        return this.userModel.findOne({username})
    }

}
