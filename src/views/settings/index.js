import Button from '@atlaskit/button';
import Form, { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import React from 'react';
import { FlexRow } from '../../components/layout';

// TODO
// - library path
// - indexing options
// - project options

/**
 *
 */
class SettingsContainer extends React.Component {
  /**
   * Render the component.
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className={'max-width-480 padding-l'}>
        <h1>Settings</h1>
        {this.renderLibraryForm()}
        {this.renderProjectsForm()}
        {this.renderPluginsForm()}
      </div>
    );
  }

  /**
   * Render library settings form.
   * @returns {JSX.Element}
   */
  renderLibraryForm() {
    return (
      <section className={'margin-top-m'}>
        <Form onSubmit={data => console.log('form data', data)}>
          {({ formProps }) => (
            <form {...formProps}>
              <h4>Library</h4>
              <p className={'font-size-xs margin-bottom-s'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
              <Field name="libraryPath" defaultValue="" label="Path to library folder" isRequired>
                {({ fieldProps }) => <TextField {...fieldProps} />}
              </Field>
              <Field name="libraryPath" defaultValue="" label="Path to library folder" isRequired>
                {({ fieldProps }) => <TextField {...fieldProps} />}
              </Field>
              <Field name="libraryPath" defaultValue="" label="Path to library folder" isRequired>
                {({ fieldProps }) => <TextField {...fieldProps} />}
              </Field>
              <Field name="libraryPath" defaultValue="" label="Path to library folder" isRequired>
                {({ fieldProps }) => <TextField {...fieldProps} />}
              </Field>
            </form>
          )}
        </Form>
      </section>
    );
  }

  /**
   * Render projects settings form.
   * @returns {JSX.Element}
   */
  renderProjectsForm() {
    return (
      <section className={'margin-top-m'}>
        <Form onSubmit={data => console.log('form data', data)}>
          {({ formProps }) => (
            <form {...formProps}>
              <h4>Projects</h4>
              <p className={'font-size-xs margin-bottom-s'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
              <Field name="username" defaultValue="" label="User name" isRequired>
                {({ fieldProps }) => <TextField {...fieldProps} />}
              </Field>
              <Field name="username" defaultValue="" label="User name" isRequired>
                {({ fieldProps }) => <TextField {...fieldProps} />}
              </Field>
              <Field name="username" defaultValue="" label="User name" isRequired>
                {({ fieldProps }) => <TextField {...fieldProps} />}
              </Field>
              <Field name="username" defaultValue="" label="User name" isRequired>
                {({ fieldProps }) => <TextField {...fieldProps} />}
              </Field>
              <Field name="username" defaultValue="" label="User name" isRequired>
                {({ fieldProps }) => <TextField {...fieldProps} />}
              </Field>
            </form>
          )}
        </Form>
      </section>
    );
  }

  /**
   * Render plugins form.
   * @returns {JSX.Element}
   */
  renderPluginsForm() {
    return (
      <section className={'margin-top-m'}>
        <Form onSubmit={data => console.log('form data', data)}>
          {({ formProps }) => (
            <form {...formProps}>
              <h4>Plugins</h4>
              <p className={'font-size-xs margin-bottom-s'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
              <Field name="username" defaultValue="" label="User name" isRequired>
                {({ fieldProps }) => <TextField {...fieldProps} />}
              </Field>
              <Field name="username" defaultValue="" label="User name" isRequired>
                {({ fieldProps }) => <TextField {...fieldProps} />}
              </Field>
              <Field name="username" defaultValue="" label="User name" isRequired>
                {({ fieldProps }) => <TextField {...fieldProps} />}
              </Field>
              <Field name="username" defaultValue="" label="User name" isRequired>
                {({ fieldProps }) => <TextField {...fieldProps} />}
              </Field>
              <Field name="username" defaultValue="" label="User name" isRequired>
                {({ fieldProps }) => <TextField {...fieldProps} />}
              </Field>
            </form>
          )}
        </Form>
      </section>
    );
  }

}

export default SettingsContainer;
