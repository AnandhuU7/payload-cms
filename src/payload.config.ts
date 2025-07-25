// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Plants from './collections/Plants'
import { Seed } from './collections/Seeds'
import DVRs from './collections/DVRs'
import NVRs from './collections/NVRs'
import Products from './collections/Products'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media,Plants,Seed,DVRs,NVRs,Products],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  email: nodemailerAdapter({
    defaultFromAddress: 'admin@gmail.com',
    defaultFromName: 'Lovosis',
    transportOptions: {
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'admin@gmail.com',
        pass: 'admin',
      },
    },
  }),
})
