import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import { supabase } from '../lib/supabase';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError(error.message);
        setProduct(null);
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center text-xl text-gray-600">Loading product details...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-600">Error: {error}</div>;
  }

  return (
    <div className="py-8">
      <ProductDetail product={product} />
    </div>
  );
}

export default ProductDetailPage;