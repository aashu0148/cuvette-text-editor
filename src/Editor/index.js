"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _draftJs = require("draft-js");

require("draft-js/dist/Draft.css");

var _bi = require("react-icons/bi");

var _ai = require("react-icons/ai");

var _EditorModule = _interopRequireDefault(require("./Editor.module.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Editor(props) {
  var _props$colors4, _props$colors5, _styleMap;

  var keyCodes = {
    s: 83,
    b: 66,
    i: 73,
    o: 79,
    u: 85,
    l: 76,
    h: 72,
    c: 67
  };
  var inlineOptions = {
    bold: "BOLD",
    italic: "ITALIC",
    underline: "UNDERLINE",
    strikethrough: "STRIKETHROUGH",
    highlight: "HIGHLIGHT",
    code: "CODE"
  };
  var blockOptions = {
    ol: "ordered-list-item",
    ul: "unordered-list-item",
    h1: "header-one",
    h2: "header-two"
  };
  var allEditorOptions = [{
    label: "bold",
    value: inlineOptions.bold,
    type: "inline",
    icon: _bi.BiBold,
    shortcut: "Ctrl+b"
  }, {
    label: "italic",
    value: inlineOptions.italic,
    type: "inline",
    icon: _ai.AiOutlineItalic,
    shortcut: "Ctrl+i"
  }, {
    label: "underline",
    value: inlineOptions.underline,
    type: "inline",
    icon: _bi.BiUnderline,
    shortcut: "Ctrl+u"
  }, {
    label: "strikethrough",
    value: inlineOptions.strikethrough,
    type: "inline",
    icon: _bi.BiStrikethrough,
    shortcut: "Ctrl+shift+s"
  }, {
    label: "highlight",
    value: inlineOptions.highlight,
    type: "inline",
    icon: _bi.BiHighlight,
    shortcut: "Ctrl+h"
  }, {
    label: "code",
    value: inlineOptions.code,
    type: "inline",
    icon: _bi.BiCode,
    shortcut: "Ctrl+shift+c"
  }, {
    label: "ul",
    value: blockOptions.ul,
    type: "block",
    icon: _bi.BiListUl,
    shortcut: "Ctrl+l"
  }, {
    label: "ol",
    value: blockOptions.ol,
    type: "block",
    icon: _bi.BiListOl,
    shortcut: "Ctrl+o"
  }, {
    label: "h1",
    value: blockOptions.h1,
    type: "block"
  }, {
    label: "h2",
    value: blockOptions.h2,
    type: "block"
  }];
  var containerRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      editorOptions = _useState2[0],
      setEditorOptions = _useState2[1];

  var _useState3 = (0, _react.useState)(_draftJs.EditorState.createEmpty()),
      _useState4 = _slicedToArray(_useState3, 2),
      editorState = _useState4[0],
      setEditorState = _useState4[1];

  var _useState5 = (0, _react.useState)({
    bold: false,
    italic: false,
    underline: false,
    ul: false,
    ol: false,
    code: false,
    highlight: false,
    strikethrough: false,
    h1: false,
    h2: false
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      activeOptions = _useState6[0],
      setActiveOptions = _useState6[1];

  var changeActiveOption = function changeActiveOption(currentState) {
    var tempActiveOptions = _objectSpread({}, activeOptions);

    var currentStyle = currentState.getCurrentInlineStyle();
    var selection = currentState.getSelection();
    var blockType = currentState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

    if (currentStyle.has(inlineOptions.bold)) {
      tempActiveOptions.bold = true;
    } else {
      tempActiveOptions.bold = false;
    }

    if (currentStyle.has(inlineOptions.italic)) {
      tempActiveOptions.italic = true;
    } else {
      tempActiveOptions.italic = false;
    }

    if (currentStyle.has(inlineOptions.underline)) {
      tempActiveOptions.underline = true;
    } else {
      tempActiveOptions.underline = false;
    }

    if (currentStyle.has(inlineOptions.strikethrough)) {
      tempActiveOptions.strikethrough = true;
    } else {
      tempActiveOptions.strikethrough = false;
    }

    if (currentStyle.has(inlineOptions.highlight)) {
      tempActiveOptions.highlight = true;
    } else {
      tempActiveOptions.highlight = false;
    }

    if (currentStyle.has(inlineOptions.code)) {
      tempActiveOptions.code = true;
    } else {
      tempActiveOptions.code = false;
    }

    if (blockType === blockOptions.ul) {
      tempActiveOptions.ul = true;
    } else {
      tempActiveOptions.ul = false;
    }

    if (blockType === blockOptions.ol) {
      tempActiveOptions.ol = true;
    } else {
      tempActiveOptions.ol = false;
    }

    if (blockType === blockOptions.h1) {
      tempActiveOptions.h1 = true;
    } else {
      tempActiveOptions.h1 = false;
    }

    if (blockType === blockOptions.h2) {
      tempActiveOptions.h2 = true;
    } else {
      tempActiveOptions.h2 = false;
    }

    setActiveOptions(tempActiveOptions);
  };

  var handleBlockTypeClick = function handleBlockTypeClick(option) {
    setActiveOptions(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, option.label, !prev[option.label]));
    });

    var state = _draftJs.RichUtils.toggleBlockType(editorState, option.value);

    setEditorState(state);
  };

  var handleInlineTypeClick = function handleInlineTypeClick(option) {
    if (editorState !== null && editorState !== void 0 && editorState.getCurrentInlineStyle().has(option.value)) {
      setActiveOptions(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, option.label, false));
      });
    } else {
      setActiveOptions(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, option.label, true));
      });
    }

    var state = _draftJs.RichUtils.toggleInlineStyle(editorState, option.value);

    setEditorState(state);
  };

  var handleOptionMouseDown = function handleOptionMouseDown(event, item) {
    event.preventDefault();

    if (item.type == "inline") {
      handleInlineTypeClick(item);
    } else if (item.type == "block") {
      handleBlockTypeClick(item);
    }
  };

  var handleEditorOnChange = function handleEditorOnChange(currentState) {
    var contentState = currentState.getCurrentContent();
    var content;

    try {
      content = (0, _draftJs.convertToRaw)(contentState);
    } catch (err) {
      content = "";
    }

    var stringifyContent = JSON.stringify(content);

    if (props.onChange) {
      var _contentState$getPlai;

      if (contentState !== null && contentState !== void 0 && (_contentState$getPlai = contentState.getPlainText()) !== null && _contentState$getPlai !== void 0 && _contentState$getPlai.trim()) props.onChange(stringifyContent);else props.onChange("");
    }

    changeActiveOption(currentState);
    setEditorState(currentState);
  };

  var handleKeyCommand = function handleKeyCommand(command) {
    var state = "";

    switch (command) {
      case inlineOptions.bold:
        {
          state = _draftJs.RichUtils.toggleInlineStyle(editorState, inlineOptions.bold);
          break;
        }

      case inlineOptions.italic:
        {
          state = _draftJs.RichUtils.toggleInlineStyle(editorState, inlineOptions.italic);
          break;
        }

      case inlineOptions.underline:
        {
          state = _draftJs.RichUtils.toggleInlineStyle(editorState, inlineOptions.underline);
          break;
        }

      case inlineOptions.highlight:
        {
          state = _draftJs.RichUtils.toggleInlineStyle(editorState, inlineOptions.highlight);
          break;
        }

      case inlineOptions.strikethrough:
        {
          state = _draftJs.RichUtils.toggleInlineStyle(editorState, inlineOptions.strikethrough);
          break;
        }

      case inlineOptions.code:
        {
          state = _draftJs.RichUtils.toggleInlineStyle(editorState, inlineOptions.code);
          break;
        }

      case blockOptions.ol:
        {
          state = _draftJs.RichUtils.toggleBlockType(editorState, blockOptions.ol);
          break;
        }

      case blockOptions.ul:
        {
          state = _draftJs.RichUtils.toggleBlockType(editorState, blockOptions.ul);
          break;
        }

      case blockOptions.h1:
        {
          state = _draftJs.RichUtils.toggleBlockType(editorState, blockOptions.h1);
          break;
        }

      case blockOptions.h2:
        {
          state = _draftJs.RichUtils.toggleBlockType(editorState, blockOptions.h2);
          break;
        }

      default:
        return "not-handled";
    }

    if (state) {
      setEditorState(state);
      changeActiveOption(state);
      return "handled";
    } else {
      return "not-handled";
    }
  };

  var keyBindingFunction = function keyBindingFunction(event) {
    if (_draftJs.KeyBindingUtil.hasCommandModifier(event)) {
      if (event.keyCode === keyCodes.b) return inlineOptions.bold;else if (event.keyCode === keyCodes.i) return inlineOptions.italic;else if (event.keyCode === keyCodes.h) return inlineOptions.highlight;else if (event.keyCode === keyCodes.c && event.shiftKey) return inlineOptions.code;else if (event.keyCode === keyCodes.s && event.shiftKey) return inlineOptions.strikethrough;else if (event.keyCode === keyCodes.u) return inlineOptions.underline;else if (event.keyCode === keyCodes.o) return blockOptions.ol;else if (event.keyCode === keyCodes.l) return blockOptions.ul;
    }

    return (0, _draftJs.getDefaultKeyBinding)(event);
  };

  var generateEditorOptions = function generateEditorOptions() {
    var _props$hiddenOptions;

    if (Array.isArray(props.hiddenOptions) && ((_props$hiddenOptions = props.hiddenOptions) === null || _props$hiddenOptions === void 0 ? void 0 : _props$hiddenOptions.length) > 0) {
      var hidden = _toConsumableArray(props.hiddenOptions);

      var resultedOptions = allEditorOptions.filter(function (item) {
        return (hidden === null || hidden === void 0 ? void 0 : hidden.findIndex(function (hiddenItem) {
          var _item$value;

          return hiddenItem !== null && hiddenItem !== void 0 && hiddenItem.toLowerCase ? hiddenItem.toLowerCase() === (item === null || item === void 0 ? void 0 : (_item$value = item.value) === null || _item$value === void 0 ? void 0 : _item$value.toLowerCase()) : false;
        })) < 0;
      });
      setEditorOptions(resultedOptions);
    } else setEditorOptions(allEditorOptions);
  };

  var assignColors = function assignColors() {
    var _props$colors, _props$colors2, _props$colors3, _containerRef$current, _containerRef$current2, _containerRef$current3;

    var primary = (_props$colors = props.colors) === null || _props$colors === void 0 ? void 0 : _props$colors.primary;
    var error = (_props$colors2 = props.colors) === null || _props$colors2 === void 0 ? void 0 : _props$colors2.error;
    var options = (_props$colors3 = props.colors) === null || _props$colors3 === void 0 ? void 0 : _props$colors3.options;
    if (primary) containerRef === null || containerRef === void 0 ? void 0 : (_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.style.setProperty("--primary", primary);
    if (error) containerRef === null || containerRef === void 0 ? void 0 : (_containerRef$current2 = containerRef.current) === null || _containerRef$current2 === void 0 ? void 0 : _containerRef$current2.style.setProperty("--error", error);
    if (options) containerRef === null || containerRef === void 0 ? void 0 : (_containerRef$current3 = containerRef.current) === null || _containerRef$current3 === void 0 ? void 0 : _containerRef$current3.style.setProperty("--option", options);
  };

  (0, _react.useEffect)(function () {
    if (props.colors) {
      assignColors();
    }

    if (!props.defaultState) return;

    try {
      var defaultState = _draftJs.EditorState.createWithContent((0, _draftJs.convertFromRaw)(JSON.parse(props.defaultState)));

      setEditorState(defaultState);
    } catch (err) {// do not do anything
    }
  }, []);
  (0, _react.useEffect)(function () {
    generateEditorOptions();
  }, [props.hiddenOptions]);

  var toolbar = /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(_EditorModule.default.toolbar, " ").concat(props.toolbarClassName ? props.toolbarClassName : "")
  }, editorOptions.map(function (item, index) {
    return /*#__PURE__*/_react.default.createElement("p", {
      key: index + item.value,
      className: _EditorModule.default.option,
      "data-active": activeOptions[item.label] ? "active" : "",
      onMouseDown: function onMouseDown(event) {
        return handleOptionMouseDown(event, item);
      },
      title: "".concat(item.label, " ").concat(item.shortcut ? "(".concat(item.shortcut, ")") : "")
    }, /*#__PURE__*/_react.default.createElement("span", null, item.icon ? /*#__PURE__*/_react.default.createElement(item.icon, null) : item.label));
  }));

  var styleMap = (_styleMap = {}, _defineProperty(_styleMap, inlineOptions.highlight, {
    backgroundColor: (props === null || props === void 0 ? void 0 : (_props$colors4 = props.colors) === null || _props$colors4 === void 0 ? void 0 : _props$colors4.highlight) || "#faed27"
  }), _defineProperty(_styleMap, inlineOptions.code, {
    // border: "1px solid #1d1c1d21",
    borderRadius: "3px",
    fontFamily: "monospace",
    color: ((_props$colors5 = props.colors) === null || _props$colors5 === void 0 ? void 0 : _props$colors5.code) || "#e01e5a"
  }), _styleMap);
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: containerRef,
    className: "".concat(props.readOnly ? _EditorModule.default.readOnly : "", " ").concat(_EditorModule.default.container, " ").concat(props.error ? props.errorClassName ? props.errorClassName : _EditorModule.default.error : "", " ").concat(props.className ? props.className : "")
  }, !props.readOnly && !props.toolbarToBottom ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, toolbar, !props.hideSeparator && /*#__PURE__*/_react.default.createElement("div", {
    className: _EditorModule.default.separator
  })) : "", /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(_EditorModule.default.editor)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _EditorModule.default.editorInner
  }, /*#__PURE__*/_react.default.createElement(_draftJs.Editor, {
    customStyleMap: styleMap,
    readOnly: props.readOnly,
    placeholder: props.placeholder || "",
    editorState: editorState,
    onChange: handleEditorOnChange,
    handleKeyCommand: handleKeyCommand,
    keyBindingFn: keyBindingFunction
  }))), props.toolbarToBottom && !props.readOnly ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !props.hideSeparator && /*#__PURE__*/_react.default.createElement("div", {
    className: _EditorModule.default.separator
  }), toolbar) : "");
}

Editor.propTypes = {
  defaultState: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  onChange: _propTypes.default.func,
  readOnly: _propTypes.default.bool,
  error: _propTypes.default.bool,
  className: _propTypes.default.string,
  errorClassName: _propTypes.default.string,
  toolbarToBottom: _propTypes.default.bool,
  hideSeparator: _propTypes.default.bool,
  colors: _propTypes.default.object,
  hiddenOptions: _propTypes.default.arrayOf(_propTypes.default.string)
};
var _default = Editor;
exports.default = _default;
