import PropTypes from 'prop-types';
import styled from 'styled-components';

const SplatStyled = styled.div`
  background: #f00;
  color: var(--white);
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
  line-height: 1rem;
  margin-top: -2.5rem;
  margin-left: -2.2rem;
  min-width: 3rem;
  padding: 0.3rem;
  transform: skew(-3deg) rotate(12deg);
  box-shadow: 0.25rem -0.15rem 0px var(--black);
`;

export function Splat({ count }) {
  return (
    <SplatStyled className="splat">{count}</SplatStyled>
  );
}

Splat.propTypes = {
  count: PropTypes.string,
};

Splat.defaultProps = {
  count: '',
};

export default Splat;
