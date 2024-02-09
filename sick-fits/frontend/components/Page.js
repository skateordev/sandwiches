import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './Header';
import { GlobalStyles } from './styles';

const InnerStyles = styled.div`
  margin: 0 auto;
  max-width: var(--maxWidth);
  padding: 2rem;
`;

export default function Page({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

Page.defaultProps = {
  children: null,
};
