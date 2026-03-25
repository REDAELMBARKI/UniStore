
import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
  const {colors} = useSelector((state) => state.theme )
  return (
    <div>home</div>
  )
}

export default home ;
Home.layout = (page) => <AuthenticatedLayout >{page}</AuthenticatedLayout>
