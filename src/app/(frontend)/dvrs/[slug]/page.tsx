import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import ProductDetails from '@/components/ProductDetails'

interface Media {
  url: string
  alt?: string
  width?: number
  height?: number
}

interface DVRData {
  id: string
  slug: string
  title: string
  subTitle?: string
  imgCard?: Media | string
  imgAlt?: string
  thumbnails?: Array<{ thumbnail?: Media | string }>
  features?: Array<{ feature: string }>
  rating?: number
  reviewCount?: number
}

interface Props {
  params: Promise<{
    slug: string
  }>
  searchParams?: Promise<{
    [key: string]: string | string[]
  }>
}

export async function generateStaticParams() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  const dvrs = await payload.find({
    collection: 'dvrs',
    limit: 100,
  })

  return dvrs.docs.map((dvr) => ({
    slug: dvr.slug,
  }))
}

export default async function DVRPage({ params }: { params: { slug: string } }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: [dvrData] } = await payload.find({
    collection: 'dvrs',
    where: {
      slug: {
        equals: params.slug
      }
    }
  })

  if (!dvrData) {
    return notFound()
  }

  return <ProductDetails product={dvrData} />
}