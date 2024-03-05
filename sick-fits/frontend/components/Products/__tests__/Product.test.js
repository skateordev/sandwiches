/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { fakeItem } from '../../../lib/testUtils';
import Product from '../Product';
import { CartStateProvider } from '../../../lib/cartState';

const product = fakeItem();

describe('<Product />', () => {
  it('matches the default snapshot', () => {
    const { container } = render(
      <CartStateProvider>
        <MockedProvider>
          <Product product={product} />
        </MockedProvider>
      </CartStateProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
