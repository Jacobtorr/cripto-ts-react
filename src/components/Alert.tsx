import { ReactNode } from "react"

type FormProps = {
    children: ReactNode
}

export default function Alert({children} : FormProps) {
  return (
    <div className="alert">{children}</div>
  )
}
