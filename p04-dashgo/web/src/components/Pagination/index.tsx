import {
  Box,
  Stack,
  Text
} from '@chakra-ui/react'
import { PaginationItem } from './PaginationItem'

interface PaginationProps {
  totalCountOfRegisters: number
  registersPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [... new Array(to - from)]
    .map((_, idx) => from + idx + 1)
    .filter(page => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange
}: PaginationProps) {
  const lastPage = Math.ceil( totalCountOfRegisters / registersPerPage )

  const previousPages = currentPage > 1
    ? generatePagesArray(
      currentPage - 1 - siblingsCount, currentPage - 1
    )
    : []

  const nextPages = currentPage < lastPage
    ? generatePagesArray(
      currentPage, Math.min(currentPage + siblingsCount, lastPage)
    )
    : []

  const initialRegisterNumber = (currentPage - 1) * registersPerPage
  const finalRegisterNumber = currentPage === lastPage
    ? totalCountOfRegisters
    : currentPage * registersPerPage

  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>
          {initialRegisterNumber}
        </strong> - <strong>
          {finalRegisterNumber}
        </strong> de <strong>
          {totalCountOfRegisters}
        </strong>
      </Box>
      <Stack
        direction="row"
        spacing="2"
      >
        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem
              number={1} onPageChange={onPageChange}
            />
            {currentPage > (2 + siblingsCount) && (
              <Text color="gray.300" width="8" textAlign="center">...</Text>
            )}
          </>
        )}

        {previousPages.length > 0 && previousPages.map(page => (
          <PaginationItem
            key={page} number={page} onPageChange={onPageChange}
          />
        ))}

        <PaginationItem
          number={currentPage} onPageChange={onPageChange} isCurrent
        />

        {nextPages.length > 0 && nextPages.map(page => (
          <PaginationItem
            key={page} number={page} onPageChange={onPageChange}
          />
        ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color="gray.300" width="8" textAlign="center">...</Text>
            )}
            <PaginationItem
              number={lastPage} onPageChange={onPageChange}
            />
          </>
        )}
      </Stack>
    </Stack>
  )
}