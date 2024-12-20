import { IsString, Length, IsOptional, IsEnum } from 'class-validator';
import { StatusEnum } from '../status.enum'; 

export class UpdateTodoDto {
  @IsString()
  @IsOptional()  
  @Length(3, 10, { message: 'Le nom doit contenir entre 3 et 10 caractères' })
  name?: string;

  @IsString()
  @IsOptional()  
  @Length(10, 255, { message: 'La description doit contenir au moins 10 caractères' })
  description?: string;

  @IsEnum(StatusEnum, { message: 'Le statut doit être l\'une des valeurs suivantes :PENDING,IN_PROGRESS,COMPLETED' })
  @IsOptional()  
  status?: StatusEnum;
}
