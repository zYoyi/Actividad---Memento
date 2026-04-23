import { ConfiguracionMemento } from '../memento/configuracion-memento';

export interface ConfiguracionState {
  ventanasBloqueadas: boolean;
  puertasBloqueadas: boolean;
  cinturonObligatorio: boolean;
  velocidadMaxima: number;
}

/**
 * Originator: mantiene el estado actual y sabe cómo crear/restaurar mementos.
 * No expone su estado interno directamente — lo encapsula.
 */
export class ConfiguracionOriginator {
  private ventanasBloqueadas: boolean = false;
  private puertasBloqueadas: boolean = false;
  private cinturonObligatorio: boolean = false;
  private velocidadMaxima: number = 120;

  getEstado(): ConfiguracionState {
    return {
      ventanasBloqueadas: this.ventanasBloqueadas,
      puertasBloqueadas: this.puertasBloqueadas,
      cinturonObligatorio: this.cinturonObligatorio,
      velocidadMaxima: this.velocidadMaxima,
    };
  }

  setEstado(estado: Partial<ConfiguracionState>): void {
    if (estado.ventanasBloqueadas !== undefined)
      this.ventanasBloqueadas = estado.ventanasBloqueadas;
    if (estado.puertasBloqueadas !== undefined)
      this.puertasBloqueadas = estado.puertasBloqueadas;
    if (estado.cinturonObligatorio !== undefined)
      this.cinturonObligatorio = estado.cinturonObligatorio;
    if (estado.velocidadMaxima !== undefined)
      this.velocidadMaxima = estado.velocidadMaxima;
  }

  crearMemento(nombre: string): ConfiguracionMemento {
    return new ConfiguracionMemento(
      nombre,
      this.ventanasBloqueadas,
      this.puertasBloqueadas,
      this.cinturonObligatorio,
      this.velocidadMaxima,
    );
  }

  restaurarMemento(memento: ConfiguracionMemento): void {
    this.ventanasBloqueadas = memento.getVentanasBloqueadas();
    this.puertasBloqueadas = memento.getPuertasBloqueadas();
    this.cinturonObligatorio = memento.getCinturonObligatorio();
    this.velocidadMaxima = memento.getVelocidadMaxima();
  }

  activarModoInfantil(): void {
    this.ventanasBloqueadas = true;
    this.puertasBloqueadas = true;
    this.cinturonObligatorio = true;
    this.velocidadMaxima = 80;
  }

  desactivarModoInfantil(): void {
    this.ventanasBloqueadas = false;
    this.puertasBloqueadas = false;
    this.cinturonObligatorio = false;
    this.velocidadMaxima = 120;
  }
}
