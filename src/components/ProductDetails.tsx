'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Mail, Cpu } from 'lucide-react'

type Thumbnail = {
  thumbnail?: { url: string } | string
  src?: string
}

type Specification = {
  key: string
  value: string | Record<string, string>
}

export type ProductData = {
  id: string
  title: string
  subTitle?: string | null
  category?: string | null
  features: Array<{ feature?: string | null, id?: string | null }> | null
  imgAlt?: string
  imgCard: { url: string } | string
  thumbnails?: Thumbnail[]
  specifications?: Array<{
    category: string
    items?: Array<{
      key: string
      value: string
      id?: string | null
    }> | null
    id?: string | null
  }> | null
  rating?: number
  reviewCount?: number
  slug: string
}

interface Props {
  product: ProductData
}

const ProductDetails: React.FC<Props> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [openSpecCategories, setOpenSpecCategories] = useState<Record<string, boolean>>({})
  
  const {
    title,
    subTitle,
    category,
    features,
    imgAlt,
    imgCard,
    thumbnails,
    specifications,
    rating,
    reviewCount
  } = product;

  const formattedFeatures = features 
    ? features.map(f => f?.feature).filter(Boolean) as string[] 
    : []

  const formattedThumbnails = thumbnails?.map(thumb => {
    if (typeof thumb === 'string') return { src: thumb }
    if (thumb.src) return thumb
    if (thumb.thumbnail && typeof thumb.thumbnail !== 'string') return { src: thumb.thumbnail.url }
    return { src: '' }
  }).filter(t => t.src) || []

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      (prev - 1 + formattedThumbnails.length) % formattedThumbnails.length
    )
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      (prev + 1) % formattedThumbnails.length
    )
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  const toggleSpecCategory = (category: string) => {
    setOpenSpecCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  const getImageUrl = (img: any): string => {
    if (!img) return '/api/placeholder/400/320'
    if (typeof img === 'string') return img
    if (img.url) return img.url
    if (img.src) return img.src
    return '/api/placeholder/400/320'
  }

  useEffect(() => {
    const featureCards = document.querySelectorAll('.feature-card')
    featureCards.forEach((card, index) => {
      const htmlCard = card as HTMLElement
      htmlCard.style.setProperty('--animation-order', index.toString())
      setTimeout(() => {
        htmlCard.style.opacity = '1'
      }, 100 * index)
    })
  }, [])

  const specificationItems = (() => {
    if (!specifications) return []
    
    return specifications.map(specGroup => ({
      category: specGroup.category,
      specs: specGroup.items?.map(item => ({
        key: item.key,
        value: item.value
      })) || []
    }))
  })()

  const mainImageUrl = formattedThumbnails.length > 0 
    ? formattedThumbnails[currentImageIndex]?.src
    : getImageUrl(imgCard)

  return (
    <main className="container mx-auto px-4 py-6 sm:py-10 bg-slate-50">
      <div className="product-container max-w-6xl mx-auto">
        {/* Product Header */}
        <div className="mb-8 sm:mb-12 text-center md:text-left">
          <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
            <span className="text-sm text-red-600 font-medium hover:text-red-700 transition-colors">
              {category}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-xs bg-gradient-to-r from-red-500 to-black text-white px-3 py-1 rounded-full font-bold tracking-wider shadow-sm">
              NEW
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-black">
            {title}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto md:mx-0">{subTitle}</p>
        </div>

        {/* Product Main Content */}
        <div className="product-content flex flex-col lg:flex-row gap-10 sm:gap-16">
          {/* Left: Product Images */}
          <div className="product-images w-full lg:w-5/12">
            <div className="main-image-container mb-6 sm:mb-8 relative group overflow-hidden rounded-3xl shadow-lg border-2 border-red-100">
              <div className="relative w-full h-72 md:h-96 bg-white p-4 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:to-white">
                <Image
                  src={mainImageUrl || '/api/placeholder/400/320'}
                  alt={imgAlt || title}
                  fill
                  className="object-contain transition-all duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              </div>
              {formattedThumbnails.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="nav-arrow prev-arrow flex absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-red-50 rounded-full p-3 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-10 group-hover:translate-x-0 border border-red-100"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      ></path>
                    </svg>
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="nav-arrow next-arrow flex absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-red-50 rounded-full p-3 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-10 group-hover:translate-x-0 border border-red-100"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {formattedThumbnails.length > 0 && (
              <div className="thumbnails grid grid-cols-4 gap-3 sm:gap-4">
                {formattedThumbnails.map((thumbnail, index) => (
                  <div
                    key={`thumb-${index}`}
                    onClick={() => handleThumbnailClick(index)}
                    className={`thumbnail-item ${
                      index === currentImageIndex ? "ring-2 ring-red-500 scale-105" : "ring-1 ring-red-100"
                    } rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-red-400 hover:-translate-y-1 hover:shadow-md group`}
                  >
                    <div className="relative w-full aspect-square bg-gradient-to-br from-red-50 to-white">
                      <Image
                        src={thumbnail.src || '/api/placeholder/100/100'}
                        alt={`${imgAlt || title} ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110 p-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Features */}
          <div className="product-features w-full lg:w-6/12 mt-8 lg:mt-0 lg:pl-8 flex flex-col">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <span className="bg-gradient-to-r from-red-500 to-black w-2 h-8 rounded-full mr-3"></span>
              Product Features
            </h2>

            {/* Features List */}
            <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {formattedFeatures.map((feature, index) => (
                <div 
                  key={`feature-${index}`}
                  className="feature-card bg-gradient-to-br from-white to-red-50 p-4 sm:p-5 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-red-200 group"
                  style={{ opacity: 0 }}
                >
                  <div className="feature-number bg-gradient-to-r from-red-500 to-black text-white font-bold rounded-full w-7 h-7 flex items-center justify-center mb-3 group-hover:shadow-md transition-all duration-300">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base font-medium leading-relaxed group-hover:text-gray-900 transition-colors">
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            {/* Sales Inquiry Button */}
            <div className="mt-8 sm:mt-10">
              <Link
                href="/contact"
                className="sales-inquiry-btn group flex items-center justify-center w-full py-4 px-6 bg-gradient-to-r from-red-500 to-black text-white rounded-xl font-semibold tracking-wide hover:from-red-600 hover:to-black transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <Mail className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                Request Information
              </Link>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="specifications-section mt-20 sm:mt-28">
          <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center justify-center sm:justify-start">
            <Cpu className="w-6 h-6 mr-3 text-red-500" />
            Technical Specifications
          </h2>

          <div className="space-y-4">
            {specificationItems.map((specGroup, groupIndex) => (
              <div key={`spec-category-${groupIndex}`} className="spec-category">
                <button
                  className="spec-toggle w-full bg-white p-5 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-all duration-300 flex justify-between items-center hover:bg-red-50/30"
                  aria-expanded={openSpecCategories[specGroup.category] || false}
                  onClick={() => toggleSpecCategory(specGroup.category)}
                >
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <svg
                      className="w-5 h-5 mr-3 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {specGroup.category}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-red-500 transition-transform duration-300 ${
                      openSpecCategories[specGroup.category] ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`spec-content overflow-hidden transition-all duration-300 ease-in-out ${
                    openSpecCategories[specGroup.category] 
                      ? 'max-h-[1000px] opacity-100 mt-0' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="bg-gradient-to-br from-white to-red-50 p-6 pt-4 rounded-b-xl border-x border-b border-red-100 shadow-inner">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <tbody className="divide-y divide-red-100">
                          {Array.isArray(specGroup.specs) && specGroup.specs.map((spec, specIndex) => (
                            <tr key={`spec-${specIndex}`} className="hover:bg-red-50/50">
                              <td className="py-3 pr-4 text-red-700 font-semibold text-sm whitespace-nowrap">
                                {typeof spec.key === 'string' ? spec.key : 'Property'}
                              </td>
                              <td className="py-3 pl-4 text-gray-800 text-sm">
                                {typeof spec.value === 'string' 
                                  ? spec.value.split('\n').map((val, i) => (
                                      <div key={i} className={i > 0 ? 'mt-1 pl-4' : ''}>
                                        {val.split(';').map((v, j) => (
                                          <div key={j} className={j > 0 ? 'mt-1' : ''}>
                                            {v.trim()}
                                          </div>
                                        ))}
                                      </div>
                                    ))
                                  : JSON.stringify(spec.value)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  )
}

export default ProductDetails