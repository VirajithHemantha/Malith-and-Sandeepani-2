import { motion } from 'motion/react';

interface Photo {
  url: string;
  alt: string;
}

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      {photos.map((photo, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: (index % 3) * 0.2 }}
          className="relative break-inside-avoid overflow-hidden rounded-2xl group shadow-lg"
        >
          <img
            src={photo.url}
            alt={photo.alt}
            loading="lazy"
            className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white font-serif text-lg tracking-wide uppercase">
                {photo.alt}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
