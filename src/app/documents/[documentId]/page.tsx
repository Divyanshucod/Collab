import React from 'react'
interface DocumentIdPageProps {
    params : Promise<{documentId : string}>
}
export default async function page({params}:DocumentIdPageProps) {
    const {documentId} = await params;
  return (
    <div>page: {documentId}</div>
  )
}
