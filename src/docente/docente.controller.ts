// src/docente/docente.controller.ts
import { Controller, Post, Body, Get, Patch } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { CreateDocenteDto, UpdateDocenteDto } from './dto/create-docente.dto';

@Controller('docentes')
export class DocenteController {
    constructor(private readonly docenteService: DocenteService) { }

    @Post()
    async crear(@Body() createDocenteDto: CreateDocenteDto) {
        return this.docenteService.crearDocente(createDocenteDto);
    }

    @Get()
    async listar() {
        return this.docenteService.listarDocentes();
    }

    @Get('inactivos')
    async listarInactivos() {
        return this.docenteService.listarDocentesInactivos();
    }

    @Patch()
    async actualizarDocente(@Body() dto: UpdateDocenteDto) {
        return this.docenteService.actualizarDocente(dto);
    }

    @Patch('estado')
    async cambiarEstado(@Body() body: { docente_id: string; activo: boolean }) {
        const { docente_id, activo } = body;
        return this.docenteService.activarDesactivarDocente(docente_id, activo);
    }
}
