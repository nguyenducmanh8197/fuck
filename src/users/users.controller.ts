import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-users.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.userService.create(body.email, body.password, body.admin);
  }
  @Get('/:id')
  finUser(@Param('id') id: string) {
    this.userService.findOne(parseInt(id));
  }

  @Get()
  finAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }
}
