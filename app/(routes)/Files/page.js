import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import TableWrapper from '../../../Components/table/TableWrapper'

const page = async () => {
  const { userId } = auth();
  

  const docsResult = await getDocs(collection(db, 'users', userId, 'files'))

  const skeletonFiles = docsResult.docs.map((doc) => ({
    id: doc?.id,
    filename: doc.data().filename || doc.id,
    timestamp: doc.data().timestamp?.toMillis() / 1000 || undefined,
    fullname: doc.data().fullname,
    downloadUrl: doc.data().downloadUrl,
    type: doc.data().type,
    size: doc.data().size,
  }));

  // console.log(skeletonFiles)

  return (
    <div className='min-h-[100svh] overflow-x-hidden md:ml-[18rem] px-6 md:px-6 py-16 xl:px-36 w-screen'>
      <TableWrapper skeletonFile={skeletonFiles} />
    </div>
  )
}

export default page
