import { Outlet } from 'react-router-dom'
import illustration from '../../assets/illustration.png'


export function AuthLayout() {
  return (
    <div className="flex w-full h-full">
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center flex-col gap-16">
        <div className='text-4xl font-semibold text-gray-900'>OrçaFácil</div>

        <div className="w-full max-w-[504px] px-8">
          <Outlet />
        </div>
      </div>

      <div className="w-1/2 h-full justify-center items-center relative hidden lg:flex">
        <img
          src={illustration}
          className="w-96 pb-44"
        />

        <div className="max-w-[656px] bottom-8 mx-8 bg-[#FCFF54] p-10 absolute rounded-b-[32px]">
          <h1 className='text-2xl font-medium text-gray-900'>OrçaFácil</h1>

          <p className="text-gray-700 font-medium text-xl mt-6">
            Gerencie suas finanças pessoais de uma forma simples com o OrçaFácil,
            e o melhor, totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  )
}
