import { IsString, Length, IsNotEmpty } from 'class-validator';
import { StatusEnum } from '../status.enum'; // Import the StatusEnum if you have it

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty({ message: 'Le nom est obligatoire' })
  @Length(3, 10, { message: 'Le nom doit contenir entre 3 et 10 caractères' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'La description est obligatoire' })
  @Length(10, 255, { message: 'La description doit contenir au moins 10 caractères' })
  description: string;

  status?: StatusEnum; // Optional status field, could be further validated if needed
}