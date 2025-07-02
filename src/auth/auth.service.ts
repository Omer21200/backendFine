// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { supabase } from '../supabase/supabase.client';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(username: string, password: string) {
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

    if (error || !data) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    const rolNombre = data.rol?.nombre;

    if (!rolNombre) {
      throw new UnauthorizedException('El usuario no tiene rol asignado');
    }

    if (!data.activo) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    // Validar password (recomiendo bcrypt, pero aquí simple comparación)
    if (data.password !== password) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    // Crear payload para el token
    const payload = {
      sub: data.uid,
      username: data.username,
      rol: rolNombre,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login exitoso',
      token
    };
  }
}
