class TextEditor {

  /**
   * focus and select can be done after the gui is attached
   */
  afterGuiAttached() {
    this.eInput.focus();
    this.eInput.select();
  }

  /**
   * Any cleanup we need to be done here
   */
  destroy() {
    // but this example is simple, no cleanup, we could
    // even leave this method out as it's optional
  }

  /**
   * Gets called once when grid ready to insert the element.
   */
  getGui() {
    return this.eInput;
  }

  /**
   * Returns the new value after editing
   */
  getValue() {
    return this.eInput.value;
  }

  /**
   * Gets called once before the renderer is used.
   */
  init (params) {
    this.eInput = document.createElement('input');
    this.eInput.value = params.value;
  }

  /**
   *  if true, then this editor will appear in a popup
   */
  isPopup() {
    // and we could leave this method out also, false is the default
    return false;
  }
}

export default TextEditor;
