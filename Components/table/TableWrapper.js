import { ArrowDownCircleIcon, ShareIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { FileIcon, defaultStyles } from 'react-file-icon';

const TableWrapper = ({ skeletonFile }) => {
  return (
    <div className='grid grid-cols-1'>
      <span className='gap-4 overflow-auto border shadow-sm px-6 lg:py-6 lg:px-8 xl:px-16'>
        {skeletonFile.map((e, index) => (
          <div key={index} className='w-full h-16 table text-xs md:text-sm lg:text-md truncate'>
            <span className='h-8 w-8'>
              <FileIcon extension="jpg" {...defaultStyles.docx} />
            </span>
            <p className='flex flex-col truncate'>{e.filename}</p>
            <p className='hidden lg:flex flex-col items-start justify-start '>{e.type}</p>
            <p className='flex flex-col items-start justify-start w-12 lg:w-20'>
              {`${e.size < 1024 * 1024
                ? (e.size / 1024).toFixed(2) + " KB"
                : (e.size / (1024 * 1024)).toFixed(2) + " MB"
                }`}
            </p>
            <a href={e.downloadUrl} className='flex flex-col h-8 w-8 ' target='_blank'>
              <ArrowDownCircleIcon className='h-full w-full' />
            </a>
            <Link className='h-6 w-6' href={`/FilePreview/${e.id}`} > 
                <ShareIcon className='w-full h-full' />
             </Link>
          </div>
        ))}
      </span>
    </div>
  )
}

export default TableWrapper
