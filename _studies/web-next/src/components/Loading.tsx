import Head from "next/head";
import { CircleNotch } from "phosphor-react";
import cx from 'classnames'
import { Layout } from "./Layout";

interface Props {
  full?: boolean
}


export function Loading({ full = false }: Props) {

  if (full) {
    return (
      <>
        <Head>
          <title>Carregando...</title>
        </Head>
        <div className={cx('flex items-center justify-center', {
          'h-screen': full,
          'h-full': !full
        })}>
          <CircleNotch size={70} className='animate-spin' />
        </div>
      </>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Carregando...</title>
      </Head>
      <div className={cx('flex items-center justify-center', {
        'h-screen': full,
        'h-full': !full
      })}>
        <CircleNotch size={80} className='animate-spin' weight="light" />
      </div>
    </Layout>
  )
}