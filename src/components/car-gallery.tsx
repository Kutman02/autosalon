'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CarGalleryProps {
  images: string[];
}

export default function CarGallery({ images }: CarGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <Image
          src={images[selectedImage]}
          alt="Фото автомобиля"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={selectedImage === 0}
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={image}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative aspect-video overflow-hidden rounded-lg",
                selectedImage === index && "ring-2 ring-primary"
              )}
            >
              <Image
                src={image}
                alt={`Фото ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 20vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 