import { createLoader, parseAsString, parseAsInteger } from 'nuqs/server'

import { DEFAULT_PAGE } from '@/constants'

export const filtersSearchParams = {
  subject: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  topic  : parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  search : parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  page   : parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({ clearOnDefault: true }),
}

export const loadSearchParams = createLoader(filtersSearchParams)