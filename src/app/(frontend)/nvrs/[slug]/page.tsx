import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import ProductDetails, { type ProductData } from '@/components/ProductDetails'

export async function generateStaticParams() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  const nvrs = await payload.find({
    collection: 'nvrs',
    limit: 100,
  })

  return nvrs.docs.map((nvr) => ({
    slug: nvr.slug,
  }))
}

interface PageParams {
  params: {
    slug: string
  }
}
export default async function NVRPage({ params }: PageParams) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'nvrs',
    where: {
      slug: {
        equals: params.slug
      }
    },
    limit: 1
  })

  if (!docs.length) return notFound()

  const nvrData = docs[0]
  
  const product: ProductData = {
    id: nvrData.id,
    title: nvrData.title,
    slug: nvrData.slug,
    subTitle: nvrData.subTitle || null,
    category: nvrData.category || null,
    features: nvrData.features || null,
    imgAlt: nvrData.imgAlt || '',
    imgCard: typeof nvrData.imgCard === 'string' 
      ? nvrData.imgCard 
      : { url: nvrData.imgCard?.url || '' },
    thumbnails: (nvrData.thumbnails || []).map(thumb => ({
      thumbnail: typeof thumb?.thumbnail === 'string' 
        ? thumb.thumbnail 
        : { url: thumb?.thumbnail?.url || '' }
    })),
    specifications: nvrData.specifications?.map(spec => ({
      category: spec.category,
      items: spec.content?.split('\n').reduce((acc, line) => {
        if (!line.trim()) return acc;
        const [key, values] = line.split('-').map(part => part.trim());
        if (!key || !values) return acc;
        
        const existingItem = acc.find(item => item.key === key);
        if (existingItem) {
          existingItem.value = `${existingItem.value}\n${values}`;
        } else {
          acc.push({
            key: key,
            value: values
          });
        }
        return acc;
      }, [] as Array<{key: string, value: string}>) || []
    })) || null,
    rating: nvrData.rating || 0,
    reviewCount: nvrData.reviewCount || 0
  }

  return <ProductDetails product={product} />
} 