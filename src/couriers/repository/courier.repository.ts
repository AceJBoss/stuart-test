import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import { CourierCreateDto } from "../dto/courier.create.dto";
import { Courier } from "../model/courier.model";
import { CourierUpdateDto } from "../dto/courier.update.dto";
import { Messages } from "../Messages.data";

@Injectable()
export class CourierRepository {

    private couriers: Courier[] = []

    async create(courierCreateDto: CourierCreateDto): Promise<Courier> {
        const { id, max_capacity} = courierCreateDto
        // const genId = Math.floor(1000 + Math.random() * 9000);
        const courier = {
            id,
            max_capacity
        }
        this.couriers.push(courier)
        return courier;
    }

    async findAll(): Promise<Courier[]> {
        return this.couriers;
    }

    async findCouriersWithCapacity(capacity_required: number): Promise<Courier[]> {
        const couriers = await this.findAll();
        if(capacity_required <= 0){
            throw new BadRequestException(`${capacity_required} ${Messages.INVALID_CAPACITY}`)
        }
        this.couriers = couriers.filter(courier => courier.max_capacity >= capacity_required)
        return this.couriers;
    }

    async findOne(id: number): Promise<Courier> {
        const couriers = await this.findAll();
        const courier = couriers.find(courier => courier.id === id)
        if (!courier) {
            throw new NotFoundException(`${id} ${Messages.COURIER_NOT_EXIST}`)
        }
        return courier
    }

    async update(courierUpdateDto: CourierUpdateDto): Promise<Courier> {
        const { id, max_capacity } = courierUpdateDto;
        const courier = await this.findOne(id)
        courier.max_capacity = max_capacity
        return courier;
    }

    async delete(id: number): Promise<boolean> {
        const couriers = await this.findAll();
        this.couriers = couriers.filter(courier => courier.id != id)
        return (couriers.length != this.couriers.length)
    }
}
