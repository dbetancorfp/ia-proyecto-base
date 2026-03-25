# Data Model

This document describes the domain entities, database schema, and relationships for this application.

> **Schema location**: `server/db/prisma/schema.prisma`
> Replace the example entities below with your own domain model as you design the application.

---

## Prisma Schema Conventions

```prisma
// server/db/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Field naming**: camelCase in Prisma models, mapped to snake_case in the database via `@@map` and `@map`.

**Standard fields** every table should have:
```prisma
id        Int      @id @default(autoincrement())
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
deletedAt DateTime?   // soft delete — NEVER hard DELETE
```

---

## Example Domain: Users

This is a minimal example. Replace with your own domain entities.

### Entity: User

Represents an authenticated user of the application.

**Prisma model:**
```prisma
model User {
  id        Int       @id @default(autoincrement())
  name      String    @db.VarChar(100)
  email     String    @unique @db.VarChar(255)
  role      UserRole  @default(MEMBER)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?

  @@map("users")
}

enum UserRole {
  ADMIN
  MEMBER
}
```

**Validation rules** (enforced by Valibot in `server/domain/schemas/`):
- `name`: required, 2–100 characters
- `email`: required, unique, valid email format
- `role`: one of `ADMIN`, `MEMBER`

**Relationships:**
- Add relationships here as the model grows (e.g. `posts: Post[]`)

---

## Entity-Relationship Diagram

Update this diagram as you add new entities. Use text-based ERD or link to a Miro/Figma diagram.

```
[User]
  id (PK)
  name
  email (unique)
  role
  createdAt / updatedAt / deletedAt
```

---

## Repository Interfaces

Each entity has a corresponding interface in `server/domain/repositories/`:

```typescript
// server/domain/repositories/IUserRepository.ts
export interface IUserRepository {
  findById(id: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findAll(opts: { page: number; limit: number }): Promise<{ items: User[]; total: number }>
  create(data: CreateUserData): Promise<User>
  update(id: number, data: Partial<CreateUserData>): Promise<User>
  softDelete(id: number): Promise<void>
}
```

Prisma implementations live in `server/infrastructure/repositories/`.

---

## Adding a New Entity

Checklist for adding a new domain entity:

1. Add the Prisma model to `server/db/prisma/schema.prisma`
2. Run `npm run prisma:migrate:dev -- --name add_[entity]_table`
3. Create the domain entity class in `server/domain/entities/`
4. Create the repository interface in `server/domain/repositories/`
5. Create the Prisma repository implementation in `server/infrastructure/repositories/`
6. Create the service in `server/services/`
7. Create API routes in `server/api/[resource]/`
8. Create Valibot schemas in `server/domain/schemas/`
9. Update this document
10. Update `api-spec.yml` with the new endpoints
