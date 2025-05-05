import type { CollectionConfig } from 'payload'

const NVRs: CollectionConfig = {
  slug: 'nvrs',
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
      type: 'text',
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
      type: 'json',
    }
  ],
};

export default NVRs; 