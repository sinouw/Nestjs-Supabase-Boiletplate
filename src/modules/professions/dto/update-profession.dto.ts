import { PartialType } from '@nestjs/swagger';
import { CreateProfessionDto } from './create-profession.dto';

export class UpdateProfessionDto extends PartialType(CreateProfessionDto) {}
