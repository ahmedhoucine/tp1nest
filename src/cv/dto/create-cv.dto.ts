import { User } from "@ngneat/falso";
import { Cv } from "../entities/cv.entity";

export class CreateCvDto {
    cv:Cv
    user:User

}
