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
import { StateService } from './state.service';
import {
  CreateStateInputDto,
  CreateStateOutputDto,
} from './dto/create-state.dto';
import {
  UpdateStateInputDto,
  UpdateStateOutputDto,
} from './dto/update-state.dto';
import {
  FindManyStateInputDto,
  FindStateOutputDto,
} from './dto/find-state.dto';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  create(
    @Body() createStateInputDto: CreateStateInputDto,
  ): Promise<CreateStateOutputDto> {
    return this.stateService.create(createStateInputDto);
  }

  @Get()
  findAll(
    @Query() query: FindManyStateInputDto,
  ): Promise<FindStateOutputDto[]> {
    return this.stateService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<FindStateOutputDto> {
    return this.stateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStateInputDto: UpdateStateInputDto,
  ): Promise<UpdateStateOutputDto> {
    return this.stateService.update(+id, updateStateInputDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.stateService.remove(+id);
  }
}
