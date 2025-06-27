import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import NewAdForm from '../src/components/pages/NewAdForm'
import { MemoryRouter } from 'react-router-dom'


// vi.mock('react-router-dom', async() => {
//   const actualRouter = await vi.importActual('react-router-dom');  // Import everything from react-router-dom
//   return {
//     ...actualRouter,  // Spread all original exports
//     useNavigate: vi.fn(),
//     MemoryRouter: actualRouter.MemoryRouter  // Mock useNavigate to prevent the actual navigation
//   };
// });

describe('New Ad from', () => {
    test('shows an error if the title is not 3 characters long', () => {
    render(
      <MemoryRouter>
        <NewAdForm />
      </MemoryRouter>
    )
        const title = screen.getByRole('input', {name: 'title'})
        expect(title).toBeInTheDocument
    })
})