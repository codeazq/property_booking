import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaInputDto } from './create-area.dto';

export class UpdateAreaInputDto extends PartialType(CreateAreaInputDto) {}
