import { ObjectId, TypeExpressionOperatorReturningObjectId, Types } from "mongoose";

export interface UserType {
    _id: Types.ObjectId;
    email: string;
    password: string;
    createdAt: Date;
    firstName?: string;
    lastName?: string;
    maidenName?: string;
    age?: number;
    gender?: string;
    phone?: string;
    username?: string;
    birthDate?: string;
    image?: string;
    address?: {
      address?: string;
      city?: string;
      state?: string;
      country?: string;
    };
    company?: {
      department?: string;
      name?: string;
      title?: string;
    };
    role?: string;
  }
  