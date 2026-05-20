import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageSlideshowProps {
    images: string[];
    alt: string;
    className?: string;
}

export default function ProductImageSlideshow({ images, alt, className = "" }: ProductImageSlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) return null;
    if (images.length === 1) {
        return <img src={images[0]} alt={alt} className={className} />;
    }

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className={`relative group/slideshow ${className}`}>
            <img
                src={images[currentIndex]}
                alt={`${alt} - ${currentIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
            />

            {/* Controls */}
            <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover/slideshow:opacity-100 transition-opacity">
                <button
                    onClick={prevImage}
                    className="p-1 rounded-full bg-white/80 hover:bg-white shadow-sm transition-colors"
                >
                    <ChevronLeft className="w-4 h-4 text-black" />
                </button>
                <button
                    onClick={nextImage}
                    className="p-1 rounded-full bg-white/80 hover:bg-white shadow-sm transition-colors"
                >
                    <ChevronRight className="w-4 h-4 text-black" />
                </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 p-1.5 rounded-full bg-black/20 backdrop-blur-sm">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCurrentIndex(i);
                        }}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
