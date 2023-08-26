import ProductForm from "../components/ProductForm";
import { ToastContainer } from "react-toastify";

export default function AddStationPage() {

  return (
    <>
      <ToastContainer />
      <div className="w-full">
        <div className="leading-loose">
          <ProductForm
            isEdit={false}
            // categories={categories}
            // loadingCategories={loadingCategories}
          />
        </div>
      </div>
    </>
  );
}
