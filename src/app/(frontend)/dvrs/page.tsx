import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import DVRGrid from '@/components/DVRGrid'

export default async function DVRsPage() {
  const _headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  const dvrs = await payload.find({
    collection: 'dvrs',
    limit: 20,
    sort: '-createdAt'
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All DVRs</h1>
      <DVRGrid dvrs={dvrs.docs} />
    </div>
  )
} 