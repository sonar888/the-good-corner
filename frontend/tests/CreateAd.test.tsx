import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import NewAdForm from '../src/components/pages/NewAdForm'
import { MemoryRouter } from 'react-router'
import catTags from '../tests/__mocks__/data/cat&tags.json'

const mockUseGetAllCategoriesdAndTagsQuery = vi.fn()
const mockUseCreateAdMutation = vi.fn()
const categories =  catTags.data.getAllCategories;
const tags = catTags.data.getAllTags

vi.mock('../src/generated/graphql-types', () => ({
  useGetAllCategoriesAndTagsQuery: () => mockUseGetAllCategoriesdAndTagsQuery(),
  useCreateAdMutation: () => mockUseCreateAdMutation(),
}))


describe('New Ad from', () => {

    beforeEach(() => {
        mockUseGetAllCategoriesdAndTagsQuery.mockReturnValue({
            loading: false,
            error: false,
            data: { getAllTags: tags,
                getAllCategories: categories
             }
        }
            
        ),
        mockUseCreateAdMutation.mockReturnValue([
      vi.fn(), // Mock the createAd function
      { loading: false, error: null }, // Mock the state (loading, error)
    ]);
    });

    test('shows an error if the title is not 3 characters long', () => {
    render(
      <MemoryRouter>
        <NewAdForm />
      </MemoryRouter>
    )
        const title = screen.getByLabelText('Titre')
        expect(title).toBeInTheDocument

    });
})