import React from 'react'
import RecentAds from '../src/components/RecentAds'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import ads from './mocks/ads.json'


// 👇 Mock the hook from the generated file

const allAds = ads.data.getAllAds

vi.mock('../src/generated/graphql-types', () => ({
  useGetAllAdsQuery: () => ({
    loading: false,
    error: null,
    data: { getAllAds: allAds },
  })
}))

vi.mock('../src/components/AdCard', () => ({
  default: ({ title }) => <h4>{title}</h4>
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
  });

  test("has a subtitle 'Nombre d'annonces récentes", () => {
    const subtitle = screen.getByRole('heading', { level: 3 })
    

    expect(subtitle).toBeVisible()
    expect(subtitle).toHaveTextContent(`Nombre d'annonces récentes: ${allAds.length}`)
  });

  test("expect the ads titles to be visible", () => {

  const cardTitles = screen.getAllByRole('heading', {level: 4})
  expect(cardTitles).toHaveLength(allAds.length)

  const adTitles = allAds.map(ad => ad.title)

  adTitles.forEach(title => {
    expect(screen.getByText(title)).toBeInTheDocument()
  })

  });
})

