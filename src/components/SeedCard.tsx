'use client'

import React from 'react'
import { Seed } from '@/payload-types'
import Image from 'next/image'

interface Props {
  seeds: Seed[]
}

const SeedGrid: React.FC<Props> = ({ seeds }) => {
  return (
    <div className="w-full py-4">
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-screen-2xl mx-auto px-4">
        {seeds.map((seed) => (
          <div 
            key={seed.id} 
            className="flex flex-col rounded-xl overflow-hidden shadow-md transition-all duration-300 bg-white h-full w-[300px] hover:-translate-y-1 hover:shadow-lg"
          >
            {seed.image && typeof seed.image !== 'string' && (
              <Image
                src={seed.image.url || ''}
                alt={seed.image.alt || seed.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{seed.name}</h3>
              {seed.plantType && (
                <p className="text-sm text-gray-600 mb-2">Type: {seed.plantType}</p>
              )}
              {seed.germinationTime && (
                <p className="text-sm text-gray-600">Germination: {seed.germinationTime} days</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SeedGrid