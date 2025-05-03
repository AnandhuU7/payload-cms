'use client'

import React from 'react'
import { Dvr as DVR } from '@/payload-types'
import DVRCard from './DVRCard'

interface Props {
  dvrs: DVR[]
}

const DVRGrid: React.FC<Props> = ({ dvrs }) => {
  return (
    <div className="w-full py-4">
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-screen-2xl mx-auto px-4">
        {dvrs.map((dvr) => (
          <DVRCard key={dvr.id} dvr={dvr} />
        ))}
      </div>
    </div>
  )
}

export default DVRGrid 