import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CourierUpdateDto } from '../dto/courier.update.dto';
import { CourierCreateDto } from '../dto/courier.create.dto';
import { Messages } from '../Messages.data';
import { Courier } from '../model/courier.model';
import { CourierRepository } from '../repository/courier.repository';

@Injectable()
export class CouriersService {


    constructor(private courierRepository: CourierRepository) { }

    async getAll(): Promise<Courier[]> {
        return await this.courierRepository.findAll();
    }

    async getAvailableCapacity(capacity_required: number): Promise<Courier[]> {
        return await this.courierRepository.findCouriersWithCapacity(capacity_required);
    }

    async create(employeeCreateDto: CourierCreateDto): Promise<Courier> {
        return this.courierRepository.create(employeeCreateDto);
    }


    getById(id: number): Promise<Courier> {

        const courier = this.courierRepository.findOne(id)
        if (!courier) {
            throw new NotFoundException(`${id} ${Messages.COURIER_NOT_EXIST}`)
        }
        return courier
    }
    async update(courierUpdateDto: CourierUpdateDto): Promise<Courier> {
        return this.courierRepository.update(courierUpdateDto)
    }

    async delete(id: number): Promise<boolean> {
        let x = await this.courierRepository.delete(id);
        return x;
    }

}
