import styled from 'styled-components';

const CloseButton = styled.button`
  background: black;
  color: white;
  font-size: 3rem;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 10px;
  line-height: 0.7;
  padding-bottom: 0.5rem;
  transform: skew(-2deg);
`;

export default CloseButton;
