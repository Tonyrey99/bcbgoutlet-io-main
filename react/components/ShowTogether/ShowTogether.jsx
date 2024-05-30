import React, { useState, useEffect } from "react"
import { useProduct } from 'vtex.product-context'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { FormattedPrice } from 'vtex.formatted-price'
import { Spinner } from 'vtex.styleguide'
import ShortDescription from './components/ShortDescription'
import BuyButton from './components/BuyButton'
import styles from './styles.css'

const ShowTogether = ( props ) => {

  const productContextValue = useProduct()
  const { loading } = useOrderForm()
  const [ hasShowTogether, setShowTogether ] = useState(false)
  const [ items, setItems ] = useState(0)
  const [description, setDescription] = useState('')

  const removetagHtml = (text) => {
    return text.replace(/<\/?[^>]+(>|$)/g, "")
  }

  useEffect( ()=>{
    async function getData(){
      const data = await fetch(`/api/catalog_system/pub/products/crossselling/showtogether/${productContextValue.product.productId}`)
      const res = await data.json()
      return res
    }
    getData()
    //.then(response => response.json())
    .then(data => {
      if(data.length>0){
        //console.log("product DATA --> ", data)
        setShowTogether(true)
        setItems(data)
      }
    })
    .catch(err => console.error(err))
  },[])



  return (
    <>
      {loading ? (
        <div className={`${styles.showTogether__wrapper}`}>
          <Spinner color="currentColor" size={25} />
        </div>
      ) : (
        <>
          {
            hasShowTogether && props.isActive && (
              <div className={`${styles.showTogether__wrapper}`}>
                <div className={`${styles.showTogether__content} flex flex-column`}>
                  <h2 className={styles.showTogether__title}>
                    {props.title}
                  </h2>
                  <p className={styles.showTogether__subtitle}>
                    {props.subtitle}
                  </p>
                  <div className={`${styles.showTogether__list} flex flex-column items-start justify-center`}>
                    {
                      items.map((productItem) => {
                        return (
                          <>
                            <div className={`${styles.showTogether__ListItem} flex items-center`}>
                              <div className={styles.listItem__imageWrapper}>
                                <img src={productItem.items[0].images[0].imageUrl} className={styles.listItem__image} alt={productItem.productName} title={productItem.productName} />
                              </div>
                              <div className={styles.listItem__name}>
                                <h3 className={styles.listItem__title}>
                                  {productItem.productName}
                                </h3>
                                <p className={`${styles.description_short}`}> {removetagHtml(productItem.description)}</p>
                              </div>
                              <div className={styles.listItem__priceWrapper}>
                                <FormattedPrice value={productItem.items[0].sellers[0].commertialOffer.Price} />
                                <BuyButton data={productItem}>{props.buyButtonLabel}</BuyButton>
                              </div>
                            </div>
                          </>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            )
          }
        </>
      )}
    </>
  )

}

ShowTogether.defaultProps = {
  isActive: true,
  title: 'Combina Con:',
  subtitle: 'Haz click y agrega a tu bolsa',
  buyButtonLabel: 'agregar'
}

ShowTogether.schema = {
  title: 'Show Together',
  description: 'List products from Show Together SKU Field and allow the user to buy.',
  type: 'object',
  properties: {
    isActive: {
      title: 'Active?',
      description: 'Show or Hide the App',
      type: 'boolean',
      enum: [
        true,
        false
      ],
      default: ShowTogether.defaultProps.isActive
    },
    title:{
      title: 'Title',
      description: 'title of show together for users on screen',
      type: 'string',
      default: ShowTogether.defaultProps.title
    },
    subtitle:{
      title: 'Sub Title',
      description: 'Sub title of show together for users on screen',
      type: 'string',
      default: ShowTogether.defaultProps.subtitle
    },
    buyButtonLabel:{
      title: 'Buy button label',
      description: 'Label of buy button items.',
      type: 'string',
      default: ShowTogether.defaultProps.buyButtonLabel
    }
  },
}

export default ShowTogether;
