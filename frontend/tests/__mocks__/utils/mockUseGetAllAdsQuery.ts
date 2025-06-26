// tests/__mocks__/mockUseGetAllAdsQuery.ts
import { vi } from 'vitest'

export const mockUseGetAllAdsQuery = vi.fn()

vi.mock('../../src/generated/graphql-types', () => ({
  useGetAllAdsQuery: () => mockUseGetAllAdsQuery(),
}))
