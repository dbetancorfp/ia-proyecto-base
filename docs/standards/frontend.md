# Estándares de frontend — Vue 3 + Pinia + PrimeVue

> Referencia completa: `ai-specs/specs/frontend-standards.mdc`

## Stack

| Tecnología | Rol |
|---|---|
| **Nuxt 4** | Framework fullstack, enrutamiento basado en archivos, SSR |
| **Vue 3** | Framework de UI — Composition API con `<script setup>` |
| **TypeScript 5** | Todos los componentes y composables tipados |
| **Pinia** | Gestión de estado (reemplaza Vuex / React Context) |
| **PrimeVue 4** | Librería de componentes (sin Bootstrap, sin Vuetify) |
| **Playwright** | Tests E2E (reemplaza Cypress) |
| **Vitest + @vue/test-utils** | Tests unitarios de componentes |

## Reglas clave

### Siempre `<script setup lang="ts">` — sin Options API

```vue
<script setup lang="ts">
interface Props { user: User; compact?: boolean }
const props = withDefaults(defineProps<Props>(), { compact: false })
const emit = defineEmits<{ select: [user: User] }>()
</script>
```

### Pinia: sintaxis Setup Store

```typescript
// app/stores/useUserStore.ts
export const useUserStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const loading = ref(false)

  async function fetchAll() {
    loading.value = true
    try { users.value = await $fetch('/api/users') }
    finally { loading.value = false }
  }

  return { users, loading, fetchAll }
})
```

### Usa `useFetch` para datos SSR, `$fetch` para mutaciones

```typescript
// En páginas — con soporte SSR
const { data: users, pending } = await useFetch('/api/users')

// En manejadores de eventos — imperativo
async function deleteUser(id: number) {
  await $fetch(`/api/users/${id}`, { method: 'DELETE' })
}
```

Sin Axios. Usa el `$fetch` nativo de Nuxt en todos los casos.

### Revisa PrimeVue antes de escribir un componente personalizado

```vue
<!-- Usa PrimeVue directamente — no necesita wrapper -->
<DataTable :value="users" paginator :rows="10">
  <Column field="name" header="Nombre" sortable />
</DataTable>
```

### Enrutamiento basado en archivos — sin router.ts

```
app/pages/users/index.vue      → /users
app/pages/users/[id].vue       → /users/:id
app/pages/users/[id]/edit.vue  → /users/:id/edit
```

## Testing

### Tests de componentes (Vitest)
```typescript
it('emite select al hacer click', async () => {
  const wrapper = mount(UserCard, { props: { user } })
  await wrapper.trigger('click')
  expect(wrapper.emitted('select')?.[0]).toEqual([user])
})
```

### Tests E2E (Playwright)
```typescript
test('crea un usuario', async ({ page }) => {
  await page.goto('/users/new')
  await page.getByLabel('Nombre').fill('Alicia')
  await page.getByRole('button', { name: 'Guardar' }).click()
  await expect(page).toHaveURL('/users')
})
```
