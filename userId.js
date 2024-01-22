import { auth, currentUser } from "@clerk/nextjs"

const { userId } = auth();

export {userId}