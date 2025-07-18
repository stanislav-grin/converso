import { auth } from '@clerk/nextjs/server'

import { newCompanionPermissions } from '@/modules/companions/server/actions'
import { CompanionsFormView } from '@/modules/companions/ui/views/companions-form-view'
import { CompanionsLimitReachedView } from '@/modules/companions/ui/views/companions-limit-reached-view'

const NewCompanion = async () => {
  const { userId, redirectToSignIn } = await auth()

  if (!userId) {
    redirectToSignIn()
  }

  const canCreateCompanion = await newCompanionPermissions()

  return (
    <main className="md:w-2/3 items-center justify-center">
      {canCreateCompanion
        ? <CompanionsFormView />
        : <CompanionsLimitReachedView />
      }
    </main>
  )
}

export default NewCompanion
