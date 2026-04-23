# Configuración de Seguridad Infantil — Patrón Memento

Sistema web para administrar configuraciones de seguridad vehicular con historial de estados guardados y restaurables, implementando el **Patrón de Diseño Memento**.

## Diagrama UML — Patrón Memento

```
┌─────────────────────────────────────────────┐
│            PATRÓN MEMENTO                   │
└─────────────────────────────────────────────┘

┌──────────────────────────────────┐
│       <<Originator>>             │
│    ConfiguracionOriginator       │
├──────────────────────────────────┤
│  - ventanasBloqueadas: boolean   │
│  - puertasBloqueadas: boolean    │
│  - cinturonObligatorio: boolean  │
│  - velocidadMaxima: number       │
├──────────────────────────────────┤
│  + getEstado(): State            │
│  + setEstado(state): void        │
│  + crearMemento(nombre)  ───────────────────────────┐
│  + restaurarMemento(m)   ◄──────────────────────────┤
│  + activarModoInfantil(): void   │                   │
│  + desactivarModoInfantil(): void│                   │
└──────────────────────────────────┘                   │
          │ crea / restaura                            │
          ▼                                            │
┌──────────────────────────────────┐                   │
│          <<Memento>>             │                   │
│     ConfiguracionMemento         │                   │
├──────────────────────────────────┤                   │
│  - id: string (UUID)             │                   │
│  - nombre: string                │                   │
│  - fecha: Date                   │                   │
│  - ventanasBloqueadas: boolean   │                   │
│  - puertasBloqueadas: boolean    │                   │
│  - cinturonObligatorio: boolean  │                   │
│  - velocidadMaxima: number       │                   │
├──────────────────────────────────┤                   │
│  + getId(): string               │                   │
│  + getNombre(): string           │                   │
│  + getFecha(): Date              │                   │
│  + getVentanasBloqueadas(): bool │◄──────────────────┘
│  + getPuertasBloqueadas(): bool  │
│  + getCinturonObligatorio(): bool│
│  + getVelocidadMaxima(): number  │
│  + toJSON(): object              │
└──────────────────────────────────┘
          ▲ almacena
          │
┌──────────────────────────────────┐
│         <<Caretaker>>            │
│     ConfiguracionCaretaker       │
├──────────────────────────────────┤
│  - historial: Memento[]          │
├──────────────────────────────────┤
│  + guardarEstado(m): void        │
│  + obtenerHistorial(): Memento[] │
│  + obtenerPorId(id): Memento?    │
│  + eliminarPorId(id): boolean    │
│  + contarEstados(): number       │
└──────────────────────────────────┘
```

## ¿Por qué NO es un CRUD tradicional?

Un CRUD tradicional expone operaciones directas sobre entidades persistidas en base de datos (Create, Read, Update, Delete). Este sistema es fundamentalmente diferente:

| CRUD                              | Este Sistema (Memento)                        |
|-----------------------------------|-----------------------------------------------|
| Modifica registros en BD          | Captura snapshots inmutables del estado       |
| El historial no existe            | El historial es la razón de ser del patrón    |
| Cualquier capa accede al estado   | Solo el Originator gestiona su propio estado  |
| Restaurar = traer un registro     | Restaurar = inyectar un snapshot en memoria   |
| Estado expuesto directamente      | Estado encapsulado con getters inmutables     |

**Principios Memento demostrados:**
- **Encapsulamiento:** `ConfiguracionMemento` expone solo getters; nadie puede modificar un snapshot ya creado.
- **Separación de responsabilidades:** El `Originator` sabe cómo crear/restaurar su estado; el `Caretaker` solo guarda y recupera mementos sin entender su contenido.
- **Snapshots sin recalcular:** Restaurar un estado no recalcula nada — se inyectan los valores exactos del momento de guardado.
- **Estado independiente del almacenamiento:** Los mementos viven en memoria, no en BD. La restauración es instantánea.

## Endpoints REST

| Método | Ruta                        | Descripción                              |
|--------|-----------------------------|------------------------------------------|
| GET    | /configuracion/actual       | Obtiene el estado actual del Originator  |
| PUT    | /configuracion/actual       | Actualiza el estado actual               |
| POST   | /configuracion/guardar      | Crea un Memento del estado actual        |
| GET    | /configuracion/historial    | Lista todos los Mementos del Caretaker   |
| POST   | /configuracion/restaurar/:id| Restaura el Originator desde un Memento |
| POST   | /configuracion/activar      | Aplica perfil de seguridad máxima        |
| POST   | /configuracion/desactivar   | Aplica perfil sin restricciones          |
| DELETE | /configuracion/historial/:id| Elimina un Memento del historial         |

## Instrucciones de ejecución

### Backend
```bash
cd backend
npm run start:dev
# Corre en http://localhost:3001
```

### Frontend
```bash
cd frontend
npm run dev
# Corre en http://localhost:5173
```

## Estructura del proyecto

```
memento/
├── backend/
│   └── src/
│       └── security-config/
│           ├── memento/
│           │   └── configuracion-memento.ts    ← Memento
│           ├── models/
│           │   ├── configuracion-originator.ts ← Originator
│           │   └── configuracion-caretaker.ts  ← Caretaker
│           ├── services/
│           │   └── security-config.service.ts
│           ├── controllers/
│           │   └── security-config.controller.ts
│           ├── dto/
│           └── security-config.module.ts
└── frontend/
    └── src/
        ├── components/
        ├── pages/
        ├── services/
        └── types/
```
