import { Transition } from '@headlessui/react'
import { Spinner } from './Spinner'

interface LaunchScreenProps {
  isLoading: boolean
}

export function LaunchScreen({ isLoading }: LaunchScreenProps) {
  return (
    <Transition
      show={isLoading}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="bg-[#FC9705] fixed top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <p className='text-5xl text-gray-900 font-medium'>OrçaFácil</p>
          <Spinner className="text-[#FC9705] fill-white" />
        </div>
      </div>
    </Transition>
  )
}
