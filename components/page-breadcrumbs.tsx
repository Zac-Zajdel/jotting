import { Icons } from "./icons"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "./ui/breadcrumbs"

interface Crumb {
  link: string
  title: string
  icon?: string
  isDynamic?: boolean
  isCurrentPage?: boolean
}

interface PageBreadcrumbsProps {
  crumbs: Crumb[]
  children?: React.ReactNode
}

export function PageBreadcrumbs({ crumbs, children }: PageBreadcrumbsProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="mx-4 flex h-14 items-center justify-between">
        {crumbs.length ? (
          <Breadcrumb>
            {crumbs.map((crumb, index) => {
              const Icon = Icons[crumb.icon || "arrowRight"]

              return (
                <BreadcrumbItem
                  key={index}
                  className={crumb?.isDynamic ? 'truncate' : ''}
                  isCurrentPage={crumb.isCurrentPage}
                >
                  <BreadcrumbLink
                    className={crumb.icon ? '' : 'mt-[1px]'}
                    href={crumb.link}
                  >
                    {crumb.icon ? (
                      <Icon className="mr-1 h-4 w-4" />
                    ) : (
                      <span>{crumb.title}</span>
                    )}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )
            })}
          </Breadcrumb>
        ) : null}
        <div>{children}</div>
      </div>
    </header>
  )
}
