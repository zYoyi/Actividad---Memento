import axios from 'axios';
import type { ConfiguracionState, ConfiguracionSnapshot, RestaurarResponse } from '../types';

const api = axios.create({ baseURL: 'http://localhost:3001/configuracion' });

export const getConfiguracionActual = (): Promise<ConfiguracionState> =>
  api.get('/actual').then((r) => r.data);

export const actualizarConfiguracion = (data: Partial<ConfiguracionState>): Promise<ConfiguracionState> =>
  api.put('/actual', data).then((r) => r.data);

export const guardarConfiguracion = (nombre: string): Promise<ConfiguracionSnapshot> =>
  api.post('/guardar', { nombre }).then((r) => r.data);

export const getHistorial = (): Promise<ConfiguracionSnapshot[]> =>
  api.get('/historial').then((r) => r.data);

export const restaurarConfiguracion = (id: string): Promise<RestaurarResponse> =>
  api.post(`/restaurar/${id}`).then((r) => r.data);

export const activarModoInfantil = (): Promise<ConfiguracionState> =>
  api.post('/activar').then((r) => r.data);

export const desactivarModoInfantil = (): Promise<ConfiguracionState> =>
  api.post('/desactivar').then((r) => r.data);

export const eliminarDelHistorial = (id: string): Promise<{ mensaje: string }> =>
  api.delete(`/historial/${id}`).then((r) => r.data);
