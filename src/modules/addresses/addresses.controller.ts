import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { SupabaseGuard } from 'src/common/guards/supabase.guard';
import { RoleGuard, Roles } from 'src/common/guards/role.guard';
import { APP_ROLES } from 'src/common/constants/app.constants';
import { GenericPaginationController } from 'src/common/controllers/generic-admin.controller';
import { AddressesService } from './addresses.service';

@ApiTags('Admin / Addresses')
@Controller('admin/addresses')
@UseGuards(SupabaseGuard, RoleGuard)
@ApiBearerAuth('JWT-auth')
@Roles(APP_ROLES.SUPER_ADMIN)
export class AddressesController extends GenericPaginationController<
  Address,
  CreateAddressDto,
  UpdateAddressDto
> {
  constructor(private readonly addressesService: AddressesService) {
    super(addressesService);
  }

  @Post('users/:userId/addresses')
  @ApiOperation({ summary: 'Create user address' })
  async createUserAddress(
    @Param('userId') userId: string,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    try {
      return await this.addressesService.createUserAddress(
        userId,
        createAddressDto,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('users/:userId/addresses')
  @ApiOperation({ summary: 'Get user addresses' })
  async getUserAddresses(@Param('userId') userId: string) {
    try {
      return await this.addressesService.getUserAddresses(userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put('users/:userId/addresses/:addressId')
  @ApiOperation({ summary: 'Update user address' })
  async updateUserAddress(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    try {
      return await this.addressesService.updateUserAddress(
        userId,
        addressId,
        updateAddressDto,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete('users/:userId/addresses/:addressId')
  @ApiOperation({ summary: 'Delete user address' })
  async deleteUserAddress(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string,
  ) {
    try {
      await this.addressesService.deleteUserAddress(userId, addressId);
      return { message: 'Address deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
