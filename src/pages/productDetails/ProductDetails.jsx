import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import styles from "./ProductDetails.module.scss";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getProduct = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/product/${id}`);
        console.log(`Response for product ${id} from ProductDtails:####`, response);
        console.log(`Response for product ${id} from ProductDtails:####`, response.data);
        console.log(`Response for product ${id} from ProductDtails:####`, response.data.data);

      setProduct(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (loading) {
    return <p className={styles.status}>Loading...</p>;
  }

  if (error) {
    return <p className={styles.status}>{error}</p>;
  }

  if (!product) {
    return <p className={styles.status}>Product not found</p>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageSection}>
        <img
          src={product.product_image}
          alt={product.product_name}
          className={styles.image}
        />
      </div>

      <div className={styles.infoSection}>
        <span className={styles.unit}>{product.product_unit}</span>

        <h1 className={styles.name}>{product.product_name}</h1>

        <p className={styles.description}>{product.description}</p>

        <p className={styles.price}>${product.price}</p>

        <button className={styles.button}>Add to Cart</button>
      </div>
    </div>
  );
}