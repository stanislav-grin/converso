import { User } from '@clerk/nextjs/server'
import Image from 'next/image'

import { getSubjectColor } from '@/lib/utils'

import { CompanionComponent } from '@/modules/companions/ui/components/companion'

interface Props {
  companion: Companion
  user: User
}

export const CompanionIdView = ({ companion, user }: Props) => {
  const { name, subject, topic, duration } = companion

  return (
    <main>
      <article className="flex rounded-border justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div
            className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
            style={{ backgroundColor: getSubjectColor(subject) }}>
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={35}
              height={35}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">
                {name}
              </p>
              <div className="subject-badge max-sm:hidden">
                {subject}
              </div>
            </div>

            <p className="text-lg">{topic}</p>
          </div>
        </div>

        <div className="items-start text-2xl text-nowrap max-md:hidden">
          { duration } minutes
        </div>
      </article>

      <CompanionComponent
        { ...companion }
        userName={ user.firstName! }
        userImage={ user.imageUrl! }
      />
    </main>
  )
}