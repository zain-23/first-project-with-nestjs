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

@Controller('users')
export class UsersController {
  @Get() // Get all usr /users or query Params /user?role=ADMIN
  findAll(@Query('role') role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    return [];
  }

  @Get(':id') // find single user /users/:id
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Post() // /users
  createUser(@Body() user: {}) {
    return user;
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() user: {}) {
    return { id, ...user };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return { id, message: 'user  deleted' };
  }
}
