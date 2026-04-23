import { ConfiguracionMemento } from '../memento/configuracion-memento';

/**
 * Caretaker: administra el historial de mementos.
 * No conoce el contenido interno de los mementos — solo los almacena y recupera.
 */
export class ConfiguracionCaretaker {
  private readonly historial: ConfiguracionMemento[] = [];

  guardarEstado(memento: ConfiguracionMemento): void {
    this.historial.push(memento);
  }

  obtenerHistorial(): ConfiguracionMemento[] {
    return [...this.historial];
  }

  obtenerPorId(id: string): ConfiguracionMemento | undefined {
    return this.historial.find((m) => m.getId() === id);
  }

  eliminarPorId(id: string): boolean {
    const index = this.historial.findIndex((m) => m.getId() === id);
    if (index === -1) return false;
    this.historial.splice(index, 1);
    return true;
  }

  contarEstados(): number {
    return this.historial.length;
  }
}
