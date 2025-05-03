import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import Grid from '@/components/plants'

export default async function PlantsPage() {
  const _headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  const plants = await payload.find({
    collection: 'plants',
    limit: 20,
    sort: '-createdAt'
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Plants</h1>
      <Grid plants={plants.docs} />
    </div>
  )
}