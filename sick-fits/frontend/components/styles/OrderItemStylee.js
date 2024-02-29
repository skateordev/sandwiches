import styled from 'styled-components';

const OrderItemStylee = styled.li`
  box-shadow: var(--boxShadow);
  list-style: none;
  padding: 2rem;
  border: 1px solid var(--offWhite);
  display: grid;
  grid-template-columns: auto 1fr auto;

  img {
    width: 200px;
    height: 100%;
    object-fit: contain;
    margin-right: 2rem;
  }

  .item-meta {
    h3 {
      font-weight: 900;
      color: var(--white);
      background: var(--red);
      width: fit-content;
      transform: skew(-7deg) rotate(-3deg);
      padding: 0 4px;
      box-shadow: 3px 3px 0 var(--black);
    }

    p {
      margin-top: 8px;
      margin-bottom: 8px;

      span:first-child {
        font-weight: 900;
      }
    }
  }
`;

export default OrderItemStylee;
