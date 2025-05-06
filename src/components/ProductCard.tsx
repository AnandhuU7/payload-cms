'use client'

import React from 'react'
import { Dvr, Nvr } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  product: Dvr | Nvr
  basePath: string
}

const ProductCard: React.FC<Props> = ({ product, basePath }) => {
  const isNew = new Date(product.createdAt) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
  
  return (
    <div className="group">
      <div
        className="product-card bg-white rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl transform transition-all duration-300 border-2 border-gray-100 hover:border-red-300 group-hover:-translate-y-2"
      >
        <Link href={`/${basePath}/${product.slug}`} className="block h-full">
          <div className="relative overflow-hidden">
            <div className="h-64 bg-white flex items-center justify-center p-4 relative">
              {product.imgCard && typeof product.imgCard !== 'string' && (
                <Image
                  src={product.imgCard.url || ''}
                  alt={product.imgAlt || product.title}
                  fill
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
              )}
              {isNew && (
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md">
                  NEW
                </div>
              )}
            </div>
          </div>

          <div className="px-4 py-3 flex-grow">
            <h3 className="product-title font-bold text-lg mb-1 text-black group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
              {product.title}
            </h3>
            {product.subTitle && (
              <p className="text-xs text-gray-700 mb-1 line-clamp-1">{product.subTitle}</p>
            )}
            {product.rating && (
              <div className="flex items-center mt-1">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const starValue = i + 1
                    const rating = product.rating || 0
                    const isHalfStar = rating >= starValue - 0.5 && rating < starValue
                    const isFullStar = rating >= starValue

                    return (
                      <span
                        key={i}
                        className={`text-sm ${
                          isFullStar
                            ? "text-red-500"
                            : isHalfStar
                              ? "text-gray-300 relative"
                              : "text-gray-300"
                        }`}
                      >
                        {isHalfStar ? (
                          <span className="relative">
                            ★
                            <span
                              className="absolute top-0 left-0 overflow-hidden text-red-500"
                              style={{ width: '50%' }}
                            >
                              ★
                            </span>
                          </span>
                        ) : (
                          "★"
                        )}
                      </span>
                    )
                  })}
                </div>
                <span className="ml-1 text-gray-700 text-xs">
                  ({product.reviewCount})
                </span>
              </div>
            )}
          </div>
        </Link>

        <div className="mt-auto px-4 py-3 border-t border-gray-100">
          <Link
            href={`/${basePath}/${product.slug}`}
            className="bg-black text-white font-medium rounded-full px-4 py-1 flex items-center justify-center transition-all duration-300 hover:bg-red-700 hover:font-semibold hover:translate-x-1 w-full text-sm"
          >
            View Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 transform transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard