export interface ConfiguracionState {
  ventanasBloqueadas: boolean;
  puertasBloqueadas: boolean;
  cinturonObligatorio: boolean;
  velocidadMaxima: number;
}

export interface ConfiguracionSnapshot {
  id: string;
  nombre: string;
  fecha: string;
  ventanasBloqueadas: boolean;
  puertasBloqueadas: boolean;
  cinturonObligatorio: boolean;
  velocidadMaxima: number;
}

export interface RestaurarResponse {
  estado: ConfiguracionState;
  restauradoDesde: ConfiguracionSnapshot;
}

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  text: string;
  type: ToastType;
}

export const PERFILES_RAPIDOS: { nombre: string; config: ConfiguracionState }[] = [
  {
    nombre: 'Modo Estricto',
    config: { ventanasBloqueadas: true, puertasBloqueadas: true, cinturonObligatorio: true, velocidadMaxima: 60 },
  },
  {
    nombre: 'Modo Moderado',
    config: { ventanasBloqueadas: true, puertasBloqueadas: true, cinturonObligatorio: false, velocidadMaxima: 100 },
  },
  {
    nombre: 'Viaje Familiar',
    config: { ventanasBloqueadas: false, puertasBloqueadas: true, cinturonObligatorio: true, velocidadMaxima: 110 },
  },
  {
    nombre: 'Desactivado',
    config: { ventanasBloqueadas: false, puertasBloqueadas: false, cinturonObligatorio: false, velocidadMaxima: 120 },
  },
];
