import React from 'react'
import RecentAds from '../src/components/RecentAds'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'


// 👇 Mock the hook from the generated file
vi.mock('../src/generated/graphql-types', () => ({
  useGetAllAdsQuery: () => ({
    loading: false,
    error: null,
    data: {
      getAllAds: [
        {
          id: '1',
          image: 'https://example.com/image.jpg',
          title: 'Ad Title 1',
          price: 100
        },
        {
          id: '2',
          image: 'https://example.com/image2.jpg',
          title: 'Ad Title 2',
          price: 200
        }
      ]
    }
  })
}))

vi.mock('../src/components/AdCard', () => ({
  default: ({ title }) => <div>{title}</div>
}))


beforeEach(() => {
  render(
    <MemoryRouter>
      <RecentAds />
    </MemoryRouter>
  )
})

describe('RecentAds', () => {
  test('has a title "Annonces récentes"', () => {

    const subtitle = screen.getByRole('heading', { level: 2 })

    expect(subtitle).toBeVisible()
    expect(subtitle).toHaveTextContent('Annonces récentes')
  })
})

