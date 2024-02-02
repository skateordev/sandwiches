import Link from 'next/link';
import Nav from './Nav';

export default function Header() {
  return (
    <header>
      <div className="bar">
        <h1>
          <Link href="/">SECK FETS</Link>
        </h1>
      </div>
      <div className="sub-bar">
        <p>"Search"</p>
      </div>
      <Nav />
    </header>
  );
}
