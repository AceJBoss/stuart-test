import {IsNotEmpty} from "class-validator";

export class CourierCreateDto {
    @IsNotEmpty()
    id: number
    @IsNotEmpty()
    max_capacity: number
}