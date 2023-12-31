import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { useSwiper } from 'swiper/react'

export function SliderNavigation() {
  const swiper = useSwiper()

  return (
    <>
      <button
        className="absolute top-1/2 -translate-y-1/2 left-0 w-12 h-12 flex items-center justify-center bg-gradient-to-r rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40 to-transparent z-10"
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
      </button>

      <button
        className="absolute top-1/2 -translate-y-1/2 right-0 w-12 h-12 flex items-center justify-center bg-gradient-to-l rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40 to-transparent z-10"
        onClick={() => swiper.slideNext()}
      >
        <ChevronRightIcon className="w-6 h-6 text-gray-800" />
      </button>
    </>
  )
}
