'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { subjects } from '@/constants'
import { useCompanionsFilter } from '@/modules/companions/ui/hooks/use-companions-filter'

export const SubjectFilter = () => {
  const [filters, setFilters] = useCompanionsFilter()

  return (
    <Select
      onValueChange={value =>  setFilters({ subject: value === 'all' ? '' : value })}
      value={filters.subject || 'all'}
    >
      <SelectTrigger className="input capitalize">
        <SelectValue placeholder="Select subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">
          All subjects
        </SelectItem>

        {subjects.map(subject => (
          <SelectItem key={subject} value={subject} className="capitalize">
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
