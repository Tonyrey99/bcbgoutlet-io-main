import React, { useState, useEffect } from "react"
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import styles from './fixedMinicart.css'
import { Spinner } from 'vtex.styleguide'

const FixedMinicart = () => {

  const { orderForm, loading } = useOrderForm()

  const [items, setItems] = useState(orderForm.items)
  const [amount, setAmount] = useState(0)

  useEffect(()=>{

    //console.log("orderform -> ", orderForm)

    setItems(orderForm.items)
    setAmount(getTotalAmount(orderForm.value))

  },[orderForm])

  const getTotalAmount = (amount) => {
    return (amount/100).toLocaleString('en-US',{style: 'currency', currency: 'USD'})
  }

  return (
    <>
      {loading ? (
        <div className={`${styles.fixedMinicart__wrapper} w-100 flex items-center justify-center fixed bottom-0 z-999 bg-action-primary`}>
          <Spinner color="currentColor" size={25} />
        </div>
      ) : (
        <div className={`${styles.fixedMinicart__wrapper} w-100 flex items-center justify-center fixed bottom-0 z-999 bg-action-primary`}>
          <div className={`${styles.fixedMinicart__content} flex items-center justify-between justify-center`}>
            {items.length == 0 ? (
              <p className={`${styles.emptyStateMessage} white`}>Your cart is empty!</p>
            ) : (
              <>
                <div className={`${styles.colCartResume} ${styles.colFixedMinicart} white flex items-center justify-center`}>
                  <span className={styles.colCartResume__icon}>
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M25.7746 32.0006C27.6553 32.0006 29.18 30.5082 29.18 28.6673C29.18 26.8264 27.6553 25.334 25.7746 25.334C23.8938 25.334 22.3691 26.8264 22.3691 28.6673C22.3691 30.5082 23.8938 32.0006 25.7746 32.0006Z" fill="#1B3B6F" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M10.4503 32.0006C12.3311 32.0006 13.8558 30.5082 13.8558 28.6673C13.8558 26.8264 12.3311 25.334 10.4503 25.334C8.56958 25.334 7.04492 26.8264 7.04492 28.6673C7.04492 30.5082 8.56958 32.0006 10.4503 32.0006Z" fill="#1B3B6F" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M1.93652 2H3.96545C4.76834 2 5.46214 2.549 5.63037 3.31744L10.1617 24.0157C10.3299 24.7841 11.0237 25.3331 11.8266 25.3331H25.7745" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M7.04492 7H30.3223C31.4553 7 32.2723 8.06298 31.9583 9.12858L29.0113 19.1285C28.801 19.842 28.1339 20.3332 27.3753 20.3332H9.99192" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span className={styles.fixedMinicart__badge}>
                      {items.length}
                    </span>
                  </span>
                  <span className={styles.colFixedMinicart__title}>
                    Cart Resume
                  </span>
                </div>
                <div className={`${styles.items} ${styles.colFixedMinicart} white flex items-center justify-center`}>
                  <span className={styles.colFixedMinicart__title}>
                    Items:
                  </span>
                  <span className={styles.colFixedMinicart__value}>
                    {items.length}
                  </span>
                </div>
                <div className={`${styles.total} ${styles.colFixedMinicart} white flex items-center justify-center`}>
                  <span className={styles.colFixedMinicart__title}>
                    Total:
                  </span>
                  <span className={styles.colFixedMinicart__value}>
                    J{amount}
                  </span>
                </div>
                <a href="/checkout/#/cart" className={`${styles.actionCheckoutButton} flex items-center justify-center link c-action-primary hover-c-on-action-primary bg-white`}>
                  Go To Checkout
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )

}

export default FixedMinicart;
