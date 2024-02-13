import Link from 'next/link';
import { NavStyled } from './styles';
import useUser from './User/User';
import SignOut from './SignOut/SignOut';

export default function Nav() {
  const user = useUser();

  return (
    <NavStyled>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
        </>
      )}
      {!user && <Link href="/signin">Sing In 🎤</Link>}
    </NavStyled>
  );
}
