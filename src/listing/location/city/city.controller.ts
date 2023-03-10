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
import { CityService } from './city.service';
import { CreateCityInputDto } from './dto/create-city.dto';
import { UpdateCityInputDto, UpdateCityOutputDto } from './dto/update-city.dto';
import { FindManyCityInputDto, FindCityOutputDto } from './dto/find-city.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  create(@Body() createCityDto: CreateCityInputDto) {
    return this.cityService.create(createCityDto);
  }

  @Get()
  findAll(@Query() query: FindManyCityInputDto): Promise<FindCityOutputDto[]> {
    return this.cityService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<FindCityOutputDto> {
    return this.cityService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCityInputDto: UpdateCityInputDto,
  ): Promise<UpdateCityOutputDto> {
    return this.cityService.update(+id, updateCityInputDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.cityService.remove(+id);
  }
}
