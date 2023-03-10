import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CountryService } from './country.service';
import {
  CreateCountryInputDto,
  CreateCountryOutputDto,
} from './dto/create-country.dto';
import {
  UpdateCountryInputDto,
  UpdateCountryOutputDto,
} from './dto/update-country.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  create(
    @Body() createCountryInputDto: CreateCountryInputDto,
  ): Promise<CreateCountryOutputDto> {
    return this.countryService.create(createCountryInputDto);
  }

  @Get()
  findAll() {
    return this.countryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCountryInputDto: UpdateCountryInputDto,
  ): Promise<UpdateCountryOutputDto> {
    return this.countryService.update(+id, updateCountryInputDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.countryService.remove(+id);
  }
}
