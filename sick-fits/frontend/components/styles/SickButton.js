import styled from 'styled-components';

const SickButton = styled.button`
  background: red;
  color: white;
  font-weight: 500;
  border: 0;
  border-radius: 0;
  text-transform: uppercase;
  font-size: 1.5rem;
  padding: 0.8rem 1.5rem;
  transform: skew(-2deg);
  display: inline-block;
  transition: all 0.5s;
  &[disabled] {
    opacity: 0.5;
  }

  &:hover {
    animation:0.6s linear 0s infinite grow;
  }

  &:focus-visible {
    animation: 1.6s cubic-bezier(1,-1.22,0,2.06) 0s infinite s🅱️innala;
  }

  @keyframes s🅱️innala {
    from {
      transform: rotate(1turn);
    }

    to {
      transform: rotate(0turn);
    }
  }

  @keyframes grow {
    25% {
      transform: scale(200%);
    }

    75% {
      transform: scale(10%);
    }
  }
`;

export default SickButton;
