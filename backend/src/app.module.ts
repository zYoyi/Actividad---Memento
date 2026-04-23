import { Module, Controller, Get } from '@nestjs/common';
import { SecurityConfigModule } from './security-config/security-config.module';

@Controller()
class AppController {
  @Get()
  info() {
    return {
      nombre: 'API - Configuración de Seguridad Infantil',
      patron: 'Memento',
      version: '1.0.0',
      endpoints: [
        'GET  /configuracion/actual',
        'PUT  /configuracion/actual',
        'POST /configuracion/guardar',
        'GET  /configuracion/historial',
        'POST /configuracion/restaurar/:id',
        'POST /configuracion/activar',
        'POST /configuracion/desactivar',
        'DELETE /configuracion/historial/:id',
      ],
      frontend: 'http://localhost:5174',
    };
  }
}

@Module({
  imports: [SecurityConfigModule],
  controllers: [AppController],
})
export class AppModule {}
