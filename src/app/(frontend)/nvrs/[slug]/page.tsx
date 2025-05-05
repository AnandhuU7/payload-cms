import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import ProductDetails from '@/components/ProductDetails'

export async function generateStaticParams() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  const nvrs = await payload.find({
    collection: 'nvrs',
    limit: 100,
  })

  return nvrs.docs.map((nvr) => ({
    slug: nvr.slug,
  }))
}

export default async function NVRPage({ params }: { params: { slug: string } }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: [nvrData] } = await payload.find({
    collection: 'nvrs',
    where: {
      slug: {
        equals: params.slug
      }
    }
  })

  if (!nvrData) {
    return notFound()
  }

  return <ProductDetails product={nvrData} />
} 