import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';

const Logo = styled.h1`
  font-size: 4rem;
  font-family: var(--logoFont);
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  background: var(--red);
  transform: skew(-7deg);
  padding-top: 1rem;
  border-radius: 3rem;

  a {
    color: var(--offWhite);
    text-decoration: none;
    text-transform: uppercase;
    padding: 0 1rem;
  }
`;

const HeaderStyled = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, #000);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black);
  }
`;

export default function Header() {
  return (
    <HeaderStyled>
      <div className="bar">
        <Logo>
          <Link href="/">SECK FETS</Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <p>"Search"</p>
      </div>
    </HeaderStyled>
  );
}
