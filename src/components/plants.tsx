'use client'

import React from 'react'
import { Plant } from '@/payload-types'

interface Props {
  plants: Plant[]
}

const Grid: React.FC<Props> = ({ plants }) => {
  return (
    <div className="w-full py-4">
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-screen-2xl mx-auto px-4">
        {plants.map((plant) => (
          <div 
            key={plant.id} 
            className="flex flex-col rounded-xl overflow-hidden shadow-md transition-all duration-300 bg-white h-full w-[300px] hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative w-full pt-[75%] overflow-hidden">
              {plant.image && typeof plant.image !== 'string' && (
                <img
                  src={plant.image.url || ''}
                  alt={plant.image.alt || plant.name}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/placeholder-plant.jpg'
                  }}
                />
              )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{plant.name}</h3>
              {plant.scientificName && (
                <p className="text-sm text-gray-500 italic mb-4">{plant.scientificName}</p>
              )}
              {plant.careLevel && (
                <div 
                  className={`self-start px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mt-auto ${
                    plant.careLevel.toLowerCase() === 'easy' 
                      ? 'bg-green-50 text-green-600' 
                      : plant.careLevel.toLowerCase() === 'medium' 
                        ? 'bg-amber-50 text-amber-600' 
                        : 'bg-red-50 text-red-600'
                  }`}
                >
                  {plant.careLevel} Care
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Grid