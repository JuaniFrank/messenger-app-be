import { IsMongoId } from 'class-validator';

export class ValidateIdDto {
  @IsMongoId()
  id: string;
}