import Footer from "../../../core/components/Footer";
import Header from "../../../core/components/Header";
import ProductList from "../components/ProductList";

function ProductsPage() {
  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <Header />
      {/* <main className="flex-grow container mx-auto"> */}

      <main className="flex-grow flex items-center justify-center">
        <ProductList />
      </main>
      <Footer />
    </div>
  );
}

export default ProductsPage;
