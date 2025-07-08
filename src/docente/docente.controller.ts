// src/docente/docente.controller.ts
import { Controller, Post, Body,Get } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { CreateDocenteDto } from './dto/create-docente.dto';

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

}
