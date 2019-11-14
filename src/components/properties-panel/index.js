import Form, { Field } from '@atlaskit/form';
import Button from '@atlaskit/button';
import Select from '@atlaskit/select';
import TextField from '@atlaskit/textfield';
import React, { Fragment } from 'react';
import { FlexColumn, FlexRow } from '../layout';
import { ErrorMessage } from './styles';
import { Body, ContentPanel, Footer, Header } from '../edge-panel/styles/content';

/**
 * File properties panel.
 */
class PropertiesPanelComponent extends React.Component {
  render() {
    return (
      <ContentPanel>
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderFooter()}
      </ContentPanel>
    );
  }

  renderBody() {
    const publicationTypes = [
      {label: "Journal", value: "journal"}
    ];
    return (
      <Body>
        Thumbnail image goes here
        <h4>File</h4>

        <section>
          <h4>Citation</h4>

          <Field name="type" label="Type">
            {({ fieldProps: { id, ...rest }, error }) => (
              <Fragment>
                <Select
                  validationState={error ? 'error' : 'none'}
                  inputId={id}
                  {...rest}
                  options={publicationTypes}
                  isClearable
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
              </Fragment>
            )}
          </Field>
          <Field name="title" label="Title">
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>
          <Field name="author" label="Author">
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>
          <Field name="journal" label="Journal">
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>


        </section>


        <section>
          <Field name="tags" label="Tags">
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>
        </section>

        <section>
          <h4>Abstract</h4>
          <Field name="abstract" label="Abstract">
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>
        </section>

        <section>
          <h4>Notes</h4>
          <Field name="notes" label="Notes">
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>
        </section>

      </Body>
    );
  }

  renderFooter() {
    return (<Footer>Footer</Footer>);
  }

  renderHeader() {
    return (<Header>Header</Header>);
  }
}

export default PropertiesPanelComponent;
