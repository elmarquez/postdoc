import React from 'react';
import { Tab, Tabs, TabPane, TabList, TabListFiller, } from './styles';
import DocumentEditor from '../document-editor';

class TabPanelComponent extends React.Component {

    render() {
        return (
            <Tabs>
                <TabList>
                    <Tab>document.md</Tab>
                    <Tab>document.md</Tab>
                    <Tab>document.md</Tab>
                    <TabListFiller />
                </TabList>
                <TabPane>
                    <DocumentEditor />
                </TabPane>
            </Tabs>
        );
    }
}

export default TabPanelComponent;