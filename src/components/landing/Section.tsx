import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import type { SectionProps, PhotoItem } from "@/types"

function PhotoSlide({ photos, title, year, isActive }: { photos: PhotoItem[], title: string, year?: string, isActive: boolean }) {
  const [selected, setSelected] = useState<PhotoItem | null>(null)

  return (
    <section className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        {year && <span className="text-[#FF4D00] text-sm font-mono tracking-widest uppercase">{year}</span>}
        <h2 className="text-4xl md:text-6xl font-bold text-white mt-1 leading-tight">{title}</h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-3 gap-3 max-w-5xl"
        initial={{ opacity: 0, y: 40 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setSelected(photo)}
            className="relative group overflow-hidden rounded-lg border border-neutral-800 hover:border-[#FF4D00] transition-all duration-300"
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Icon name="ZoomIn" size={28} className="text-white" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <p className="text-white text-xs">{photo.caption}</p>
            </div>
          </button>
        ))}
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-5xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img src={selected.src} alt={selected.caption} className="w-full rounded-xl" />
              <p className="text-white text-center mt-4 text-lg">{selected.caption}</p>
              <button
                className="absolute -top-4 -right-4 bg-neutral-800 hover:bg-[#FF4D00] rounded-full p-2 transition-colors"
                onClick={() => setSelected(null)}
              >
                <Icon name="X" size={20} className="text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function TextSlide({ id, title, content, year, quote, isActive, showButton, buttonText }: SectionProps) {
  return (
    <section id={id} className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        {year && <span className="text-[#FF4D00] text-sm font-mono tracking-widest uppercase">{year}</span>}
      </motion.div>

      <motion.h2
        className="text-4xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.1] tracking-tight max-w-3xl text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>

      {content && (
        <motion.p
          className="text-lg md:text-xl max-w-2xl mt-6 text-neutral-300 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {content}
        </motion.p>
      )}

      {quote && (
        <motion.blockquote
          className="mt-8 border-l-2 border-[#FF4D00] pl-6 text-neutral-500 italic text-base max-w-xl"
          initial={{ opacity: 0, x: -20 }}
          animate={isActive ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {quote}
        </motion.blockquote>
      )}

      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10"
        >
          <Button
            variant="outline"
            size="lg"
            className="text-[#FF4D00] bg-transparent border-[#FF4D00] hover:bg-[#FF4D00] hover:text-black transition-colors"
          >
            {buttonText}
          </Button>
        </motion.div>
      )}
    </section>
  )
}

export default function Section(props: SectionProps) {
  const { id, title, subtitle, content, isActive, showButton, buttonText, type, photos, year, quote } = props

  if (type === 'photo' && photos) {
    return <PhotoSlide photos={photos} title={title} year={year} isActive={isActive} />
  }

  if (type === 'text') {
    return <TextSlide {...props} />
  }

  return (
    <section id={id} className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24">
      {subtitle && (
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {subtitle}
        </motion.div>
      )}
      <motion.h2
        className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-bold leading-[1.1] tracking-tight max-w-4xl text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      {content && (
        <motion.p
          className="text-lg md:text-xl lg:text-2xl max-w-2xl mt-6 text-neutral-400"
          initial={{ opacity: 0, y: 50 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {content}
        </motion.p>
      )}
      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 md:mt-16"
        >
          <Button
            variant="outline"
            size="lg"
            className="text-[#FF4D00] bg-transparent border-[#FF4D00] hover:bg-[#FF4D00] hover:text-black transition-colors"
          >
            {buttonText}
          </Button>
        </motion.div>
      )}
    </section>
  )
}
