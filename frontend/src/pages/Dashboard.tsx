import { useState, useEffect, useCallback } from 'react';
import type { ConfiguracionState, ConfiguracionSnapshot, Toast } from '../types';
import * as api from '../services/api';
import Navbar from '../components/Navbar';
import StatusCard from '../components/StatusCard';
import ConfigForm from '../components/ConfigForm';
import QuickActions from '../components/QuickActions';
import HistoryList from '../components/HistoryList';

const Dashboard = () => {
  const [config, setConfig] = useState<ConfiguracionState>({
    ventanasBloqueadas: false,
    puertasBloqueadas: false,
    cinturonObligatorio: false,
    velocidadMaxima: 120,
  });
  const [historial, setHistorial] = useState<ConfiguracionSnapshot[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [conectado, setConectado] = useState(true);

  const showToast = useCallback((text: string, type: Toast['type'] = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const loadData = useCallback(async () => {
    try {
      const [configActual, hist] = await Promise.all([
        api.getConfiguracionActual(),
        api.getHistorial(),
      ]);
      setConfig(configActual);
      setHistorial(hist);
      setConectado(true);
    } catch {
      setConectado(false);
      showToast('No se puede conectar con el backend (puerto 3001)', 'error');
    }
  }, [showToast]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleConfigChange = async (updates: Partial<ConfiguracionState>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
    try {
      const updated = await api.actualizarConfiguracion(updates);
      setConfig(updated);
    } catch {
      showToast('Error al actualizar configuración', 'error');
      loadData();
    }
  };

  const handleAplicarPerfil = async (perfilConfig: ConfiguracionState) => {
    try {
      const updated = await api.actualizarConfiguracion(perfilConfig);
      setConfig(updated);
      showToast('Perfil aplicado', 'info');
    } catch {
      showToast('Error al aplicar perfil', 'error');
    }
  };

  const handleGuardar = async (nombre: string) => {
    setLoading(true);
    try {
      await api.guardarConfiguracion(nombre);
      await loadData();
      showToast(`Configuración "${nombre}" guardada`);
    } catch {
      showToast('Error al guardar la configuración', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRestaurar = async (id: string) => {
    setLoading(true);
    try {
      const res = await api.restaurarConfiguracion(id);
      setConfig(res.estado);
      showToast(`Restaurado desde: "${res.restauradoDesde.nombre}"`);
    } catch {
      showToast('Error al restaurar', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id: string) => {
    setLoading(true);
    try {
      await api.eliminarDelHistorial(id);
      setHistorial((prev) => prev.filter((s) => s.id !== id));
      showToast('Configuración eliminada del historial');
    } catch {
      showToast('Error al eliminar', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleActivar = async () => {
    try {
      const updated = await api.activarModoInfantil();
      setConfig(updated);
      showToast('Modo de seguridad activado');
    } catch {
      showToast('Error al activar', 'error');
    }
  };

  const handleDesactivar = async () => {
    try {
      const updated = await api.desactivarModoInfantil();
      setConfig(updated);
      showToast('Modo de seguridad desactivado');
    } catch {
      showToast('Error al desactivar', 'error');
    }
  };

  const modoActivo =
    config.ventanasBloqueadas || config.puertasBloqueadas || config.cinturonObligatorio;

  return (
    <div className="min-h-screen" style={{ background: 'radial-gradient(ellipse at 50% -10%, #0a1a28 0%, #030709 55%)' }}>
      <Navbar modoActivo={modoActivo} />

      {/* Connection banner */}
      {!conectado && (
        <div className="bg-red-950/40 border-b border-red-800/30 px-6 py-2">
          <p className="text-red-400 font-mono text-xs text-center tracking-wider">
            BACKEND DESCONECTADO — ejecuta:{' '}
            <code className="bg-red-950/60 px-1.5 py-0.5 rounded border border-red-800/30">
              cd backend &amp;&amp; npm run start:dev
            </code>
          </p>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border font-mono text-xs tracking-wider transition-all ${
          toast.type === 'success' ? 'bg-green-950/90 border-green-700/40 text-green-300' :
          toast.type === 'error'   ? 'bg-red-950/90 border-red-700/40 text-red-300' :
                                     'bg-cyan-950/90 border-cyan-700/40 text-cyan-300'
        }`}>
          {toast.type === 'success' && <div className="w-1.5 h-1.5 rounded-full bg-green-400" />}
          {toast.type === 'error'   && <div className="w-1.5 h-1.5 rounded-full bg-red-400" />}
          {toast.type === 'info'    && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
          {toast.text}
        </div>
      )}

      <main className="max-w-7xl mx-auto px-5 py-5">
        {/* Decorative top scan line */}
        <div className="h-px w-full mb-5" style={{ background: 'linear-gradient(90deg, transparent, #0a2040, #06b6d4, #0a2040, transparent)' }} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* ── Left: Instrument cluster ── */}
          <div className="lg:col-span-2">
            <StatusCard config={config} />
          </div>

          {/* ── Center: Controls ── */}
          <div className="lg:col-span-2 space-y-5">
            <ConfigForm config={config} onChange={handleConfigChange} />
            <QuickActions
              onActivar={handleActivar}
              onDesactivar={handleDesactivar}
              onGuardar={handleGuardar}
              onAplicarPerfil={handleAplicarPerfil}
              loading={loading}
              modoActivo={modoActivo}
            />
          </div>

          {/* ── Right: Trip computer ── */}
          <div className="lg:col-span-1">
            <HistoryList
              historial={historial}
              onRestaurar={handleRestaurar}
              onEliminar={handleEliminar}
              loading={loading}
            />
          </div>
        </div>

        {/* Decorative bottom scan line */}
        <div className="h-px w-full mt-5" style={{ background: 'linear-gradient(90deg, transparent, #0a2040, #06b6d4, #0a2040, transparent)' }} />
      </main>
    </div>
  );
};

export default Dashboard;
