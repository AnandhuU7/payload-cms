import type { CollectionConfig } from 'payload'

const Plants: CollectionConfig = {
  slug: 'plants',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'scientificName',
      type: 'text',
    },
    {
      name: 'careLevel',
      type: 'select',
      options: ['Easy', 'Medium', 'Hard'],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
};

export default Plants;