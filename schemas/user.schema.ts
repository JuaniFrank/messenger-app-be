import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserSchemaType = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  maidenName: string;

  @Prop()
  username: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  createdAt: Date;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  birthDate: string;

  @Prop()
  image: string;

  @Prop()
  role: string;

  @Prop({ type: Object })
  address: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
  };

  @Prop({ type: Object })
  company: {
    department?: string;
    name?: string;
    title?: string;
  };

  @Prop({ type: Object })
  bank?: {
    cardExpire?: string;
    cardNumber?: string;
    cardType?: string;
    currency?: string;
    iban?: string;
  };

  @Prop({ type: Object })
  crypto?: {
    coin?: string;
    wallet?: string;
    network?: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
