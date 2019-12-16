import React from 'react';
import { FlexColumn } from '../layout';
import Placeholder from '../placeholder';
import { ErrorIcon, Message } from './styles';

/**
 * Generic error boundary component.
 */
class ErrorBoundary extends React.Component {
  /**
   * Constructor
   * @param {Object} props - Component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  /**
   * Get next component state.
   * @param {Error} error - Error
   * @return {Object}
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message };
  }

  /**
   * Handle sub-component error.
   * @param {Error} error - Error object
   * @param {ErrorInfo} errorInfo - Extended error information
   */
  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  /**
   * Render the component.
   * @return {JSX.Element}
   */
  render() {
    if (this.state.hasError) {
      return (
        <Placeholder className={'error'}>
          <FlexColumn alignItems={'center'}>
            <ErrorIcon />
            <Message>An error occurred while rendering the view.</Message>
          </FlexColumn>
        </Placeholder>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
