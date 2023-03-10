import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import {
  CreateStateInputDto,
  CreateStateOutputDto,
} from './dto/create-state.dto';
import {
  FindManyStateInputDto,
  FindStateOutputDto,
} from './dto/find-state.dto';
import {
  UpdateStateInputDto,
  UpdateStateOutputDto,
} from './dto/update-state.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class StateService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    createStateInputDto: CreateStateInputDto,
  ): Promise<CreateStateOutputDto> {
    try {
      await this.validateCreateStateInput(createStateInputDto);
      return await this.prismaService.state.create({
        data: createStateInputDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    findManyStateInputDto: FindManyStateInputDto,
  ): Promise<FindStateOutputDto[]> {
    try {
      const where: Prisma.StateWhereInput = {};
      if (findManyStateInputDto.name) where.name = findManyStateInputDto.name;
      if (findManyStateInputDto.countryId)
        where.countryId = findManyStateInputDto.countryId;

      return await this.prismaService.state.findMany({
        where,
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<FindStateOutputDto> {
    try {
      return await this.prismaService.state.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findByCountryIdAndName(
    countryId: number,
    name: string,
  ): Promise<FindStateOutputDto> {
    try {
      return await this.prismaService.state.findUnique({
        where: {
          countryId_name: {
            countryId: countryId,
            name: name,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateStateInputDto: UpdateStateInputDto,
  ): Promise<UpdateStateOutputDto> {
    try {
      await this.validateUpdateStateInput(updateStateInputDto);
      return await this.prismaService.state.update({
        where: { id: id },
        data: updateStateInputDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prismaService.state.delete({
        where: { id: id },
      });
    } catch (error) {
      throw error;
    }
  }

  private async validateCreateStateInput(
    createStateInputDto: CreateStateInputDto,
  ) {
    const state = await this.findByCountryIdAndName(
      createStateInputDto.countryId,
      createStateInputDto.name,
    );

    if (state)
      throw new BadRequestException(
        `state named ${createStateInputDto.name} already exists`,
      );
  }

  private async validateUpdateStateInput(
    updateStateInputDto: UpdateStateInputDto,
  ) {
    const state = await this.findByCountryIdAndName(
      updateStateInputDto.countryId,
      updateStateInputDto.name,
    );

    if (state)
      throw new BadRequestException(
        `state named ${updateStateInputDto.name} already exists`,
      );
  }
}
