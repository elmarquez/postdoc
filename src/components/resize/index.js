const _createClass = (function() {
  function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      const descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

const _react = require('react');

const _react2 = _interopRequireDefault(_react);

require('./styles.css');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      `Super expression must either be null or a function, not ${typeof superClass}`
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

/**
 * Resize control.
 */
const Resize = (function(_React$Component) {
  _inherits(Resize, _React$Component);

  /**
   * Constructor.
   * @param {Object} props Component properties
   */
  function Resize(props) {
    _classCallCheck(this, Resize);

    return _possibleConstructorReturn(
      this,
      (Resize.__proto__ || Object.getPrototypeOf(Resize)).call(this, props)
    );
  }

  /**
   * Render the component.
   * @returns {XML}
   */

  _createClass(Resize, [
    {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: 'resize' },
          '\xA0'
        );
      }
    }
  ]);

  return Resize;
})(_react2.default.Component);
// # sourceMappingURL=index.js.map
