import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAreaInputDto } from './dto/create-area.dto';
import { UpdateAreaInputDto } from './dto/update-area.dto';
import { FindManyAreaInputDto, FindAreaOutputDto } from './dto/find-area.dto';
import { DeleteAreaOutputDto } from './dto/delete-area.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AreaService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAreaInputDto: CreateAreaInputDto) {
    try {
      await this.validateCreateAreaInput(createAreaInputDto);
      return await this.prismaService.area.create({
        data: createAreaInputDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    findManyAreaInputDto: FindManyAreaInputDto,
  ): Promise<FindAreaOutputDto[]> {
    const where: Prisma.AreaWhereInput = {};
    if (findManyAreaInputDto.name) where.name = findManyAreaInputDto.name;
    if (findManyAreaInputDto.cityId) where.cityId = findManyAreaInputDto.cityId;
    if (findManyAreaInputDto.stateId)
      where.city.stateId = findManyAreaInputDto.stateId;
    try {
      return await this.prismaService.area.findMany({
        where,
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<FindAreaOutputDto> {
    try {
      return await this.prismaService.area.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateAreaInputDto: UpdateAreaInputDto) {
    try {
      await this.validateUpdateAreaInput(updateAreaInputDto);
      return await this.prismaService.area.update({
        where: { id },
        data: updateAreaInputDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<DeleteAreaOutputDto> {
    try {
      return await this.prismaService.area.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async findByCityIdAndName(cityId: bigint, name: string) {
    try {
      return await this.prismaService.area.findUnique({
        where: {
          cityId_name: {
            cityId,
            name,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  private async validateCreateAreaInput(
    createAreaInputDto: CreateAreaInputDto,
  ) {
    const area = await this.findByCityIdAndName(
      createAreaInputDto.cityId,
      createAreaInputDto.name,
    );

    if (area)
      throw new BadRequestException(
        `city named ${createAreaInputDto.name} already exists`,
      );
  }

  private async validateUpdateAreaInput(
    updateAreaInputDto: UpdateAreaInputDto,
  ) {
    const area = await this.findByCityIdAndName(
      updateAreaInputDto.cityId,
      updateAreaInputDto.name,
    );

    if (area)
      throw new BadRequestException(
        `city named ${updateAreaInputDto.name} already exists`,
      );
  }
}
