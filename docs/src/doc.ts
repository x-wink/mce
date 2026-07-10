import { flatDocumentToDocument } from '../../src'

console.warn('flatDocumentToDocument', flatDocumentToDocument({
  name: 'doc',
  children: {
    'page:0': {
      id: 'page:0',
      name: 'page:0',
      style: {
        width: 960,
        height: 540,
      },
      background: {
        enabled: true,
      },
      shape: { enabled: true },
      fill: {},
      outline: {},
      text: {},
      foreground: {},
      shadow: {},
      meta: {},
      childrenIds: [
        'aXENCu9UFr',
        '4ue6pUFOMj',
      ],
    },
    'aXENCu9UFr': {
      id: 'aXENCu9UFr',
      name: 'element:aXENCu9UFr',
      parentId: 'page:0',
      style: {
        width: 480,
        height: 266.6666666666667,
        left: 67.6484375,
        top: 44.69010416666666,
        rotate: 0,
      },
      background: {},
      shape: { enabled: true },
      fill: {},
      outline: {},
      text: {},
      foreground: {
        image: 'https://poster.cdn.bcebos.com/users/10007/20250701/929d6b31f5b9949c8827ede39e33a844.png',
        enabled: true,
      },
      shadow: {},
      meta: {
        type: 'picture',
      },
      childrenIds: [],
    },
    '4ue6pUFOMj': {
      id: '4ue6pUFOMj',
      name: 'element:4ue6pUFOMj',
      parentId: 'page:0',
      style: {
        width: 438.4453125,
        height: 91.953125,
        fontSize: 43.6865234375,
        fontWeight: 900,
        color: '#333333ff',
        left: 458.3203125,
        top: 357.69140625,
        rotate: 0,
      },
      background: {},
      shape: { enabled: true },
      fill: {},
      outline: {},
      text: {
        content: [
          {
            fragments: [
              {
                content: '双击编辑标题文字',
              },
            ],
          },
        ],
      },
      foreground: {},
      shadow: {},
      meta: {
        type: 'shape',
      },
      childrenIds: [],
    },
  },
  style: {
    width: 960,
    height: 540,
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(0, 0, 0, .12)',
    transformOrigin: 'center center',
    transform: 'translate(145.5px, -24px) scale(0.5)',
  },
  background: {
    color: '#FFFFFF',
  },
  outline: {
    color: 'rgba(0, 0, 0, .12)',
  },
}))
