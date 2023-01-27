import Link from "next/link"
import { useRouter } from "next/router"
import { CaretCircleRight } from "phosphor-react"
import { useEffect, useState } from "react"

import cx from 'classnames'


interface LiProps {
  page: string
  href?: string
  isChild?: boolean
}
export function Li({ page, href, isChild = false }: LiProps) {

  const router = useRouter()
  const [pageActual, setPageActual] = useState(false)


  useEffect(() => {

    if (href) {
      setPageActual(router.asPath === href)
      return
    }
    setPageActual(router.asPath === `/${page.toLocaleLowerCase()}`)
  }, [router.asPath])

  return (
    <li className={cx('cursor-pointer my-3 transition-all duration-200', {
      'font-semibold hover:ml-1': !isChild,
      '-ml-[18px] hover:-ml-3': !isChild && pageActual,
      'ml-4 hover:ml-5': isChild && !pageActual,
      '-ml-[1px] hover:ml-[1px]': isChild && pageActual

    })}
    >
      <Link
        href={href || `/${page.toLowerCase()}`}
        className='flex gap-1 items-center'
      >
        {pageActual &&
          <CaretCircleRight size={14} weight='bold' color="#60a5fa" />
        }
        {page}
      </Link>
    </li>
  )
}
