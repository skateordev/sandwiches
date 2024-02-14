import { useMutation } from '@apollo/client';
import useForm from '../../lib/useForm';
import ErrorMessage from '../ErrorMessage';
import { SickButton } from '../styles';
import Form from '../styles/Form';
import CREATE_USER_MUTATION from './mutations/createUserMutation';

export default function SignUp() {
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const { inputs, handleChange, resetForm } = useForm(initialValues);

  const { name, email, password } = inputs;

  const [createUser, { data, error: createUserError, loading: isLoading }] = useMutation(
    CREATE_USER_MUTATION,
    {
      variables: {
        name,
        email,
        password,
      },
    },
  );

  const submitSignUpHandler = async (evt) => {
    evt.preventDefault(); // stop form from submitting

    // eslint-disable-next-line no-console
    await createUser().catch(console.error);

    resetForm(); // clear the form data after clicking sign up
  };

  const showSuccessMessage = () => (
    data?.createUser && (
      <p>
        You did it! 🎉
        You can now proceed to sign in
      </p>
    )
  );

  return (
    /* POST method is muy importante to avoid leaking sensitive
       data into URL params and server logs */
    <Form method="POST" onSubmit={submitSignUpHandler}>
      <h2>Sign up for an account</h2>
      <ErrorMessage error={createUserError} />
      {showSuccessMessage()}
      <fieldset disabled={isLoading} aria-busy={isLoading}>
        <label htmlFor="name">
          Name
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
            required
            placeholder="What's your names?"
            autoComplete="name"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            required
            placeholder="Wat does you are email"
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
            placeholder="Invent a password"
          />
        </label>
      </fieldset>

      <SickButton type="submit">Sign me up! 🙌</SickButton>
    </Form>
  );
}
