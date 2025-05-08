import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import ProductDetails, { type ProductData } from '@/components/ProductDetails'

export async function generateStaticParams() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  const dvrs = await payload.find({
    collection: 'products',
    limit: 100,
  })

  return dvrs.docs.map((dvr) => ({
    slug: dvr.slug,
  }))
}

interface PageParams {
  params: {
    slug: string
  }
}
export default async function DVRPage({ params }: PageParams) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'dvrs',
    where: {
      slug: {
        equals: params.slug
      }
    },
    limit: 1
  })

  if (!docs.length) return notFound()

  const dvrData = docs[0]
  
  const product: ProductData = {
    id: dvrData.id,
    title: dvrData.title,
    slug: dvrData.slug,
    subTitle: dvrData.subTitle || null,
    category: dvrData.category || null,
    features: dvrData.features || null,
    imgAlt: dvrData.imgAlt || '',
    imgCard: typeof dvrData.imgCard === 'string' 
      ? dvrData.imgCard 
      : { url: dvrData.imgCard?.url || '' },
    thumbnails: (dvrData.thumbnails || []).map(thumb => ({
      thumbnail: typeof thumb?.thumbnail === 'string' 
        ? thumb.thumbnail 
        : { url: thumb?.thumbnail?.url || '' }
    })),
    specifications: dvrData.specifications?.map(spec => ({
      category: spec.category,
      items: spec.content?.split('\n').reduce((acc, line) => {
        if (!line.trim()) return acc;
        const [key, values] = line.split('-').map(part => part.trim());
        if (!key || !values) return acc;
        
        // Find existing key or create new one
        const existingItem = acc.find(item => item.key === key);
        if (existingItem) {
          // Always preserve original line breaks
          existingItem.value = `${existingItem.value}\n${values}`;
        } else {
          // Add new key with original values
          acc.push({
            key: key,
            value: values
          });
        }
        return acc;
      }, [] as Array<{key: string, value: string}>) || []
    })) || null,
    rating: dvrData.rating || 0,
    reviewCount: dvrData.reviewCount || 0
  }

  return <ProductDetails product={product} />
}