import styled from 'styled-components';

const OrderItemStylee = styled.li`
  box-shadow: var(--boxShadow);
  list-style: none;
  padding: 2rem;
  border: 1px solid var(--offWhite);
  display: grid;
  grid-template-columns: auto 1fr auto;

  h2 {
    border-bottom: 2px solid red;
    margin-top: 0;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }

  img {
    width: 200px;
    height: 100%;
    object-fit: contain;
    margin-right: 2rem;
  }

  .images {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    margin-top: 1rem;
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

      span:last-child {
        font-weight: 300;
      }
    }
  }


  .order-meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
    display: grid;
    grid-gap: 1rem;
    text-align: center;

    & > * {
      margin: 0;
      background: rgba(0, 0, 0, 0.03);
      padding: 1rem 0;
    }

    strong {
      display: block;
      margin-bottom: 1rem;
    }
  }
`;

export default OrderItemStylee;
