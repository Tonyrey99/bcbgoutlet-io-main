import React, { useState, useEffect } from 'react';
import { useProduct } from 'vtex.product-context';
import { canUseDOM } from 'vtex.render-runtime';
import { Spinner } from 'vtex.styleguide';

import styles from './styles.css';
import ContextProvider from './contexts/Context';
import App from './components/_App';

const Index = ({ buyButtonLabel, children }) => {
  const [hasShowTogether, setShowTogether] = useState(false);
  const [items, setItems] = useState();
  const { product } = useProduct();

  useEffect(() => {
    async function fetchShowTogetherData() {
      try {
        const response = await fetch(`/api/catalog_system/pub/products/crossselling/showtogether/${product.productId}`);
        const data = await response.json();
        if (data && data.length > 0) {
          setItems(data);
          //console.log("RESULT FETCH SHOW TOGETHER --> ", data)
          setShowTogether(true);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchShowTogetherData();
  }, [product]);

  if (!canUseDOM) {
    return (
      <div className={styles.buyButton__wrapper}>
        <Spinner color="currentColor" />
      </div>
    );
  }

  return hasShowTogether ? (
    <ContextProvider>
      <App 
        buyButtonLabel={buyButtonLabel} 
        items={items} 
      />
    </ContextProvider>
  ) : children;
};

Index.defaultProps = {
  buyButtonLabel: "Comprar",
};

Index.getSchema = () => ({
  title: "Pre Order Form",
  type: "object",
  properties: {
    tagForTitle: {
      title: "Buy button title",
      type: "string",
      default: Index.defaultProps.buyButtonLabel,
    },
    formTitle: {
      title: "Form Title",
      type: "string",
      default: Index.defaultProps.formTitle,
    },
    formSubTitle: {
      title: "Form Subtitle",
      type: "string",
      default: Index.defaultProps.formSubTitle,
    },
  },
});

export default Index;