import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Image from 'next/image'

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

export default async function DVRPage({ params }: Props) {
  const slug = await params
  const _headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: [dvrData] } = await payload.find({
    collection: 'dvrs',
    where: {
      slug: {
        equals: slug.slug
      }
    }
  })

  if (!dvrData) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{dvrData.title}</h1>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-6">
            {dvrData.imgCard && typeof dvrData.imgCard !== 'string' && (
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={dvrData.imgCard.url || ''}
                  alt={dvrData.imgAlt || dvrData.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            
            {/* Thumbnails */}
            {dvrData.thumbnails && dvrData.thumbnails.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {dvrData.thumbnails.map((thumb, index) => (
                  typeof thumb.thumbnail !== 'string' && thumb.thumbnail?.url && (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={thumb.thumbnail.url}
                        alt={`${dvrData.title} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{dvrData.title}</h1>
              {dvrData.subTitle && (
                <p className="text-xl text-gray-600 mb-6">{dvrData.subTitle}</p>
              )}
            </div>

            {/* Features */}
            {dvrData.features && dvrData.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <ul className="space-y-2">
                  {dvrData.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{feature.feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Rating */}
            {dvrData.rating && (
              <div className="flex items-center">
                <span className="text-yellow-500 text-2xl mr-2">★</span>
                <span className="text-gray-600">
                  {dvrData.rating} ({dvrData.reviewCount || 0} reviews)
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}