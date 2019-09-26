import styled from "styled-components";
import {FlexColumn, FlexRow} from '../../layout';

const Body = styled.div`
  flex-grow: 2;
  overflow: auto;
  padding: 16px 0;
`;

const Controls = styled.div`
  flex-grow: 2;
  text-align: right;
`;

const Footer = styled(FlexRow)`
  border-top: 1px solid rgba(0,0,0,0.1);
  padding: 12px 8px;
`;

const Group = styled(FlexColumn)`
  margin: 0 8px 24px 8px;
  
  .accordion {
    margin-bottom: 8px;
  }
`;

const Header = styled.div`
  border-bottom: 1px solid lightgray;
  height: 32px;
  max-height: 32px;
  min-height: 32px;

  span {
    padding: 0 16px;
  }
`;

const ProjectPanel = styled.div`
  align-items: stretch;
  background-color: rgb(242, 244, 246);
  border-right: 1px solid rgb(217, 217, 218);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  width: 280px;
`;

const Title = styled.div`
  font-weight: 600;
  opacity: 0.7;
  text-transform: uppercase;
`;

const TreeItem = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 0 8px;

  span {
    margin-right: 8px;
  }
`;

export { Body, Controls, Footer, Group, Header, ProjectPanel, Title, TreeItem };
