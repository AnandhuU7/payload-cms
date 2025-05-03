import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'
import Grid from '../../components/plants'
import SeedGrid from '../../components/SeedCard'
import Navbar from '../../components/Navbar'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user: _user } = await payload.auth({ headers })
  
  const [plants, seeds] = await Promise.all([
    payload.find({
      collection: 'plants',
      limit: 10
    }),
    payload.find({
      collection: 'seeds',
      limit: 10
    })
  ]);

  return (
    <div className="home">
      <Navbar/>
      <div className="content">
        <h2 className="text-2xl font-bold mb-4">Plants</h2>
        <Grid plants={plants.docs} />
        
        <h2 className="text-2xl font-bold mb-4 mt-8">Seeds</h2>
        <SeedGrid seeds={seeds.docs} />
      </div>
    </div>
  )
}