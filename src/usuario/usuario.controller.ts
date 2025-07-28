import { Controller, Post, Body, Get, Param, Patch, Delete, HttpCode } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto, UpdateUserAdminDto, ChangePasswordDto } from './dto/update-user.dto';
import { SuccessResponseDto } from './dto/response.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async crear(@Body() dto: CreateUserDto) {
    return this.usuarioService.crearUsuario(dto);
  }

  @Get()
  async obtenerTodos() {
    return this.usuarioService.obtenerTodosUsuarios();
  }

  @Get('eliminados')
  async obtenerEliminados() {
    return this.usuarioService.obtenerUsuariosEliminados();
  }

  @Get(':uid')
  async obtenerPorId(@Param('uid') uid: string) {
    return this.usuarioService.obtenerUsuarioPorId(uid);
  }

  @Patch()
  async actualizar(@Body() dto: UpdateUserDto) {
    return this.usuarioService.actualizarUsuario(dto);
  }

  @Patch('perfil')
  @HttpCode(200)
  async actualizarPerfil(@Body() dto: UpdateProfileDto) {
    return this.usuarioService.actualizarPerfil(dto);
  }

  @Patch('admin')
  @HttpCode(200)
  async actualizarAdmin(@Body() dto: UpdateUserAdminDto) {
    return this.usuarioService.actualizarUsuarioAdmin(dto);
  }

  @Patch('password')
  @HttpCode(200)
  async cambiarPassword(@Body() dto: ChangePasswordDto) {
    return this.usuarioService.cambiarPassword(dto);
  }

  @Delete(':uid')
  @HttpCode(200)
  async eliminar(@Param('uid') uid: string) {
    return this.usuarioService.eliminarUsuario(uid);
  }

  @Patch(':uid/restaurar')
  @HttpCode(200)
  async restaurar(@Param('uid') uid: string) {
    return this.usuarioService.restaurarUsuario(uid);
  }
}
