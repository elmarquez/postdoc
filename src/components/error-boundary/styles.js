import styled from 'styled-components';
import {Error} from 'styled-icons/boxicons-regular/Error';

const ErrorIcon = styled(Error)`
  fill: tomato;
  width: 24px;
`;

const Message = styled.div`
  font-size: x-small;
  opacity: 0.8;
  text-align: center;
`;

export {
  ErrorIcon,
  Message,
};
