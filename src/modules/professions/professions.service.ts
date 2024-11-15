import { Injectable, Logger } from '@nestjs/common';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { BaseAdminService } from 'src/common/services/generic-admin.service';
import { SupabaseService } from 'src/infrastructure/supabase/supabase.service';
import { PaginationService } from 'src/common/services/pagination.service';
import { Profession } from 'src/modules/professions/entities/profession.entity';

@Injectable()
export class ProfessionsService extends BaseAdminService<
  Profession,
  CreateProfessionDto
> {
  protected readonly tableName = 'Profession';
  protected readonly logger = new Logger(ProfessionsService.name);

  constructor(
    protected readonly supabaseService: SupabaseService,
    protected readonly paginationService: PaginationService,
  ) {
    super(supabaseService, paginationService, ProfessionsService.name);
  }
}
