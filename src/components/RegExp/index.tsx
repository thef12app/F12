import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Checkbox,
  Col,
  Dropdown,
  Input,
  Menu,
  Row,
  Select,
  Space,
  Tag,
} from 'antd';
import { FlagOutlined } from '@ant-design/icons';
import { Highlighted } from './Highlight';
import { editor as monacoEditor, Range } from 'monaco-editor';

const { TextArea } = Input;
const { create } = monacoEditor;

enum flags {
  'g' = '/g',
  'i' = '/i',
}
export const RegExpressionComponent = () => {
  const [searchValue, setSearchValue] = useState('');
  const [text, setText] = useState('');
  const [err, setErr] = useState('');
  const [result, setResult] = useState(0);
  const [flag, setFlag] = useState<flags[]>([flags.g]);
  const [match, setMatch] = useState(true);
  const editorRef = useRef(null);
  const [editor, setEditor] = useState<any>();

  useEffect(() => {
    if (editorRef.current) {
      const editor = create(editorRef.current, {
        automaticLayout: true,
        matchBrackets: 'never',
        selectionHighlight: false,
        occurrencesHighlight: false,
        renderLineHighlight: 'none',
        lineNumbers: 'off',
        insertSpaces: true,
        renderWhitespace: 'all',
        suggest: {
          showWords: false,
        },
        detectIndentation: false,
        guides: { indentation: false },
        folding: false,
        wordWrap: 'on',
        autoIndent: 'none',
        padding: {
          top: 16,
          bottom: 16,
        },
        minimap: {
          enabled: false,
        },
      });
      editor.onDidChangeModelContent(() => {
        setText(editor.getValue());
      });
      setEditor(editor);
    }
  }, [editorRef.current]);

  const searchRegularExpression = () => {
    try {
      const regex = new RegExp(searchValue, 'g');
      const match = text.matchAll(regex);
      let me;
      let matches = [];
      do {
        me = match.next();
        matches.push(me.value);
      } while (me.done === false);
      matches = matches.filter((item) => item !== undefined);

      if (matches.length) {
        setErr('');
        setResult(matches.length);
        console.log(matches);
        setMatch(true);
        highlightWords(matches);
      } else {
        setMatch(false);
      }
    } catch (err: any) {
      setErr(err.message);
      console.log(err);
    }
  };
  const highlightWords = (matches: any[]) => {
    if (!editor) {
      return;
    }
    if (editor) {
      editor.deltaDecorations(
        [],
        [
          {
            range: new Range(2, matches[0].index + matches[0].length, 3, 1),
            options: {
              isWholeLine: true,
              className: 'highlight-line',
            },
          },
        ]
      );
    }
  };
  const selectFlag = (newFlag: flags, checked: Boolean) => {
    if (checked) {
      setFlag((flag) => [...flag, newFlag]);
    } else {
      setFlag((flag) => flag.filter((f) => f !== newFlag));
    }
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Checkbox
          checked={flag.includes(flags.g)}
          onChange={(e) => {
            e.preventDefault();
            selectFlag(flags.g, e.target.checked);
          }}
        >
          {' '}
          Global <Tag color="grey">/g</Tag>
        </Checkbox>
      </Menu.Item>
      <Menu.Item>
        <Checkbox
          checked={flag.includes(flags.i)}
          onChange={(ev) => {
            ev.preventDefault();
            selectFlag(flags.i, ev.target.checked);
          }}
        >
          {' '}
          Case-Insensitive <Tag color="lightgrey">/i</Tag>
        </Checkbox>
      </Menu.Item>
      <Menu.Item disabled>
        <Checkbox> Multi-line</Checkbox>
      </Menu.Item>
      <Menu.Item disabled>
        <Checkbox> Single line</Checkbox>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    if (searchValue !== '' && text !== '' && editorRef.current) {
      searchRegularExpression();
    }
  }, [searchValue, text]);

  return (
    <Space style={{ width: '100%' }} direction="vertical" size={5}>
      <Row>
        <Col span={22}>
          <Input
            autoFocus
            addonBefore="/"
            addonAfter={flag.length ? flag.join(' ') : '/'}
            value={searchValue}
            style={{ fontSize: 22 }}
            placeholder="Enter Regular Expression"
            onChange={(event) => {
              setSearchValue(event.target.value);
              try {
                const regexp = new RegExp(event.target.value);
                setErr('');
              } catch {
                setErr('Invalid Regular Expression');
              }
            }}
          ></Input>
        </Col>
        <Col span={2}>
          <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
            <Button style={{ marginLeft: '5px' }} icon={<FlagOutlined />}>
              {' '}
              Flags
            </Button>
          </Dropdown>
        </Col>
      </Row>
      <div style={{ minHeight: '20px' }}>
        <span>
          {err && (
            <span>
              <Tag color="red">{err}</Tag>
            </span>
          )}
          {!match && (
            <span>
              <Tag color="orange">"No matches"</Tag>
            </span>
          )}
        </span>
        <span>{result && <Tag color="green">Results: {result}</Tag>}</span>
        <span> </span>
      </div>
      <div
        style={{
          height: '80vh',
          width: '100%',
          border: '1px solid #eee',
          padding: '5px',
        }}
        ref={editorRef}
      ></div>
      {/* <Highlighted
          style={{ height: '80vh' }}
          text={text}
          highlight={err ? '' : searchValue}
        /> */}
      {/* <TextArea
          placeholder="Enter text here"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
        ></TextArea> */}
      ;
    </Space>
  );
};
