import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      validate: (val) => {
        if (!val || !val.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          return 'Please enter a valid email address'
        }
        return true
      }
    },
  ],
}
