import { Injectable, Logger } from '@nestjs/common';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { BaseAdminService } from 'src/common/services/generic-admin.service';
import { SupabaseService } from 'src/infrastructure/supabase/supabase.service';
import { PaginationService } from 'src/common/services/pagination.service';

@Injectable()
export class AddressesService extends BaseAdminService<
  Address,
  CreateAddressDto
> {
  protected readonly tableName = 'Address';
  protected readonly logger = new Logger(AddressesService.name);

  constructor(
    protected readonly supabaseService: SupabaseService,
    protected readonly paginationService: PaginationService,
  ) {
    super(supabaseService, paginationService, AddressesService.name);
  }

  async createUserAddress(
    userId: string,
    createAddressDto: CreateAddressDto,
  ): Promise<Address> {
    try {
      this.logger.log(`Creating address for user ${userId}`);

      if (createAddressDto.is_default) {
        // If new address is default, remove default from other addresses
        await this.supabaseService
          .getClient()
          .from(this.tableName)
          .update({ is_default: false })
          .eq('user_id', userId);
      }

      const { data, error } = await this.supabaseService
        .getClient()
        .from(this.tableName)
        .insert({
          ...createAddressDto,
          user_id: userId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        this.logger.error(`Error creating address: ${error.message}`);
        throw error;
      }

      return data;
    } catch (error) {
      this.logger.error(`Failed to create address for user ${userId}:`, error);
      throw error;
    }
  }

  async getUserAddresses(userId: string): Promise<Address[]> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .order('is_default', { ascending: false });

    if (error) throw error;
    return data;
  }

  async updateUserAddress(
    userId: string,
    addressId: string,
    updateAddressDto: any,
  ): Promise<Address> {
    try {
      if (updateAddressDto.is_default) {
        // If updating to default, remove default from other addresses
        await this.supabaseService
          .getClient()
          .from(this.tableName)
          .update({ is_default: false })
          .eq('user_id', userId);
      }

      const { data, error } = await this.supabaseService
        .getClient()
        .from(this.tableName)
        .update({
          ...updateAddressDto,
          updated_at: new Date().toISOString(),
        })
        .eq('id', addressId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      this.logger.error(
        `Failed to update address ${addressId} for user ${userId}:`,
        error,
      );
      throw error;
    }
  }

  async deleteUserAddress(userId: string, addressId: string): Promise<void> {
    const { error } = await this.supabaseService
      .getClient()
      .from(this.tableName)
      .delete()
      .eq('id', addressId)
      .eq('user_id', userId);

    if (error) throw error;
  }
}
