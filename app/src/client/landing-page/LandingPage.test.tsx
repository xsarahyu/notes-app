import { cleanup, screen, waitFor, fireEvent } from '@testing-library/react'
import { renderInContext } from 'wasp/client/test'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import LandingPage from './LandingPage'

describe('LandingPage rendering', () => {
  beforeEach(() => {
    renderInContext(<LandingPage />)
  })

  afterEach(() => {
    cleanup()
  })

  test('Renders header', async () => {
    await waitFor(() => {
      const header = screen.getByText('RC ASCEND')
      const menuButton = screen.getByRole('button', {name: 'Open main menu'})

      expect(header).toBeInTheDocument
      expect(menuButton).toBeInTheDocument
    })
  })

  test('Renders hero section', async () => {
    await waitFor(() => {
      const hero1 = screen.getByText('Discover the ultimate', { selector: 'h1' })
      const hero2 = screen.getByText('Notes app', { selector: 'span' })
      const getStartedButton = screen.getByRole('link', {name: 'Get Started'})

      expect(hero1).toBeInTheDocument()
      expect(hero2).toBeInTheDocument()
      expect(getStartedButton).toBeInTheDocument()
    })
  })

  test('Renders features section', async () => {
    await waitFor(() => {
      const createNotes = screen.getByText('Create Notes')
      const markCompleted = screen.getByText('Mark Completed')
      const deleteNotes = screen.getByText('Delete Notes')
      const autoSave = screen.getByText('Auto-Save')

      expect(createNotes).toBeInTheDocument
      expect(markCompleted).toBeInTheDocument
      expect(deleteNotes).toBeInTheDocument
      expect(autoSave).toBeInTheDocument
    })
  })
})

describe('LandingPage CRUD', () => {
  test('Get Started button leads to signup page', async() => {
    const history = createMemoryHistory()
    renderInContext(
      <Router history={history}>
        <LandingPage />
      </Router>
    )

    const getStartedButton = screen.getByRole('link', {name: 'Get Started'})
    fireEvent.click(getStartedButton)

    await waitFor(() => {
      expect(history.location.pathname).toBe('/signup')
    })
  })
})
