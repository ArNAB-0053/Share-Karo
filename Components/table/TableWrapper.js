'use client'
import { useUser } from '@clerk/nextjs';
import { ArrowDownCircleIcon, ShareIcon } from '@heroicons/react/24/solid';
import { collection, doc, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { db } from '../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const TableWrapper = ({ skeletonFile }) => {
  const { user } = useUser();
  const [initialFiles, setInitialFiles] = useState(skeletonFile);
  const [sort, setSort] = useState({ field: 'timestamp', order: 'asc' });

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
    <div className="overflow-x-auto">
      <div className="flex space-x-4 mb-4">
        <div>

        </div>
        <div>
          <button onClick={() => handleSort('filename')}>
            Sort by Name {sort.field === 'filename' && (sort.order === 'asc' ? '↑' : '↓')}
          </button>
          <button onClick={() => handleSort('timestamp')}>
            Sort by Time {sort.field === 'timestamp' && (sort.order === 'asc' ? '↑' : '↓')}
          </button>
          <button onClick={() => setSort({ ...sort, order: 'asc' })}>
            Asc {sort.order === 'asc' && '↑'}
          </button>
          <button onClick={() => setSort({ ...sort, order: 'desc' })}>
            Desc {sort.order === 'desc' && '↓'}
          </button>
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
                  <FileIcon extension="jpg" {...defaultStyles.docx} />
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
                  <ShareIcon className='w-8 h-8 text-secondary' />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableWrapper
