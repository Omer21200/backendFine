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
        return await this.docenteService.listarDocentes();
    }

    @Patch()
    async actualizarDocente(@Body() dto: UpdateDocenteDto) {
        return this.docenteService.actualizarDocente(dto);
    }

}
