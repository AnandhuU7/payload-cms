import type { CollectionConfig, Option, SelectField } from 'payload';

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'subTitle',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        'Network Products',
        'Turbo',
        'Access Control',
        'Display'
      ],
      required: true,
    },
    {
      name: 'subCategory',
      type: 'select',
      options: [
        { label: 'Network Cameras', value: 'Network Cameras' },
        { label: 'PTZ Cameras', value: 'PTZ Cameras' },
        { label: 'Network Video Recorder', value: 'Network Video Recorder' },
        { label: 'Server', value: 'Server' },
        { label: 'Explosion-Proof and Anti-Corrosion Series', value: 'Explosion-Proof and Anti-Corrosion Series' },
        { label: 'Storage', value: 'Storage' },
        { label: 'Kits', value: 'Kits' }
      ],
      admin: {
        condition: (data) => data?.category === 'Network Products',
      }
    },
    {
      name: 'ptzFields',
      type: 'select',
      options: [
        { label: 'x', value: 'x' },
        { label: 'y', value: 'y' },
        { label: 'z', value: 'z' },
        { label: 'q.w', value: 'q.w' }
      ],
      admin: {
        condition: (data) => data?.subCategory === 'PTZ Cameras',
      }
    },
    {
      name: 'nvrFields',
      type: 'select',
      options: [
        { label: 'a', value: 'a' },
        { label: 'b', value: 'b' },
        { label: 'c', value: 'c' },
        { label: 'd', value: 'd' },
        { label: 'e.w', value: 'e.w' },
        { label: 'x', value: 'x' },
        { label: 'd2', value: 'd2' }
      ],
      admin: {
        condition: (data) => data?.subCategory === 'Network Video Recorder',
      }
    },
    {
      name: 'series',
      type: 'select',
      options: [
        { label: 'Pro Series (All)', value: 'Pro Series (All)' },
        { label: 'Ultra Series (SmartIP)', value: 'Ultra Series (SmartIP)' },
        { label: 'Value Series', value: 'Value Series' },
        { label: 'PanoVu Cameras', value: 'PanoVu Cameras' },
        { label: 'Wi-Fi Series', value: 'Wi-Fi Series' },
        { label: 'Special Series', value: 'Special Series' },
        { label: 'Solar-powered Series', value: 'Solar-powered Series' },
        { label: 'PT Series', value: 'PT Series' },
        { label: 'DeepinView Series', value: 'DeepinView Series' }
      ],
      admin: {
        condition: (data) => data?.subCategory === 'Network Cameras',
      }
    },
    {
      name: 'imgCard',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'imgAlt',
      type: 'text',
    },
    {
      name: 'thumbnails',
      type: 'array',
      fields: [
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
        }
      ]
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
        }
      ]
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
    },
    {
      name: 'reviewCount',
      type: 'number',
    },
    {
      name: 'specifications',
      type: 'array',
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
          label: 'Section Title (e.g. Camera, Lens)'
        },
        {
          name: 'content',
          type: 'textarea',
          label: 'Detailed Specifications'
        }
      ]
    }
  ],
};

export default Products;