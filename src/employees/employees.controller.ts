import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma } from '@prisma/client';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @SkipThrottle({ default: false })
  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    return this.employeesService.findAll(role);
  }

  @Post()
  createEmployee(@Body() createEmployee: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployee);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log({ id });
    return this.employeesService.findOne(id);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id: string) {
    return this.employeesService.delete(id);
  }

  @Patch(':id')
  updateEmployee(
    @Param('id') id: string,
    @Body() updateEmployee: Prisma.EmployeeUpdateInput,
  ) {
    return this.employeesService.update(id, updateEmployee);
  }
}
