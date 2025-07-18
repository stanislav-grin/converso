import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { getBookmarkedCompanions, getUserCompanions, getUserSessions } from '@/modules/companions/server/actions'
import { MyJourneyView } from '@/modules/companions/ui/views/my-journey'

const ProfilePage = async () => {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const [companions, sessionHistory, bookmarkedCompanions] = await Promise.all([
    getUserCompanions(user.id),
    getUserSessions(user.id),
    getBookmarkedCompanions(user.id),
  ])

  return (
    <MyJourneyView
      user={user}
      companions={companions}
      bookmarkedCompanions={bookmarkedCompanions}
      sessionHistory={sessionHistory}
    />
  )
}

export default ProfilePage
