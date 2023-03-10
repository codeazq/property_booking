import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaInputDto } from './dto/create-area.dto';
import { UpdateAreaInputDto } from './dto/update-area.dto';
import { DeleteAreaOutputDto } from './dto/delete-area.dto';
import { FindAreaOutputDto, FindManyAreaInputDto } from './dto/find-area.dto';

@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  create(
    @Body() createAreaInputDto: CreateAreaInputDto,
  ): Promise<FindAreaOutputDto> {
    return this.areaService.create(createAreaInputDto);
  }

  @Get()
  findAll(@Query() query: FindManyAreaInputDto): Promise<FindAreaOutputDto[]> {
    return this.areaService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<FindAreaOutputDto> {
    return this.areaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAreaInputDto: UpdateAreaInputDto,
  ): Promise<FindAreaOutputDto> {
    return this.areaService.update(+id, updateAreaInputDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteAreaOutputDto> {
    return this.areaService.remove(+id);
  }
}
