import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
  cleanup() // the function cleanup is performed that resets the jsdom that is simulating the browser.
})