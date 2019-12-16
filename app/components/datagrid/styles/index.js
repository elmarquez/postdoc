import styled from 'styled-components';
import { ErrorCircle } from 'styled-icons/boxicons-regular/ErrorCircle';
import { Save } from 'styled-icons/fa-regular/Save';
import { Trash } from 'styled-icons/boxicons-regular/Trash';

const Container = styled.div`
  width: ${props => (props.width ? `${props.width}px` : '100%')};
`;

const InputContainer = styled.input`
  width: ${props => (props.width ? `${props.width}px` : '100%')};
`;

const InvalidStatus = styled(ErrorCircle)`
  color: red;
  width: 18px;
`;

const MiniButton = styled.div`
  align-items: center;
  background-color: #f5f6f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:hover {
    background-color: #ebedf0;
  }
`;

const SaveIcon = styled(Save)`
  color: #6c788d;
  width: 15px;
`;

const StatusCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Tag = styled.div`
  background-color: lightgray;
  border-radius: 2px;
  font-size: x-small;
  line-height: initial;
  margin-right: 4px;
  padding: 2px 4px;
`;

const TagGroup = styled.div`
  display: inline-flex;
`;

const ThreeDotMenu = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: ${props => (props.height ? props.height : '100%')};
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }

  button {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 18px;
    justify-content: center;
  }

  svg {
    height: 16px;
  }
`;

const TrashIcon = styled(Trash)`
  color: #6c788d;
  width: 15px;
`;

export {
  Container,
  InputContainer,
  InvalidStatus,
  MiniButton,
  SaveIcon,
  StatusCell,
  Tag,
  TagGroup,
  ThreeDotMenu,
  TrashIcon
};
