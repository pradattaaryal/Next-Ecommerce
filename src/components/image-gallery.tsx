"use client"

 
import Image from "next/image"
import x from '@/images/x.jpg'
 

interface ImageGalleryProps {
  images: string 
}

export default function ImageGallery({ images }: ImageGalleryProps) {
 
  return (
    <div className="space-y-4">
      <div className="relative border-2 border-black  shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]   p-0  aspect-square overflow-hidden rounded-lg">
        <Image
          src={images}
          alt="Product image"
          fill
          className="object-cover  rounded-xl"
          priority
        />
      </div>
      
    </div>
  )
}

