import styled from 'styled-components';

const OrderStylee = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  border: 1px solid var(--offWhite);
  box-shadow: var(--boxShadow);
  padding: 2rem;
  border-top: 10px solid red;

  .order-meta {
    p {
      display: grid;
      grid-template-columns: 1fr 5fr;
      margin: 0;
      border-bottom: 1px solid var(--offWhite);

      span {
        padding: 1rem;

        &:first-child {
          font-weight: 900;
          text-align: right;
        }
      }

      :nth-child(odd) {
        background-color: var(--offWhite);
      }
    }
  }
`;

export default OrderStylee;
