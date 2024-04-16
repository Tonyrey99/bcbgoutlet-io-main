import React, { useState } from "react"
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { Spinner } from 'vtex.styleguide'

import styles from '../styles.css'

const BuyButton = (props) => {

  const [ isBuyLoading, setBuyLoading ] = useState(false)
  const [ label, setLabel ] = useState(props.children)
  const { addItems } = useOrderItems()

  //local functions
  const toCart = async (data, addToCart) => {
    const item = [
      {
        aditionalInfo: {
          brandName: data.brand,
          __typename: 'ItemAdditionalIndo',
        },
        availability: data.items[0].sellers[0].commertialOffer.AvailableQuantity > 0 ? true : false,
        id: data.items[0].itemId,
        imageUrls: {
          at1x: data.items[0].images[0].imageUrl,
          __typename: 'ImageUrls',
        },
        listPrice: data.items[0].sellers[0].commertialOffer.ListPrice,
        measurementUnit: data.items[0].measurementUnit,
        name: data.items[0].name,
        price: data.items[0].sellers[0].commertialOffer.Price,
        productId: data.productId,
        quantity: 1,
        seller: data.items[0].sellers[0].sellerId,
        sellingPrice: data.items[0].sellers[0].commertialOffer.Price,
        skuName: data.items[0].name,
        unitMultiplier: data.items[0].unitMultiplier,
        uniqueId: data.items[0].itemId,
        isGift: false,
        __typename: 'Item'
      }
    ]
    await addToCart(item)
  }

  const addToCartInit = async () => {
    setBuyLoading(true)
    await toCart(props.data, addItems)
    setBuyLoading(false)
    setLabel("agregado!")
  }

  return (
    <>
      <div className={styles.showTogether__buyButton} onClick={addToCartInit}>
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
