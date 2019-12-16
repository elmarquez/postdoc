import styled from 'styled-components';
import { ChevronDown } from 'styled-icons/boxicons-regular/ChevronDown';
import { ChevronRight } from 'styled-icons/boxicons-regular/ChevronRight';
import { FlexColumn, FlexRow } from '../../layout';

const Accordion = styled(FlexColumn)``;

const Body = styled(FlexColumn)``;

const ChevronIconDown = styled(ChevronDown)`
  margin-right: 4px;
  width: 18px;
`;

const ChevronIconRight = styled(ChevronRight)`
  margin-right: 4px;
  width: 18px;
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 2;
  justify-content: flex-end;
  margin-left: 4px;

  svg {
    width: 16px;
  }
`;

const Header = styled(FlexRow)`
  margin-left: -4px;
  padding-bottom: 8px;
`;

const Title = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
`;

export {
  Accordion,
  Body,
  ChevronIconDown,
  ChevronIconRight,
  Controls,
  Header,
  Title
};
