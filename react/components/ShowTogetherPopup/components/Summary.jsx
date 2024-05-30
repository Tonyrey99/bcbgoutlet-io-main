import React, { useState, useEffect } from 'react';
import styles from '../styles.css';

import ImageZoom from "react-image-zooom";
import { FormattedPrice } from 'vtex.formatted-price';
import BuyButton from './BuyButton';
import { getSkubyId } from '../utils/functions';

import { 
  Modal
} from 'vtex.styleguide'

const Summary = ({ item, productId }) => {
  const [skuList, setSkuList] = useState([]);
  const [selectedSku, setSelectedSku] = useState(null);
  const [selectedSkuId, setSelectedSkuId] = useState(null);
  const [isModalAlert, setModalAlert] = useState(false);

  useEffect(() => {
    const fetchSkus = async () => {
      try {
        const fetchedSkus = await getSkubyId(productId);
        //console.log("SKUS -> ", fetchedSkus)
        setSkuList(fetchedSkus);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };

    fetchSkus();
  }, [productId]);

  const handleSkuClick = (sku) => {
    setSelectedSkuId(sku.itemId);
    setSelectedSku(sku);
  };

  if (!item) return null;

  return (
    <>
      <div className={`${styles.showTogetherPopup__ListItem} flex items-center`}>
        <div className={styles.showTogetherPopup__listCards__imageWrapper}>
          <ImageZoom 
            src={item?.items[0]?.images[0]?.imageUrl || ""} 
            className={styles.showTogetherPopup__listItem__image} 
            alt={item?.productName} 
            title={item?.productName} 
            zoom="300"
          />
        </div>
        <div className={styles.showTogetherPopup__listItem__name}>
          <h3 className={styles.showTogetherPopup__listItem__title}>
            {item?.productName || ""}
          </h3>
        </div>
        <div className={styles.showTogetherPopup__listItem__skuSelector}>
          <ul className={styles.showTogetherPopup__listItem__skuSelectorUl}>
            {skuList.map(sku => (
              sku.sellers[0].commertialOffer.AvailableQuantity < 1 ? (
                <li 
                  key={sku.itemId}
                  id={sku.itemId}
                  className={styles.disabled}
                >
                  {sku.Talla[0]}
                </li>
              ) : (
                <li 
                  key={sku.itemId}
                  id={sku.itemId}
                  onClick={() => handleSkuClick(sku)}
                  className={sku.itemId === selectedSkuId ? styles.selected : ''}
                >
                  {sku.Talla[0]}
                </li>
              )
            ))}
          </ul>   
        </div>
        <div className={styles.showTogetherPopup__listItem__priceWrapper}>
          <FormattedPrice value={item?.items[0]?.sellers[0]?.commertialOffer?.Price || ""} />
          {
            selectedSku == null ? (
              <button 
                className={` ${styles.showTogetherPopup__buyButton} ${styles.showTogetherPopup__buyButtonDisabled}`}
                onClick={()=>{
                  setModalAlert(true)
                  setTimeout(()=>{
                    setModalAlert(false)
                  },2000)
                }}
              >
                Añadir
              </button> 
            ) : (
              <BuyButton 
                data={[selectedSku]} 
                disabled={!selectedSku}
              >
                Añadir
              </BuyButton>
            )
          }
        </div>
      </div>
      <Modal
        isOpen={isModalAlert}
        onClose={()=>{setModalAlert(false)}}
        responsiveFullScreen
        centered
        title={
          <div className={styles.modal__titleWrapper}>
            <p className={`${styles.modal__subtitle} c-on-base mb0`}>
              <b style={{color: "red"}}>Elige una talla antes de añadir al carrito.</b>
            </p>
          </div>
        }
      />
    </>
  );
};

export default Summary;