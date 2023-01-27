import clsx from "clsx";
import { CircleNotch } from "phosphor-react";
import { Layout } from "./Layout";

interface Props {
  full?: boolean
}


export function Loading({ full = false }: Props) {

  document.title = 'Carregando...'

  // if (full) {

  //   return (
  //     <>
        
  //       <div className={clsx('flex items-center justify-center', {
  //         'h-screen': full,
  //         'h-full': !full
  //       })}>
  //         <CircleNotch size={70} className='animate-spin' />
  //       </div>
  //     </>
  //   )
  // }

  return (

    <Layout>
    
      <div className={clsx('flex items-center justify-center h-full')}>
        <CircleNotch size={70} className='animate-spin' weight="light" />
      </div>
    </Layout>
  )
}