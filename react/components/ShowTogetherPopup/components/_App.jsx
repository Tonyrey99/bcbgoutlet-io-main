import React, { useContext, useState, useEffect } from 'react'
import { Button } from 'vtex.styleguide'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { useProduct } from 'vtex.product-context'
import styles from '../styles.css'

//local apps
import ModalForm from './Modal'

//Local Contexts
import { Context } from '../contexts/Context'

//utils
import { addItemToCart } from '../utils/functions'

const App = (props) => {

  //console.log("APP items prop --> ", props)

  //Local Hooks
  const productContextValue = useProduct()
  const { orderForm, setOrderForm } = useOrderForm()
  const { addItems } = useOrderItems()
  
  //Context State Hooks
  const {
    setModalOpen
  } = useContext(Context)

  return (
    <>
      <div className={`${styles.buyButton__wrapper}`}>
        <Button 
          variation="primary" 
          onClick={ async ()=>{
            await addItemToCart(productContextValue, addItems, orderForm, setOrderForm)
            setModalOpen(true)
          }}>
          <>
            { props.buyButtonLabel }
          </>
        </Button>
      </div>

      <ModalForm items={ props.items } />
    </>
  )
}

export default App