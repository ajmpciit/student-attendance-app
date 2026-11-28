import { render, screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import App from './App'                                     // ← runs all top-level consts

test('renders the roster and summary', () => {
  render(<App />)                                          // ← runs the return (...) JSX
  expect(screen.getByText('Alice')).toBeInTheDocument()
  expect(screen.getByText('Class roster')).toBeInTheDocument()
})

test('cycles a student through every status', async () => {
  const user = userEvent.setup()
  render(<App />)
  const btn = screen.getByLabelText(/Update Alice's attendance/i)

  await user.click(btn)   // default → present  ← runs setStatus + cycleStatus
  await user.click(btn)   // present → absent
  await user.click(btn)   // absent  → late
  await user.click(btn)   // late    → default
})