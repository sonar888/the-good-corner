import RecentAds from '../src/components/RecentAds'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ads from './__mocks__/data/ads.json'

const allAds = ads.data.getAllAds

// 👇 Put this once at the top
const mockUseGetAllAdsQuery = vi.fn()

vi.mock('../src/generated/graphql-types', () => ({
  useGetAllAdsQuery: () => mockUseGetAllAdsQuery(),
}))

vi.mock('../src/components/AdCard', () => ({
  default: ({ title }: { title: string }) => <h4>{title}</h4>
}))

describe('RecentAds', () => {
  beforeEach(() => {
    mockUseGetAllAdsQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { getAllAds: allAds },
    })

    render(
      <MemoryRouter>
        <RecentAds />
      </MemoryRouter>
    )
  })

  test('has a title "Annonces récentes"', () => {
    const subtitle = screen.getByRole('heading', { level: 2 })
    expect(subtitle).toBeVisible()
    expect(subtitle).toHaveTextContent('Annonces récentes')
  })

  test("has a subtitle 'Nombre d'annonces récentes", () => {
    const subtitle = screen.getByRole('heading', { level: 3 })
    expect(subtitle).toBeVisible()
    expect(subtitle).toHaveTextContent(`Nombre d'annonces récentes: ${allAds.length}`)
  })

  test('shows all ad titles', () => {
    const titles = screen.getAllByRole('heading', { level: 4 })
    expect(titles).toHaveLength(allAds.length)
    allAds.forEach(ad => {
      expect(screen.getByText(ad.title)).toBeInTheDocument()
    })
  })
})

describe('RecentAds Error', () => {
  beforeEach(() => {
    mockUseGetAllAdsQuery.mockReturnValue({
      loading: false,
      error: true,
      data: null,
    })

    render(
      <MemoryRouter>
        <RecentAds />
      </MemoryRouter>
    )
  })

  test('shows error message', () => {
    expect(screen.getByText('Oops! Something went wrong...')).toBeVisible()
  })
})

describe('RecentAds Loading', () => {
  beforeEach(() => {
    mockUseGetAllAdsQuery.mockReturnValue({
      loading: true,
      error: null,
      data: null,
    })

    render(
      <MemoryRouter>
        <RecentAds />
      </MemoryRouter>
    )
  })

  test('shows loading message', () => {
    expect(screen.getByText('Patience, ça charge')).toBeVisible()
  })
})



