import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { CompanionsFormView } from '@/modules/companions/ui/views/companions-form-view'

const NewCompanion = async () => {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <CompanionsFormView />
  )
}

export default NewCompanion
