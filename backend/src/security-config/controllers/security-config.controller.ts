import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SecurityConfigService } from '../services/security-config.service';
import { ActualizarConfiguracionDto } from '../dto/actualizar-configuracion.dto';
import { GuardarConfiguracionDto } from '../dto/guardar-configuracion.dto';

@Controller('configuracion')
export class SecurityConfigController {
  constructor(private readonly service: SecurityConfigService) {}

  @Get('actual')
  getActual() {
    return this.service.getConfiguracionActual();
  }

  @Put('actual')
  actualizarActual(@Body() dto: ActualizarConfiguracionDto) {
    return this.service.actualizarConfiguracion(dto);
  }

  @Post('guardar')
  guardar(@Body() dto: GuardarConfiguracionDto) {
    return this.service.guardarConfiguracion(dto);
  }

  @Get('historial')
  getHistorial() {
    return this.service.getHistorial();
  }

  @Post('restaurar/:id')
  restaurar(@Param('id') id: string) {
    return this.service.restaurarConfiguracion(id);
  }

  @Post('activar')
  activar() {
    return this.service.activarModoInfantil();
  }

  @Post('desactivar')
  desactivar() {
    return this.service.desactivarModoInfantil();
  }

  @Delete('historial/:id')
  eliminar(@Param('id') id: string) {
    return this.service.eliminarDelHistorial(id);
  }
}
