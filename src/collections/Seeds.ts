import type { CollectionConfig } from 'payload'

export const Seed: CollectionConfig = {
  slug: 'seeds',
  labels: {
    singular: 'Seed',
    plural: 'Seeds',
  },
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
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'plantType',
      type: 'text',
    },
    {
      name: 'germinationTime',
      type: 'number',
      label: 'Germination Time (days)',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}