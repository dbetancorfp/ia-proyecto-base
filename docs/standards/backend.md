# Estándares de backend — Capa de servidor Nuxt

> Referencia completa: `ai-specs/specs/backend-standards.mdc`

## Stack

| Tecnología | Rol |
|---|---|
| **Nuxt 4 / Nitro** | Motor del servidor — reemplaza Express |
| **H3** | Manejadores de eventos HTTP — reemplaza los controladores de Express |
| **TypeScript 5** | Modo estricto en todo el código |
| **Prisma 7** | ORM con `@prisma/adapter-pg` |
| **PostgreSQL** | Base de datos (Docker en desarrollo) |
| **Valibot** | Validación de requests |
| **Vitest** | Tests unitarios (reemplaza Jest) |

## Mapa de capas DDD

```
server/api/            ← Presentación: manejadores de rutas H3
server/services/       ← Aplicación: lógica de negocio
server/domain/         ← Dominio: entidades + interfaces de repositorio
server/infrastructure/ ← Infraestructura: implementaciones con Prisma
server/db/prisma/      ← Esquema, migraciones, seed
```

## Reglas clave

### Los manejadores H3 son delgados
```typescript
// server/api/users/index.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const validated = parse(CreateUserSchema, body)         // validar
  const user = await getUserService().create(validated)   // delegar
  return { data: user }                                   // devolver
})
```
Sin lógica de negocio en los manejadores. Parsear → validar → llamar al servicio → devolver.

### Los servicios nunca tocan H3 ni Prisma
```typescript
// server/services/userService.ts
export class UserService {
  constructor(private repo: IUserRepository) {}  // interfaz, no Prisma

  async create(data: CreateUserData) {
    const existing = await this.repo.findByEmail(data.email)
    if (existing) throw new Error('Email already registered')
    return this.repo.create(data)
  }
}
```

### Solo la capa de infraestructura importa Prisma
```typescript
// server/infrastructure/repositories/PrismaUserRepository.ts
import { prisma } from '../../utils/prisma'   // ← solo aquí

export class PrismaUserRepository implements IUserRepository {
  async findById(id: number) {
    const record = await prisma.user.findUnique({ where: { id } })
    return record ? new User(record) : null    // siempre mapear a entidad de dominio
  }
}
```

### Solo soft deletes — nunca DELETE directo
```prisma
model User {
  deletedAt DateTime?   // asignar esto en lugar de eliminar el registro
}
```

## Testing

- **Herramienta**: Vitest
- **Umbral de cobertura**: 90% en ramas, funciones, líneas y sentencias
- **Patrón**: AAA (Arrange, Act, Assert)
- **Mockear repositorios** en tests de servicios — nunca mockear Prisma directamente

```typescript
describe('UserService.create', () => {
  it('throws when email already registered', async () => {
    mockRepo.findByEmail.mockResolvedValue(existingUser)
    await expect(service.create(input)).rejects.toThrow('Email already registered')
  })
})
```
