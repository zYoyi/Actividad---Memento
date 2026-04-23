import { randomUUID } from 'crypto';

export class ConfiguracionMemento {
  private readonly id: string;
  private readonly nombre: string;
  private readonly fecha: Date;
  private readonly ventanasBloqueadas: boolean;
  private readonly puertasBloqueadas: boolean;
  private readonly cinturonObligatorio: boolean;
  private readonly velocidadMaxima: number;

  constructor(
    nombre: string,
    ventanasBloqueadas: boolean,
    puertasBloqueadas: boolean,
    cinturonObligatorio: boolean,
    velocidadMaxima: number,
  ) {
    this.id = randomUUID();
    this.nombre = nombre;
    this.fecha = new Date();
    this.ventanasBloqueadas = ventanasBloqueadas;
    this.puertasBloqueadas = puertasBloqueadas;
    this.cinturonObligatorio = cinturonObligatorio;
    this.velocidadMaxima = velocidadMaxima;
  }

  getId(): string {
    return this.id;
  }

  getNombre(): string {
    return this.nombre;
  }

  getFecha(): Date {
    return this.fecha;
  }

  getVentanasBloqueadas(): boolean {
    return this.ventanasBloqueadas;
  }

  getPuertasBloqueadas(): boolean {
    return this.puertasBloqueadas;
  }

  getCinturonObligatorio(): boolean {
    return this.cinturonObligatorio;
  }

  getVelocidadMaxima(): number {
    return this.velocidadMaxima;
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      fecha: this.fecha,
      ventanasBloqueadas: this.ventanasBloqueadas,
      puertasBloqueadas: this.puertasBloqueadas,
      cinturonObligatorio: this.cinturonObligatorio,
      velocidadMaxima: this.velocidadMaxima,
    };
  }
}
