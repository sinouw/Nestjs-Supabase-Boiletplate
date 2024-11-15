import { Injectable, Logger } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { BaseAdminService } from 'src/common/services/generic-admin.service';
import { SupabaseService } from 'src/infrastructure/supabase/supabase.service';
import { PaginationService } from 'src/common/services/pagination.service';

@Injectable()
export class CompaniesService extends BaseAdminService<
  Company,
  CreateCompanyDto
> {
  protected readonly tableName = 'Company';
  protected readonly logger = new Logger(CompaniesService.name);

  constructor(
    protected readonly supabaseService: SupabaseService,
    protected readonly paginationService: PaginationService,
  ) {
    super(supabaseService, paginationService, CompaniesService.name);
  }

  async assignCompanyToUser(
    userId: string,
    companyId: string,
  ): Promise<Company> {
    try {
      this.logger.log(`Assigning company ${companyId} to user ${userId}`);
      const company = await this.get(companyId);
      if (!company) {
        this.logger.error(`Company not found: ${companyId}`);
        throw new Error('Company not found');
      }

      const { data, error } = await this.supabaseService
        .getClient()
        .from(this.tableName)
        .update({
          user_id: userId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', companyId)
        .select()
        .single();

      if (error) {
        this.logger.error(`Error assigning company: ${error.message}`);
        throw error;
      }

      this.logger.log(
        `Successfully assigned company ${companyId} to user ${userId}`,
      );
      return data;
    } catch (error) {
      this.logger.error(
        `Failed to assign company ${companyId} to user ${userId}:`,
        error,
      );
      throw error;
    }
  }

  async getUserCompany(userId: string): Promise<Company> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  }
}
