import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { PageHeader } from "@/components/page-header"
import { JotCreateButton } from "@/components/jot-create-button"
import { JotItem } from "@/components/jot-item"
import { PageShell } from "@/components/page-shell"

export const metadata = {
  title: "Tasks",
  description: "Create and manage Tasks.",
}

export default async function TasksPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const jots = await db.jot.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <PageShell>
      <PageHeader
        heading="Tasks"
        text="Create and manage Tasks."
      >
        <JotCreateButton />
      </PageHeader>
      <div>
        {jots?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {jots.map((jot) => (
              <JotItem key={jot.id} jot={jot} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="listCheck" />
            <EmptyPlaceholder.Title>No Tasks created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any Tasks yet. Start creating content.
            </EmptyPlaceholder.Description>
            <JotCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </PageShell>
  )
}