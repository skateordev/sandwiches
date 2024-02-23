import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

const SplatStyled = styled.div`
  background: #f00;
  color: var(--white);
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
  line-height: 1rem;
  margin-top: -2rem;
  margin-left: -1.2rem;
  min-width: 3rem;
  padding: 0.3rem;
  transform: skew(-3deg) rotate(12deg);
  box-shadow: 0.25rem -0.15rem 0px var(--black);
`;

const AnimationStyled = styled.span`
  position: relative;

  .count {
    display: block;
    position: relative;
    transition: transform 666ms;
    backface-visibility: hidden;
  }

  .count-enter {
    transform: scale(4) rotateX(0.5turn);
  }

  .count-enter-active {
    transform: rotateX(0);
    background: chartreuse;
    color: magenta;
  }

  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }

  .count-exit-active {
    background: magenta;
    color: cyan;
    transform: scale(4) rotateX(0.5turn);
  }
`;

export function Splat({ count }) {
  return (
    <AnimationStyled>
      <TransitionGroup>
        <CSSTransition
          key={count}
          timeout={{
            enter: 666,
            exit: 666,
          }}
          className="count"
          classNames="count"
          unmountOnExit
        >
          <SplatStyled>{count}</SplatStyled>
        </CSSTransition>
      </TransitionGroup>
    </AnimationStyled>
  );
}

Splat.propTypes = {
  count: PropTypes.number,
};

Splat.defaultProps = {
  count: '',
};

export default Splat;
