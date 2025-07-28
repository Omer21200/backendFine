// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { supabase } from '../supabase/supabase.client';
import { SuccessResponseDto } from './dto/error-response.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(username: string, password: string): Promise<SuccessResponseDto> {
    type UsuarioConRol = {
      uid: string;
      username: string;
      password: string;
      activo: boolean;
      rol: { nombre: string } | null;
    };

    const { data, error } = await supabase
      .from('usuario')
      .select(
        `
        uid,
        username,
        password,
        activo,
        rol:rol_id ( nombre )
      `
      )
      .eq('username', username)
      .single<UsuarioConRol>();

    // Si hay error en la consulta o no se encuentra el usuario
    if (error) {
      if (error.code === 'PGRST116') {
        // Usuario no encontrado
        throw new NotFoundException({
          statusCode: 404,
          message: 'Usuario no encontrado',
          error: 'Not Found'
        });
      }
      // Otros errores de base de datos
      throw new UnauthorizedException({
        statusCode: 500,
        message: 'Error interno del servidor',
        error: 'Internal Server Error'
      });
    }

    // Si no hay datos (usuario no encontrado)
    if (!data) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Usuario no encontrado',
        error: 'Not Found'
      });
    }

    const rolNombre = data.rol?.nombre;

    if (!rolNombre) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'El usuario no tiene rol asignado',
        error: 'Unauthorized'
      });
    }

    if (!data.activo) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Usuario inactivo',
        error: 'Unauthorized'
      });
    }

    // Validar password (recomiendo bcrypt, pero aquí simple comparación)
    if (data.password !== password) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Contraseña incorrecta',
        error: 'Unauthorized'
      });
    }

    // Crear payload para el token
    const payload = {
      sub: data.uid,
      username: data.username,
      rol: rolNombre,
    };

    const token = this.jwtService.sign(payload);

    return {
      statusCode: 200,
      message: 'Login exitoso',
      token
    };
  }
}
