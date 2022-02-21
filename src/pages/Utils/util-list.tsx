import {
  CheckOutlined,
  ClockCircleOutlined,
  FieldBinaryOutlined,
  LinkOutlined,
  NumberOutlined,
  PictureOutlined,
  SecurityScanOutlined,
  DiffOutlined,
  FileUnknownOutlined,
  // CompressOutlined,
} from '@ant-design/icons';

export const utilList = [
  {
    name: 'Code Formatter',
    path: 'formatter',
    icon: CheckOutlined,
  },
  {
    name: 'Diff Tool',
    path: 'diffTool',
    icon: DiffOutlined,
  },
  {
    name: 'JWT Decoder',
    path: 'jwt-decoder',
    icon: SecurityScanOutlined,
  },
  {
    name: 'Keycode Finder',
    path: 'keycode-finder',
    icon: NumberOutlined,
  },
  {
    name: 'URL Inspector',
    path: 'url-inspector',
    icon: LinkOutlined,
  },
  {
    name: 'Unix Time Converter',
    path: 'unix-time-converter',
    icon: ClockCircleOutlined,
  },
  {
    name: 'Base64 Encoder / Decoder',
    path: 'base64',
    icon: FieldBinaryOutlined,
  },
  {
    name: 'Image to Data URI',
    path: 'image2DataUri',
    icon: PictureOutlined,
  },
  // {
  //   name: 'Image Optimizer',
  //   path: 'imageOptimizer',
  //   icon: CompressOutlined,
  // },
  {
    name:'RegExp',
    icon: FileUnknownOutlined,
    path:'RegExp',
  },
  // end of list
];
