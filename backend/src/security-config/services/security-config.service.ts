import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfiguracionOriginator } from '../models/configuracion-originator';
import { ConfiguracionCaretaker } from '../models/configuracion-caretaker';
import { ActualizarConfiguracionDto } from '../dto/actualizar-configuracion.dto';
import { GuardarConfiguracionDto } from '../dto/guardar-configuracion.dto';

@Injectable()
export class SecurityConfigService {
  private readonly originator = new ConfiguracionOriginator();
  private readonly caretaker = new ConfiguracionCaretaker();

  getConfiguracionActual() {
    return this.originator.getEstado();
  }

  actualizarConfiguracion(dto: ActualizarConfiguracionDto) {
    this.originator.setEstado(dto);
    return this.originator.getEstado();
  }

  guardarConfiguracion(dto: GuardarConfiguracionDto) {
    const memento = this.originator.crearMemento(dto.nombre);
    this.caretaker.guardarEstado(memento);
    return memento.toJSON();
  }

  getHistorial() {
    return this.caretaker.obtenerHistorial().map((m) => m.toJSON());
  }

  restaurarConfiguracion(id: string) {
    const memento = this.caretaker.obtenerPorId(id);
    if (!memento) {
      throw new NotFoundException(`Configuración con id "${id}" no encontrada en el historial`);
    }
    this.originator.restaurarMemento(memento);
    return {
      estado: this.originator.getEstado(),
      restauradoDesde: memento.toJSON(),
    };
  }

  activarModoInfantil() {
    this.originator.activarModoInfantil();
    return this.originator.getEstado();
  }

  desactivarModoInfantil() {
    this.originator.desactivarModoInfantil();
    return this.originator.getEstado();
  }

  eliminarDelHistorial(id: string) {
    const eliminado = this.caretaker.eliminarPorId(id);
    if (!eliminado) {
      throw new NotFoundException(`Configuración con id "${id}" no encontrada`);
    }
    return { mensaje: 'Configuración eliminada del historial' };
  }
}
