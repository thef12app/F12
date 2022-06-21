import {
  VscBracketDot,
  VscSymbolNumeric,
  VscLink,
  VscWatch,
  VscFileBinary,
  VscDiff,
  VscFileCode,
  VscJson,
} from 'react-icons/vsc';
export const utilList = [
  {
    name: 'Code Formatter',
    path: 'formatter',
    icon: VscFileCode,
  },
  {
    name: 'Diff Tool',
    path: 'diffTool',
    icon: VscDiff,
  },
  {
    name: 'JWT Decoder',
    path: 'jwt-decoder',
    icon: VscBracketDot,
  },
  {
    name: 'Keycode Finder',
    path: 'keycode-finder',
    icon: VscSymbolNumeric,
  },
  {
    name: 'URL Inspector',
    path: 'url-inspector',
    icon: VscLink,
  },
  {
    name: 'Unix Time Converter',
    path: 'unix-time-converter',
    icon: VscWatch,
  },
  {
    name: 'Base64 Encoder / Decoder',
    path: 'base64',
    icon: VscFileBinary,
  },
  {
    name: 'Image to Data URI',
    path: 'image2DataUri',
    icon: VscJson,
  },
  // {
  //   name: 'Image Optimizer',
  //   path: 'imageOptimizer',
  //   icon: CompressOutlined,
  // },
];
