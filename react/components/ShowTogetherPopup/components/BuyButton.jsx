import React, { useState } from "react"
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { Spinner } from 'vtex.styleguide'

import styles from '../styles.css'

const BuyButton = (props) => {

  //console.log("TO CART 1 --> ", props.data)

  const [ isBuyLoading, setBuyLoading ] = useState(false)
  const [ label, setLabel ] = useState(props.children)
  const { addItems } = useOrderItems()

  //local functions
   const toCart = async (data, addToCart) => {

    //console.log("TO CART --> ", data)

    const items = data.map( dataItem => (
      {
        availability: dataItem.sellers[0].commertialOffer.AvailableQuantity > 0 ? true : false,
        id: dataItem.itemId,
        imageUrls: {
          at1x: dataItem.images[0].imageUrl,
          __typename: 'ImageUrls',
        },
        listPrice: dataItem.sellers[0].commertialOffer.ListPrice,
        measurementUnit: dataItem.measurementUnit,
        name: dataItem.name,
        price: dataItem.sellers[0].commertialOffer.Price,
        productId: dataItem.productId,
        quantity: 1,
        seller: dataItem.sellers[0].sellerId,
        sellingPrice: dataItem.sellers[0].commertialOffer.Price,
        skuName: dataItem.name,
        unitMultiplier: dataItem.unitMultiplier,
        uniqueId: dataItem.itemId,
        isGift: false,
        __typename: 'Item'
      }
    ))

    await addToCart(items)
  }

  const addToCartInit = async () => {
    setBuyLoading(true)
    await toCart(props.data, addItems)
    setBuyLoading(false)
    setLabel("¡AÑADIDO!")
  }

  return (
    <>
      <div className={styles.showTogetherPopup__buyButton} onClick={addToCartInit}>
        {
          !isBuyLoading ? (
            <>
              {label}
            </>
          ) : (
            <Spinner color="currentColor" size={15} />
          )
        }
      </div>
    </>
  )

}

export default BuyButton;
