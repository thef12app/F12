import {
  CheckOutlined,
  ClockCircleOutlined,
  FieldBinaryOutlined,
  LinkOutlined,
  NumberOutlined,
  PictureOutlined,
  SecurityScanOutlined,
} from '@ant-design/icons';

export const utilList = [
  {
    name: 'Code Formatter',
    path: 'formatter',
    componentName: 'JsonFormat',
    icon: CheckOutlined,
  },
  {
    name: 'JWT Decoder',
    path: 'jwt-decoder',
    componentName: 'JwtEncoderDecoder',
    icon: SecurityScanOutlined,
  },
  {
    name: 'Keycode Finder',
    path: 'keycode-finder',
    componentName: 'KeyCodeFinder',
    icon: NumberOutlined,
  },
  {
    name: 'URL Inspector',
    path: 'url-inspector',
    componentName: 'UriInspector',
    icon: LinkOutlined,
  },
  {
    name: 'Unix Time Converter',
    path: 'unix-time-converter',
    componentName: 'UnixTimeConverter',
    icon: ClockCircleOutlined,
  },
  {
    name: 'Base64 Encoder / Decoder',
    path: 'base64',
    componentName: 'Base64',
    icon: FieldBinaryOutlined,
  },
  {
    name: 'Image to Data URI',
    path: 'image2DataUri',
    componentName: 'ImageToDataURI',
    icon: PictureOutlined,
  },
];
