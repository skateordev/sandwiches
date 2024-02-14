import styled from 'styled-components';
import { SignIn, SignUp } from '../components';
import ResetPassword from '../components/ResetPassword/ResetPassword';

const GridDiv = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

export default function SignInPage() {
  return (
    <GridDiv>
      <SignIn />
      <SignUp />
      <ResetPassword />
    </GridDiv>
  );
}
