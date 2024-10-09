import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async create(createEmployee: Prisma.EmployeeCreateInput) {
    return this.prisma.employee.create({
      data: createEmployee,
    });
  }

  async findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    if (role) {
      return this.prisma.employee.findMany({
        where: {
          role,
        },
      });
    }

    return this.prisma.employee.findMany({});
  }

  async findOne(id: string) {
    return this.prisma.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateEmployee: Prisma.EmployeeUpdateInput) {
    const updatedUser = this.prisma.employee.update({
      where: {
        id,
      },
      data: {
        ...updateEmployee,
      },
    });

    return updatedUser;
  }

  async delete(id: string) {
    return this.prisma.employee.delete({
      where: {
        id,
      },
    });
  }
}
