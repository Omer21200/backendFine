import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async crear(@Body() dto: CreateUserDto) {
    return this.usuarioService.crearUsuario(dto);
  }

  @Get(':uid')
  async obtenerPorId(@Param('uid') uid: string) {
    return this.usuarioService.obtenerUsuarioPorId(uid);
  }

  @Patch()
  async actualizar(@Body() dto: UpdateUserDto) {
    return this.usuarioService.actualizarUsuario(dto);
  }
}
