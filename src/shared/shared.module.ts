import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/modules/user.schema';
import { HttpExceptionFilter } from './httpExeptionFilter';

@Module({
    imports: [MongooseModule.forFeature([ 
        {
            name: "User",
            schema: UserSchema
        }
    ])],
    providers: [
        UserService, 
        {
            provide: 'APP_FILTER',
            useClass: HttpExceptionFilter
        }
    ],
    exports: [UserService]
})
export class SharedModule {}
