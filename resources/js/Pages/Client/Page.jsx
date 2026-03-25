import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react'
import { useSelector } from 'react-redux'

function Page({products}) {
   return (
       <AuthenticatedLayout>
           <Pagecontent />
       </AuthenticatedLayout>
   )
}


function Pagecontent(){
 const {colors , mode} = useSelector((state) => state.theme)

  return (
    <div style={{ background : colors.background }}>Page</div>
  )
}
export default Page ;
