import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { PageBreadcrumbs } from "@/components/page-breadcrumbs"
import { SettingsNav } from "@/components/settings/settings-nav"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function WorkspaceSettingsLayout({ children }: RootLayoutProps) {
  return (
    <PageShell className="gap-1">
      <PageBreadcrumbs crumbs={[
          {
            link: '/settings/general',
            title: 'Home',
            icon: 'home',
          },
          {
            link: '/settings/workspace',
            title: 'Workspace',
          },
        ]}
      />

      <PageHeader
        heading="Settings"
        text="Manage account and workspace settings."
      />

      <SettingsNav />

      {children}
    </PageShell>
  )
}
