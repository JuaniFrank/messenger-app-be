import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AuthModule, UserModule, MongooseModule.forRoot('mongodb://localhost:27017')],
  controllers: [],
  providers: [],

})
export class AppModule {}
