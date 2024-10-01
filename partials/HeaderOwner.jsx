import React from 'react'; // Import React if not already imported

function HeaderOwner() {
  return (
    <div className="font-['helvetica_now_display']">
      <nav className="w-full fixed top-0 left-0 px-5 py-3 flex justify-between items-center bg-transparent shadow-md z-10">
        <a className="text-xl" href="/owners/all-products">Scatch</a>
        <div className="flex items-center gap-6">
          <a href="/owners/create-product" className="flex items-center gap-1 text-sm md:text-base">
            <span>Create Product</span>
          </a>
          <a href="/owners/all-orders" className="flex items-center gap-1 text-sm md:text-base">
            <i className="ri-bill-line"></i>
            <span>Orders</span>
          </a>
          <a href="/owners/all-products" className="flex items-center gap-1 text-sm md:text-base">
            <i className="ri-product-hunt-fill"></i>
            <span>All Products</span>
          </a>
        </div>
      </nav>
    </div>
  );
}

export default HeaderOwner;
