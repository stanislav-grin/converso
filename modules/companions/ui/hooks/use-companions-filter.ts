import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'

import { DEFAULT_PAGE } from '@/constants'

export const useCompanionsFilter = () => {
  return useQueryStates({
    subject: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
    topic: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
    search: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
    page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({ clearOnDefault: true }),
  }, { shallow: false, throttleMs: 500 })
}
