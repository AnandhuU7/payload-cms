'use client'

import React from 'react'
import { Dvr as DVR } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  dvr: DVR
}

const DVRCard: React.FC<Props> = ({ dvr }) => {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow-md transition-all duration-300 bg-white h-full w-[300px] hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/dvrs/${dvr.slug}`} className="block h-full">
        <div className="relative w-full pt-[75%] overflow-hidden">
          {dvr.imgCard && typeof dvr.imgCard !== 'string' && (
            <Image
              src={dvr.imgCard.url || ''}
              alt={dvr.imgAlt || dvr.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">{dvr.title}</h3>
          {dvr.subTitle && (
            <p className="text-sm text-gray-600 mb-2">{dvr.subTitle}</p>
          )}
          {dvr.rating && (
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-gray-600 text-sm">
                {dvr.rating} ({dvr.reviewCount} reviews)
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

export default DVRCard 