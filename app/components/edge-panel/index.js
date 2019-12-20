import PropTypes from 'prop-types';
import React from 'react';
import { EDGE_PANEL_POSITION } from './constants';
import ContentPanelComponent from './content';
import { EdgePanel } from './styles';
import ToolbarComponent from './toolbar';

class EdgePanelComponent extends React.Component {
  /**
   * Constructor
   * @param {Object} props - Props passed from parent component
   */
  constructor(props) {
    super(props);
    this.state = {
      selectedPanelIndex: null
    };
  }

  /**
   * Handle panel selection.
   * @param {Object} panel - Panel configuration
   */
  onPanelSelection(panel) {
    let index;
    if (panel) {
      index = this.props.panels.findIndex(item => item.title === panel.title);
    } else {
      index = null;
    }
    this.setState({ selectedPanelIndex: index });
  }

  /**
   * Render the component.
   * @return {JSX.Element}
   */
  render() {
    return (
      <EdgePanel>
        {this.state.selectedPanelIndex !== null && (
          <ContentPanelComponent
            content={this.props.panels[this.state.selectedPanelIndex]}
          />
        )}
        <ToolbarComponent
          items={this.props.panels}
          onPanelSelection={panel => this.onPanelSelection(panel)}
        />
      </EdgePanel>
    );
  }
}

EdgePanelComponent.propTypes = {
  panels: PropTypes.array,
  position: PropTypes.string
};

export default EdgePanelComponent;
export { EDGE_PANEL_POSITION as POSITION };
