/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import { fakeItem } from '../../../lib/testUtils';
import { CartStateProvider } from '../../../lib/cartState';
import ADD_TO_CART_MUTATION from '../mutations/addToCartMutation';
import AddToCart from '../AddToCart';

const { id } = fakeItem();
const mocks = [
  {
    request: {
      query: ADD_TO_CART_MUTATION,
      varibles: {
        id,
      },
    },
    result: {
      data: {
        addToCart: { id },
      },
    },
  },
];

beforeEach(() => jest.resetAllMocks());

describe('<AddToCart />', () => {
  it('matches the default snapshot', () => {
    const { container } = render(
      <CartStateProvider>
        <MockedProvider>
          <AddToCart productId={id} />
        </MockedProvider>
      </CartStateProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('add an item to the cart when clicked', () => {
    render(
      <CartStateProvider>
        <MockedProvider mocks={mocks}>
          <AddToCart productId={id} />
        </MockedProvider>
      </CartStateProvider>,
    );

    const btn = screen.getByText('Add to cart 🛒');

    userEvent.click(btn);

    const btnBusy = screen.getByText('Adding to cart 🛒');

    expect(btnBusy).toBeDisabled();
    expect(btnBusy).toHaveAttribute('aria-busy');
  });
});
