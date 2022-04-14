import { IsIn, IsNotEmpty, NotEquals, ValidateIf } from "class-validator"

export class CourierUpdateDto {
    id: number
    @IsNotEmpty()
    max_capacity: number
}