import { Controller, Post, Body } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async crear(@Body() dto: CreateUserDto) {
    return this.usuarioService.crearUsuario(dto);
  }
}
