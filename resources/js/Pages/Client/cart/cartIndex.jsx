import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'
import { useSelector } from 'react-redux'

export default function CartIndex() {
  const {colors} = useSelector((state) => state.theme )

  return (
    <div>cartIndex</div>
  )
}
CartIndex.layout = (page) => <AuthenticatedLayout >{page}</AuthenticatedLayout>


