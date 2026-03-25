# Backend Standards — Nuxt Server Layer

> Full reference: `ai-specs/specs/backend-standards.mdc`

## Stack

| Technology | Role |
|---|---|
| **Nuxt 4 / Nitro** | Server engine — replaces Express |
| **H3** | HTTP event handlers — replaces Express controllers |
| **TypeScript 5** | Strict mode throughout |
| **Prisma 7** | ORM with `@prisma/adapter-pg` |
| **PostgreSQL** | Database (Docker in dev) |
| **Valibot** | Request validation |
| **Vitest** | Unit testing (replaces Jest) |

## DDD Layer Map

```
server/api/            ← Presentation: H3 route handlers
server/services/       ← Application: business logic
server/domain/         ← Domain: entities + repository interfaces
server/infrastructure/ ← Infrastructure: Prisma implementations
server/db/prisma/      ← Schema, migrations, seed
```

## Key rules

### H3 route handlers are thin
```typescript
// server/api/users/index.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const validated = parse(CreateUserSchema, body)         // validate
  const user = await getUserService().create(validated)   // delegate
  return { data: user }                                   // return
})
```
No business logic in handlers. Parse → validate → call service → return.

### Services never touch H3 or Prisma
```typescript
// server/services/userService.ts
export class UserService {
  constructor(private repo: IUserRepository) {}  // interface, not Prisma

  async create(data: CreateUserData) {
    const existing = await this.repo.findByEmail(data.email)
    if (existing) throw new Error('Email already registered')
    return this.repo.create(data)
  }
}
```

### Only the infrastructure layer imports Prisma
```typescript
// server/infrastructure/repositories/PrismaUserRepository.ts
import { prisma } from '../../utils/prisma'   // ← only here

export class PrismaUserRepository implements IUserRepository {
  async findById(id: number) {
    const record = await prisma.user.findUnique({ where: { id } })
    return record ? new User(record) : null    // always map to domain entity
  }
}
```

### Soft deletes only — never hard DELETE
```prisma
model User {
  deletedAt DateTime?   // set this instead of deleting the row
}
```

## Testing

- **Tool**: Vitest
- **Coverage threshold**: 90% branches, functions, lines, statements
- **Pattern**: AAA (Arrange, Act, Assert)
- **Mock repositories** in service tests — never mock Prisma directly

```typescript
describe('UserService.create', () => {
  it('throws when email already registered', async () => {
    mockRepo.findByEmail.mockResolvedValue(existingUser)
    await expect(service.create(input)).rejects.toThrow('Email already registered')
  })
})
```
