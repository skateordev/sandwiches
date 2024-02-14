import { useMutation } from '@apollo/client';
import useForm from '../../lib/useForm';
import ErrorMessage from '../ErrorMessage';
import { FormStyled, SickButton } from '../styles';
import { RESET_PASSWORD_MUTATION } from './mutations';

export default function ResetPassword() {
  const initialValues = {
    email: '',
    token: '',
    password: '',
  };

  const { inputs, handleChange, resetForm } = useForm(initialValues);

  const { email, token, password } = inputs;

  const [
    redeemUserPasswordResetToken,
    {
      data,
      error: passwordResetError,
      loading: isLoading,
    },
  ] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      variables: {
        email,
        token,
        password,
      },
    },
  );

  const submitPasswordResetHandler = async (evt) => {
    evt.preventDefault(); // stop form from submitting

    await redeemUserPasswordResetToken();

    resetForm(); // clear the form data after clicking
  };

  const showSuccessMessage = () => (
    data?.sendUserPasswordResetLink === null && <p>It is done.</p>
  );

  return (
    /* POST method is muy importante to avoid leaking sensitive
       data into URL params and server logs */
    <FormStyled method="POST" onSubmit={submitPasswordResetHandler}>
      <h2>Reinvent your password</h2>
      <ErrorMessage error={passwordResetError} />
      {showSuccessMessage()}
      <fieldset disabled={isLoading} aria-busy={isLoading}>
        <label htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            required
            placeholder="What are the emailfor it"
            autoComplete="email"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            required
            placeholder="Put the new into side of here"
          />
        </label>
      </fieldset>

      <SickButton type="button" onClick={submitPasswordResetHandler}>Dew itt.</SickButton>
    </FormStyled>
  );
}
