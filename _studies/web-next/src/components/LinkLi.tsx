import Link, { LinkProps } from "next/link";
import { Eye, EyeSlash } from "phosphor-react";

interface LinkLiProps extends LinkProps {
  text: string
}

export function LinkLi({ text, href }: LinkLiProps) {

  return (
    <li>
      <Link
        href={href}
        className='pl-4 border-l border-transparent hover:border-slate-500 -ml-px flex gap-1'>
        {text}
      </Link>
    </li>
  )
}