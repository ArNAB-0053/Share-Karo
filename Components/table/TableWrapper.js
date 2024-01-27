'use client'
import { useUser } from '@clerk/nextjs';
import { ArrowDownCircleIcon, ChevronDownIcon, ChevronLeftIcon, ShareIcon } from '@heroicons/react/24/solid';
import { collection, doc, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { db } from '../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { COLOR_EXTENSION_MAP } from '../../Constant';

const TableWrapper = ({ skeletonFile }) => {
  const { user } = useUser();
  const [initialFiles, setInitialFiles] = useState(skeletonFile);
  const [sort, setSort] = useState({ field: 'timestamp', order: 'asc' });

  // console.log(initialFiles.length)

  const [docs, loading, error] = useCollection(
    user &&
    query(collection(db, 'users', user.id, 'files'), orderBy(sort.field, sort.order))
  );

  const handleSort = (field) => {
    setSort((prevSort) => ({
      field,
      order: prevSort.field === field && prevSort.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  useEffect(() => {
    if (!docs) return;

    const files = docs.docs.map((doc) => ({
      id: doc?.id,
      filename: doc.data().filename || doc.id,
      timestamp: doc.data().timestamp?.toMillis() / 1000 || undefined,
      fullname: doc.data().fullname,
      downloadUrl: doc.data().downloadUrl,
      type: doc.data().type,
      size: doc.data().size,
    }));

    // Sort the files locally based on the current sort settings
    const sortedFiles = files.sort((a, b) => {
      const valueA = sort.field === 'filename' ? a.filename.toUpperCase() : a.timestamp;
      const valueB = sort.field === 'filename' ? b.filename.toUpperCase() : b.timestamp;

      if (valueA < valueB) {
        return sort.order === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sort.order === 'asc' ? 1 : -1;
      }

      return 0;
    });

    setInitialFiles(sortedFiles);
  }, [docs, sort]);

  return (
    <>
      {initialFiles.length === 0 ? (
        <div className='w-full flex items-center justify-center flex-col mt-10'>
          <h1 className='text-center text-xl font-semibold text-red-600'>No files available!</h1>
          <h3 className='mt-20 text-sm'>Go to the upload section to add files-</h3>
          <Link href='/Upload' className='border-2 border-solid border-primary/10 shadow-md text-primary font-[600] active:bg-primary active:text-white hover:bg-primary hover:text-white shadow-primary/40 w-[13rem] flex items-center justify-center gap-3 py-3 px-4 mt-4 rounded-full '> <ChevronLeftIcon className='w-5 h-5' /> Go to Upload</Link>
        </div>
      ) : (
        <div className="overflow-x-auto overflow-y-hidden">
          <div className='flex items-center justify-between mb-5 '>
            <h1 className=' text-xl font-bold ' >All Files</h1>
            <div className='relative'>
              <label htmlFor="sortOrder" className='font-semibold'>Sort by : </label>
              <select
                id="sortOrder"
                value={`${sort.field}-${sort.order}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  handleSort(field, order);
                }}
                className='py-1 pl-5 pr-8 rounded-lg outline-none bg-zinc-200/50 appearance-none relative'
              >
                <option value="filename-asc">Name (asc)</option>
                <option value="filename-desc">Name (desc)</option>
                <option value="timestamp-asc">Time (asc)</option>
                <option value="timestamp-desc">Time (desc)</option>
              </select>
              <ChevronDownIcon className='h-4 w-4 right-2 top-2 text-black absolute z-40' />
            </div>
          </div>

          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">File</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">Filename</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">Type</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">Size</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 ">Download</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">Share</th>
              </tr>
            </thead>


            <tbody className="divide-y divide-gray-200">
              {initialFiles.map((e, index) => (
                <tr key={index} className=''>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    <div className='h-8 w-8'>
                      <FileIcon extension={e.type.split('/')[1]}
                        color='#dadada4c'
                        fold
                        radius={6}
                        glyphColor='#000'
                        labelColor={COLOR_EXTENSION_MAP[e.type.split('/')[1]]}
                        labelUppercase
                        {...defaultStyles[e.type.split('/')[1]]} />
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{e.filename}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{e.type}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {`${e.size < 1024 * 1024
                      ? (e.size / 1024).toFixed(2) + " KB"
                      : (e.size / (1024 * 1024)).toFixed(2) + " MB"
                      }`}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 flex items-center justify-center">
                    <a href={e.downloadUrl} className='flex flex-col h-8 w-8 items-center justify-center' target='_blank'>
                      <ArrowDownCircleIcon className='h-full w-full text-primary' />
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 ">
                    <Link className='h-6 w-6' href={`/FilePreview/${e.id}`} >
                      <ShareIcon className='w-6 h-6 text-secondary' />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </>
  )
}

export default TableWrapper
