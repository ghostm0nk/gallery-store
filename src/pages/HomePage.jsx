import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) {
        setError(error.message);
        setProducts([]);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center text-xl text-gray-600">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-600">Error: {error}</div>;
  }

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-10 animate-fade-in-up">
        Explore Our Digital Portraits
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && !loading && !error && (
        <p className="text-center text-xl text-gray-600 mt-10">No products available yet.</p>
      )}
    </div>
  );
}

export default HomePage;