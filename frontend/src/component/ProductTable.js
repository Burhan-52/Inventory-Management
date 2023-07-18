import { useContext, useState } from "react";
import spinner from "../assessts/spinner.gif"
import { Context } from "../App";

const ProductTable = ({ productList, deleteproduct }) => {

    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 5;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const displayedProducts = productList.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="mb-10">
            {displayedProducts.length > 0 ? (
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Product Name</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedProducts.map((product, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{product.name}</td>
                                <td className="border px-4 py-2">{product.quantity}</td>
                                <td className="border px-4 py-2">{product.price}</td>
                                <td className="border px-4 py-2">
                                <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => deleteproduct(product._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>) :
                <p className="text-center text-gray-600 font-bold mt-4">
                    No products to display.
                </p>
            }

            {productList.length > productsPerPage && <div className="flex justify-center">
                {currentPage > 1 && (
                    <button className=" hover:underline " onClick={() => handlePageChange(currentPage - 1)}>
                        Previous</button>
                )}
                <div>
                    {Array.from({ length: Math.ceil(productList.length / productsPerPage) }).map((_, i) => (
                        <button
                            key={i}
                            className={` hover:bg-blue-600 hover:text-neutral-50 text-black font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mx-1 my-4 ${currentPage === i + 1 ? 'bg-blue-500 text-neutral-50' : ''
                                }`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
                {currentPage < Math.ceil(productList.length / productsPerPage) && (
                    <button className=" hover:underline" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                )}
            </div>}
        </div>
    );
};

export default ProductTable;

