import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'

import { stripe } from '../../services/stripe'
import Home, { getStaticProps } from '../../pages'

jest.mock('next/router')
jest.mock('next-auth/client', () => ({
  useSession: () => [null, false]
}))

jest.mock('../../services/stripe')

describe('Home page', () => {
  it('renders correctly', () => {
    render( <Home product={{amount: 'R$10,00'}} /> )

    expect(screen.getByText("for R$10,00 month")).toBeInTheDocument()
  })

  it('loads initial data', async () => {
    const retrieveStripePricesMocked = mocked(stripe.prices.retrieve)

    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            amount: '$10.00'
          }
        }
      })
    )
  })
})
