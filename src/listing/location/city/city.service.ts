import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCityInputDto, CreateCityOutputDto } from './dto/create-city.dto';
import { FindCityOutputDto, FindManyCityInputDto } from './dto/find-city.dto';
import { UpdateCityInputDto } from './dto/update-city.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CityService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createCityInputDto: CreateCityInputDto,
  ): Promise<CreateCityOutputDto> {
    try {
      await this.validateCreateCityInput(createCityInputDto);
      return await this.prismaService.city.create({
        data: createCityInputDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async findByStateIdAndName(
    stateId: bigint,
    name: string,
  ): Promise<FindCityOutputDto> {
    try {
      return await this.prismaService.city.findUnique({
        where: {
          stateId_name: {
            stateId: stateId,
            name: name,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    findManyCityInputDto: FindManyCityInputDto,
  ): Promise<FindCityOutputDto[]> {
    try {
      const where: Prisma.CityWhereInput = {};
      if (findManyCityInputDto.name) where.name = findManyCityInputDto.name;
      if (findManyCityInputDto.stateId)
        where.stateId = findManyCityInputDto.stateId;
      if (findManyCityInputDto.countryId)
        where.state.countryId = findManyCityInputDto.countryId;

      return await this.prismaService.city.findMany({ where });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<FindCityOutputDto> {
    try {
      return await this.prismaService.city.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateCityInputDto: UpdateCityInputDto) {
    try {
      await this.validateUpdateCityInput(updateCityInputDto);
      return await this.prismaService.city.update({
        where: { id: id },
        data: updateCityInputDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prismaService.city.delete({
        where: { id: id },
      });
    } catch (error) {
      throw error;
    }
  }

  private async validateUpdateCityInput(
    updateCityInputDto: UpdateCityInputDto,
  ) {
    const city = await this.findByStateIdAndName(
      updateCityInputDto.stateId,
      updateCityInputDto.name,
    );

    if (city)
      throw new BadRequestException(
        `state named ${updateCityInputDto.name} already exists`,
      );
  }

  private async validateCreateCityInput(
    createCityInputDto: CreateCityInputDto,
  ) {
    const city = await this.findByStateIdAndName(
      createCityInputDto.stateId,
      createCityInputDto.name,
    );

    if (city)
      throw new BadRequestException(
        `state named ${createCityInputDto.name} already exists`,
      );
  }
}
