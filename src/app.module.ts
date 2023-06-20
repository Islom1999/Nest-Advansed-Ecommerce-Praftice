import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files')
    }), 
    MongooseModule.forRoot(process.env.MONGO_URI),  
    SharedModule,  
    AuthModule, 
    ProductModule
  ], 
  controllers: [],
  providers: [], 
})
export class AppModule {}
