import React from 'react';
import { Document, Outline, Page } from 'react-pdf';
import { FlexColumn } from '../../layout';
import { Controls, Footer, Viewer } from './styles';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'pdfjs-dist/web/pdf_viewer.css';

/**
 * PDF document viewer.
 */
class PdfDocumentViewer extends React.Component {
  /**
   * Constructor
   * @param {object} props - Component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      options: {
        cMapUrl: 'cmaps/',
        cMapPacked: true,
      },
      numPages: null,
      pageNumber: 1,
    };
  }

  onChangePage = offset => this.setState(prevState => ({
    pageNumber: prevState.pageNumber + offset,
  }));

  /**
   * Handle document load error.
   * @param {string} error
   */
  onDocumentLoadError(error) {
    console.error(error);
  }

  /**
   * Handle document load success.
   * @param pdf - PDF document
   */
  onDocumentLoadSuccess(pdf) {
    this.setState({ numPages: pdf.numPages });
  }

  /**
   *
   * @param pdf
   */
  onItemClick = (pdf) => this.setState({ pageNumber: pdf.pageNumber });

  /**
   *
   */
  onNextPage = () => this.onChangePage(1);

  /**
   *
   */
  onPreviousPage = () => this.onChangePage(-1);

  /**
   * Render the component.
   * @returns {JSX.Element}
   */
  render() {
    const { options, pageNumber } = this.state;
    return (
      <Viewer>
        {this.renderControls()}
        <Document
          className={'document'}
          file={'http://www2.econ.iastate.edu/tesfatsi/ArchitectureOfComplexity.HSimon1962.pdf'}
          onLoadError={this.onDocumentLoadError.bind(this)}
          onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}
          options={options}>
          <Outline onItemClick={this.onItemClick.bind(this)} />
          {this.renderPages()}
        </Document>
      </Viewer>
    )
  }

  /**
   * Render viewer controls.
   * @returns {JSX.Element}
   */
  renderControls() {
    const { numPages, pageNumber } = this.state;
    return (
      <Controls>
        <span>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </span>
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={this.onPreviousPage.bind(this)}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={this.onNextPage.bind(this)}
        >
          Next
        </button>
      </Controls>
    );
  }

  /**
   * Render PDF pages.
   * @returns {JSX.Element}
   */
  renderPages() {
    const { numPages } = this.state;
    return Array.from(new Array(numPages), (el, index) => (
      <Page key={`page_${index + 1}`} pageNumber={index + 1} />
    ));
  }
}

export default PdfDocumentViewer;
