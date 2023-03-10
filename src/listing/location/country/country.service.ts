import { Injectable, BadRequestException } from '@nestjs/common';
import {
  CreateCountryInputDto,
  CreateCountryOutputDto,
} from './dto/create-country.dto';
import {
  UpdateCountryInputDto,
  UpdateCountryOutputDto,
} from './dto/update-country.dto';
import { FindCountryOutputDto } from './dto/find-country.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class CountryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createCountryDto: CreateCountryInputDto,
  ): Promise<CreateCountryOutputDto> {
    try {
      await this.validateCreateCountryInput(createCountryDto);
      return this.prismaService.country.create({
        data: createCountryDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<FindCountryOutputDto[]> {
    try {
      return this.prismaService.country.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<FindCountryOutputDto> {
    try {
      return this.prismaService.country.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateCountryInputDto: UpdateCountryInputDto,
  ): Promise<UpdateCountryOutputDto> {
    try {
      await this.validateUpdateCountryInput(updateCountryInputDto);
      const option = await this.prismaService.country.update({
        where: { id: id },
        data: {
          name: updateCountryInputDto.name,
        },
      });
      return option;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prismaService.country.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  private async validateCreateCountryInput(
    createCountryInputDto: CreateCountryInputDto,
  ) {
    const country = await this.prismaService.country.findUnique({
      where: {
        name: createCountryInputDto.name,
      },
    });

    if (country)
      throw new BadRequestException(
        `country named ${createCountryInputDto.name} already exists`,
      );
  }

  private async validateUpdateCountryInput(
    updateCountryInputDto: UpdateCountryInputDto,
  ) {
    const country = await this.prismaService.country.findUnique({
      where: {
        name: updateCountryInputDto.name,
      },
    });

    if (country)
      throw new BadRequestException(
        `country named ${updateCountryInputDto.name} already exists`,
      );
  }
}
