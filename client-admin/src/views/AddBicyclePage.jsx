import React from 'react'
import BicycleForm from '../components/BicycleForm'
import { ToastContainer } from 'react-toastify'

export default function AddBicyclePage() {
  return (
    <>
      <ToastContainer />
      <div className="w-full">
        <div className="leading-loose">
          <BicycleForm
            isEdit={false}
            // categories={categories}
            // loadingCategories={loadingCategories}
          />
        </div>
      </div>
    </>
  )
}
