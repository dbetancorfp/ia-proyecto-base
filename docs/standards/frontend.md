# Frontend Standards — Vue 3 + Pinia + PrimeVue

> Full reference: `ai-specs/specs/frontend-standards.mdc`

## Stack

| Technology | Role |
|---|---|
| **Nuxt 4** | Fullstack framework, file-based routing, SSR |
| **Vue 3** | UI framework — Composition API with `<script setup>` |
| **TypeScript 5** | All components and composables typed |
| **Pinia** | State management (replaces Vuex / React Context) |
| **PrimeVue 4** | Component library (no Bootstrap, no Vuetify) |
| **Playwright** | E2E testing (replaces Cypress) |
| **Vitest + @vue/test-utils** | Component unit testing |

## Key rules

### Always `<script setup lang="ts">` — no Options API

```vue
<script setup lang="ts">
interface Props { user: User; compact?: boolean }
const props = withDefaults(defineProps<Props>(), { compact: false })
const emit = defineEmits<{ select: [user: User] }>()
</script>
```

### Pinia: Setup Store syntax

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

### Use `useFetch` for SSR data, `$fetch` for mutations

```typescript
// In pages — SSR-aware
const { data: users, pending } = await useFetch('/api/users')

// In event handlers — imperative
async function deleteUser(id: number) {
  await $fetch(`/api/users/${id}`, { method: 'DELETE' })
}
```

No Axios. Use Nuxt's built-in `$fetch` everywhere.

### Check PrimeVue before writing a custom component

```vue
<!-- Use PrimeVue directly — no wrapper needed -->
<DataTable :value="users" paginator :rows="10">
  <Column field="name" header="Name" sortable />
</DataTable>
```

### File-based routing — no router.ts

```
app/pages/users/index.vue      → /users
app/pages/users/[id].vue       → /users/:id
app/pages/users/[id]/edit.vue  → /users/:id/edit
```

## Testing

### Component tests (Vitest)
```typescript
it('emits select on click', async () => {
  const wrapper = mount(UserCard, { props: { user } })
  await wrapper.trigger('click')
  expect(wrapper.emitted('select')?.[0]).toEqual([user])
})
```

### E2E tests (Playwright)
```typescript
test('creates a user', async ({ page }) => {
  await page.goto('/users/new')
  await page.getByLabel('Name').fill('Alice')
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page).toHaveURL('/users')
})
```
