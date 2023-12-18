import { FC } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../constants'

interface PaginationProps {
  itemsCount?: number
}

const Pagination: FC<PaginationProps> = ({ itemsCount = 0 }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'))

  const pageCount = Math.ceil(itemsCount / PAGE_SIZE)

  const nextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1

    searchParams.set('page', next.toString())
    setSearchParams(searchParams)
  }

  const prevPage = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1

    searchParams.set('page', prev.toString())
    setSearchParams(searchParams)
  }

  if (pageCount <= 1) {
    return null
  }

  return (
    <div className='w-full flex items-center justify-between mb-10'>
      <div className='flex gap-2'>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`${
            currentPage !== 1
              ? 'bg-teal-600 text-teal-50'
              : 'bg-gray-500 text-teal-50 cursor-not-allowed'
          }  pagination-button`}
        >
          <HiChevronLeft />
          <span>Previous</span>
        </button>
      </div>
      <p className='text-center text-base ml-3 md:inline-block hidden'>
        Showing{' '}
        <span className='font-semibold'>
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{' '}
        to{' '}
        <span className='font-semibold'>
          {currentPage === pageCount ? itemsCount : currentPage * PAGE_SIZE}
        </span>{' '}
        out of {itemsCount}
      </p>
      <div className='flex gap-2'>
        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className={`${
            currentPage !== pageCount
              ? 'bg-teal-600 text-teal-50'
              : 'bg-gray-500 text-teal-50 cursor-not-allowed'
          }  pagination-button`}
        >
          <span>Next</span>
          <HiChevronRight />
        </button>
      </div>
    </div>
  )
}

export default Pagination
