import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Image from 'next/image'

// @ts-ignore - Bypass type checking for development
export default async function PlantPage({ params }: any) {
  try {
    const _headers = await getHeaders()
    const payloadConfig = await config
    const payload = await getPayload({ 
      config: payloadConfig
    })
    
    const plant = await payload.findByID({
      collection: 'plants',
      id: params.slug,
      depth: 1 
    })

    if (!plant) {
      notFound()
    }

    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-6">
            {plant.image && typeof plant.image !== 'string' && (
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={plant.image.url || ''}
                  alt={plant.image.alt || plant.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* Quick Facts */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Quick Facts</h2>
              <div className="space-y-3">
                {plant.careLevel && (
                  <div className="flex items-center">
                    <span className="w-32 font-medium text-gray-600">Care Level:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      plant.careLevel.toLowerCase() === 'easy' 
                        ? 'bg-green-100 text-green-800' 
                        : plant.careLevel.toLowerCase() === 'medium' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {plant.careLevel}
                    </span>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{plant.name}</h1>
              {plant.scientificName && (
                <p className="text-xl italic text-gray-600 mb-6">{plant.scientificName}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching plant:', error)
    notFound()
  }
}