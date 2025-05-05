'use client'

import React from 'react'
import { Dvr as Product } from '@/payload-types'
import Image from 'next/image'

interface Props {
  product: Product
}

const ProductDetails: React.FC<Props> = ({ product }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-6">
            {product.imgCard && typeof product.imgCard !== 'string' && (
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={product.imgCard.url || ''}
                  alt={product.imgAlt || product.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            
            {/* Thumbnails */}
            {product.thumbnails && product.thumbnails.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {product.thumbnails.map((thumb, index) => (
                  typeof thumb.thumbnail !== 'string' && thumb.thumbnail?.url && (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={thumb.thumbnail.url}
                        alt={`${product.title} thumbnail ${index + 1}`}
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.title}</h1>
              {product.subTitle && (
                <p className="text-xl text-gray-600 mb-6">{product.subTitle}</p>
              )}
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{feature.feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                <ul className="space-y-3">
                  {product.specifications.map((spec, index) => (
                    <li key={index} className="grid grid-cols-2 gap-4">
                      <span className="font-medium text-gray-600">{spec.key}</span>
                      <span>{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center">
                <span className="text-yellow-500 text-2xl mr-2">★</span>
                <span className="text-gray-600">
                  {product.rating} ({product.reviewCount || 0} reviews)
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails 