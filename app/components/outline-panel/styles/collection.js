import styled from 'styled-components';
import { PrimitiveDot } from 'styled-icons/octicons/PrimitiveDot/PrimitiveDot';
import { FlexColumn, FlexRow } from '../../layout';

const Collection = styled(FlexColumn)``;

const Controls = styled.div`
  flex-grow: 2;
  text-align: right;
`;

const DotIcon = styled(PrimitiveDot)`
  fill: ${props => (props.fill ? props.fill : 'inherit')};
  height: 8px;
`;

const Icon = styled.div`
  margin-right: 8px;
  width: 8px;
`;

const Item = styled(FlexRow)`
  justify-content: flex-start;
`;

const Label = styled.div``;

const Title = styled.div`
  font-weight: 600;
  opacity: 0.7;
  text-transform: uppercase;
`;

export { Collection, Controls, DotIcon, Icon, Item, Label, Title };
