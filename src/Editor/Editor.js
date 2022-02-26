import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  convertFromRaw,
  Editor as DraftEditor,
  EditorState,
  RichUtils,
  convertToRaw,
  getDefaultKeyBinding,
  KeyBindingUtil,
} from "draft-js";
import "draft-js/dist/Draft.css";

import {
  BiHighlight as Highlight,
  BiBold as Bold,
  BiListUl as List,
  BiListOl as NumberedList,
  BiUnderline as Underline,
  BiStrikethrough as Strikethrough,
  BiCode as Code,
} from "react-icons/bi";
import { AiOutlineItalic as Italic } from "react-icons/ai";

import styles from "./Editor.module.css";

function Editor(props) {
  const keyCodes = {
    s: 83,
    b: 66,
    i: 73,
    o: 79,
    u: 85,
    l: 76,
    h: 72,
    c: 67,
  };

  const inlineOptions = {
    bold: "BOLD",
    italic: "ITALIC",
    underline: "UNDERLINE",
    strikethrough: "STRIKETHROUGH",
    highlight: "HIGHLIGHT",
    code: "CODE",
  };
  const blockOptions = {
    ol: "ordered-list-item",
    ul: "unordered-list-item",
    h1: "header-one",
    h2: "header-two",
  };

  const allEditorOptions = [
    {
      label: "bold",
      value: inlineOptions.bold,
      type: "inline",
      icon: Bold,
      shortcut: "Ctrl+b",
    },
    {
      label: "italic",
      value: inlineOptions.italic,
      type: "inline",
      icon: Italic,
      shortcut: "Ctrl+i",
    },
    {
      label: "underline",
      value: inlineOptions.underline,
      type: "inline",
      icon: Underline,
      shortcut: "Ctrl+u",
    },
    {
      label: "strikethrough",
      value: inlineOptions.strikethrough,
      type: "inline",
      icon: Strikethrough,
      shortcut: "Ctrl+shift+s",
    },
    {
      label: "highlight",
      value: inlineOptions.highlight,
      type: "inline",
      icon: Highlight,
      shortcut: "Ctrl+h",
    },
    {
      label: "code",
      value: inlineOptions.code,
      type: "inline",
      icon: Code,
      shortcut: "Ctrl+shift+c",
    },
    {
      label: "ul",
      value: blockOptions.ul,
      type: "block",
      icon: List,
      shortcut: "Ctrl+l",
    },
    {
      label: "ol",
      value: blockOptions.ol,
      type: "block",
      icon: NumberedList,
      shortcut: "Ctrl+o",
    },
    {
      label: "h1",
      value: blockOptions.h1,
      type: "block",
    },
    {
      label: "h2",
      value: blockOptions.h2,
      type: "block",
    },
  ];

  const containerRef = useRef();
  const [editorOptions, setEditorOptions] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [activeOptions, setActiveOptions] = useState({
    bold: false,
    italic: false,
    underline: false,
    ul: false,
    ol: false,
    code: false,
    highlight: false,
    strikethrough: false,
    h1: false,
    h2: false,
  });

  const changeActiveOption = (currentState) => {
    const tempActiveOptions = { ...activeOptions };
    const currentStyle = currentState.getCurrentInlineStyle();
    const selection = currentState.getSelection();
    const blockType = currentState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

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

  const handleBlockTypeClick = (option) => {
    setActiveOptions((prev) => ({
      ...prev,
      [option.label]: !prev[option.label],
    }));

    const state = RichUtils.toggleBlockType(editorState, option.value);
    setEditorState(state);
  };

  const handleInlineTypeClick = (option) => {
    if (editorState?.getCurrentInlineStyle().has(option.value)) {
      setActiveOptions((prev) => ({
        ...prev,
        [option.label]: false,
      }));
    } else {
      setActiveOptions((prev) => ({
        ...prev,
        [option.label]: true,
      }));
    }

    const state = RichUtils.toggleInlineStyle(editorState, option.value);
    setEditorState(state);
  };

  const handleOptionMouseDown = (event, item) => {
    event.preventDefault();

    if (item.type == "inline") {
      handleInlineTypeClick(item);
    } else if (item.type == "block") {
      handleBlockTypeClick(item);
    }
  };

  const handleEditorOnChange = (currentState) => {
    const contentState = currentState.getCurrentContent();
    let content;
    try {
      content = convertToRaw(contentState);
    } catch (err) {
      content = "";
    }

    const stringifyContent = JSON.stringify(content);

    if (props.onChange) {
      if (contentState?.getPlainText()?.trim())
        props.onChange(stringifyContent);
      else props.onChange("");
    }
    if (props.getPlaneTextOnChange) {
      props.getPlaneTextOnChange(contentState?.getPlainText());
    }

    changeActiveOption(currentState);
    setEditorState(currentState);
  };

  const handleKeyCommand = (command) => {
    let state = "";

    switch (command) {
      case inlineOptions.bold: {
        state = RichUtils.toggleInlineStyle(editorState, inlineOptions.bold);
        break;
      }
      case inlineOptions.italic: {
        state = RichUtils.toggleInlineStyle(editorState, inlineOptions.italic);
        break;
      }
      case inlineOptions.underline: {
        state = RichUtils.toggleInlineStyle(
          editorState,
          inlineOptions.underline
        );
        break;
      }
      case inlineOptions.highlight: {
        state = RichUtils.toggleInlineStyle(
          editorState,
          inlineOptions.highlight
        );
        break;
      }
      case inlineOptions.strikethrough: {
        state = RichUtils.toggleInlineStyle(
          editorState,
          inlineOptions.strikethrough
        );
        break;
      }
      case inlineOptions.code: {
        state = RichUtils.toggleInlineStyle(editorState, inlineOptions.code);
        break;
      }
      case blockOptions.ol: {
        state = RichUtils.toggleBlockType(editorState, blockOptions.ol);
        break;
      }
      case blockOptions.ul: {
        state = RichUtils.toggleBlockType(editorState, blockOptions.ul);
        break;
      }
      case blockOptions.h1: {
        state = RichUtils.toggleBlockType(editorState, blockOptions.h1);
        break;
      }
      case blockOptions.h2: {
        state = RichUtils.toggleBlockType(editorState, blockOptions.h2);
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

  const keyBindingFunction = (event) => {
    if (KeyBindingUtil.hasCommandModifier(event)) {
      if (event.keyCode === keyCodes.b) return inlineOptions.bold;
      else if (event.keyCode === keyCodes.i) return inlineOptions.italic;
      else if (event.keyCode === keyCodes.h) return inlineOptions.highlight;
      else if (event.keyCode === keyCodes.c && event.shiftKey)
        return inlineOptions.code;
      else if (event.keyCode === keyCodes.s && event.shiftKey)
        return inlineOptions.strikethrough;
      else if (event.keyCode === keyCodes.u) return inlineOptions.underline;
      else if (event.keyCode === keyCodes.o) return blockOptions.ol;
      else if (event.keyCode === keyCodes.l) return blockOptions.ul;
    }

    return getDefaultKeyBinding(event);
  };

  const generateEditorOptions = () => {
    if (Array.isArray(props.hiddenOptions) && props.hiddenOptions?.length > 0) {
      const hidden = [...props.hiddenOptions];
      const resultedOptions = allEditorOptions.filter(
        (item) =>
          hidden?.findIndex((hiddenItem) =>
            hiddenItem?.toLowerCase
              ? hiddenItem.toLowerCase() === item?.value?.toLowerCase()
              : false
          ) < 0
      );

      setEditorOptions(resultedOptions);
    } else setEditorOptions(allEditorOptions);
  };

  const assignColors = () => {
    const primary = props.colors?.primary;
    const error = props.colors?.error;
    const options = props.colors?.options;

    if (primary) containerRef?.current?.style.setProperty("--primary", primary);
    if (error) containerRef?.current?.style.setProperty("--error", error);
    if (options) containerRef?.current?.style.setProperty("--option", options);
  };

  useEffect(() => {
    if (props.colors) {
      assignColors();
    }

    if (!props.defaultState) return;
    try {
      const defaultState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(props.defaultState))
      );
      setEditorState(defaultState);
    } catch (err) {
      // do not do anything
    }
  }, []);

  useEffect(() => {
    generateEditorOptions();
  }, [props.hiddenOptions]);

  const toolbar = (
    <div
      className={`${styles.toolbar} ${
        props.toolbarClassName ? props.toolbarClassName : ""
      }`}
    >
      {editorOptions.map((item, index) => (
        <p
          key={index + item.value}
          className={styles.option}
          data-active={activeOptions[item.label] ? "active" : ""}
          onMouseDown={(event) => handleOptionMouseDown(event, item)}
          title={`${item.label} ${item.shortcut ? `(${item.shortcut})` : ""}`}
        >
          <span>{item.icon ? <item.icon /> : item.label}</span>
        </p>
      ))}
    </div>
  );

  const styleMap = {
    [inlineOptions.highlight]: {
      backgroundColor: props?.colors?.highlight || "#faed27",
    },
    [inlineOptions.code]: {
      // border: "1px solid #1d1c1d21",
      borderRadius: "3px",
      fontFamily: "monospace",
      color: props.colors?.code || "#e01e5a",
    },
  };

  return (
    <div
      ref={containerRef}
      className={`${props.readOnly ? styles.readOnly : ""} ${
        styles.container
      } ${
        props.error
          ? props.errorClassName
            ? props.errorClassName
            : styles.error
          : ""
      } ${props.className ? props.className : ""}`}
    >
      {!props.readOnly && !props.toolbarToBottom ? (
        <>
          {toolbar}
          {!props.hideSeparator && <div className={styles.separator} />}
        </>
      ) : (
        ""
      )}
      <div className={`${styles.editor}`}>
        <div className={styles.editorInner}>
          <DraftEditor
            customStyleMap={styleMap}
            readOnly={props.readOnly}
            placeholder={props.placeholder || ""}
            editorState={editorState}
            onChange={handleEditorOnChange}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={keyBindingFunction}
          />
        </div>
      </div>

      {props.toolbarToBottom && !props.readOnly ? (
        <>
          {!props.hideSeparator && <div className={styles.separator} />}
          {toolbar}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

Editor.propTypes = {
  defaultState: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  getPlaneTextOnChange: PropTypes.func,
  readOnly: PropTypes.bool,
  error: PropTypes.bool,
  className: PropTypes.string,
  errorClassName: PropTypes.string,
  toolbarToBottom: PropTypes.bool,
  hideSeparator: PropTypes.bool,
  colors: PropTypes.object,
  hiddenOptions: PropTypes.arrayOf(PropTypes.string),
};

function getPlaneTextFromEditorState(state) {
  if (!state) return "";

  let currentState;
  try {
    currentState = EditorState.createWithContent(
      convertFromRaw(JSON.parse(state))
    );
  } catch (err) {
    return "";
  }

  return currentState.getCurrentContent().getPlainText();
}

export { Editor as default, getPlaneTextFromEditorState };
