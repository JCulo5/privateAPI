import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  ClassSerializerInterceptor,
  Session,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import {CurrentUser} from './decorators/current-user.decorator'

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService,private authService: AuthService) {}

  // @Get('/colors/:color')
  // setColor(@Param('color') color:string, @Session() session:any){
  //   session.color=color;
  // }

  // @Get('/colors')
  // getColor(@Session() session:any){
  //   return session.color;
  // }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  // @Get('/whoami')
  // whoAmI(@Session() session:any){
  //   return this.usersService.findOne(session.userId);
  // }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser('asdf') user:User){
    return user;
  }

  @Post('/signout')
  signOut(@Session() session:any){
    session.userId=null;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session:any) {
     const user=await this.authService.signup(body.email, body.password);
     session.userId=user.id;
     return user;
  }

  @Post('/signin')
  async signin(@Body() body:CreateUserDto, @Session() session:any){
     const user=await this.authService.signin(body.email,body.password);
     session.userId=user.id;
     return user;
  }

  //@UseInterceptors(new SerializeInterceptor(UserDto))
  @Get(':id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
