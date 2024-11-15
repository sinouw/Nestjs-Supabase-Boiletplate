import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProfessionsService } from './professions.service';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { SupabaseGuard } from 'src/common/guards/supabase.guard';
import { RoleGuard, Roles } from 'src/common/guards/role.guard';
import { APP_ROLES } from 'src/common/constants/app.constants';
import { GenericPaginationController } from 'src/common/controllers/generic-admin.controller';
import { Profession } from 'src/modules/professions/entities/profession.entity';

@ApiTags('Admin / Professions')
@Controller('admin/professions')
@UseGuards(SupabaseGuard, RoleGuard)
@ApiBearerAuth('JWT-auth')
@Roles(APP_ROLES.SUPER_ADMIN)
export class ProfessionsController extends GenericPaginationController<
  Profession,
  CreateProfessionDto,
  UpdateProfessionDto
> {
  constructor(private readonly professionsService: ProfessionsService) {
    super(professionsService);
  }
}
