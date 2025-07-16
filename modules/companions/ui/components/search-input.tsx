'use client'

import Image from 'next/image'

import { useCompanionsFilter } from '@/modules/companions/ui/hooks/use-companions-filter'

export const SearchInput = () => {
  const [filters, setFilters] = useCompanionsFilter()

  return (
    <div className="relative border border-black rounded-lg flex gap-2 px-2 py-1 h-fit">
      <Image src="/icons/search.svg" alt="search" width={15} height={15} />
      <input
        type="text"
        placeholder="Search companions..."
        className="outline-none"
        value={filters.topic}
        onChange={e => setFilters({ topic: e.target.value })}
      />
    </div>
  )
}
