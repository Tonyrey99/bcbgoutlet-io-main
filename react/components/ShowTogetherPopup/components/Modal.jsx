import React, { useContext, useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { 
  Modal,
  Button,
  Spinner,
  Divider
} from 'vtex.styleguide'
import Summary from './Summary'

//Local Style
import styles from '../styles.css'

//Local Contexts
import { Context } from '../contexts/Context'

//App
const ModalForm = (props) => {

  //VTEX Resources
  const productContextValue = useProduct()
  const { orderForm, setOrderForm } = useOrderForm()
  const { addItems } = useOrderItems()

  //console.log("items MODAL --> ", props)
    
  //Context State Hooks
  const {
    isModalOpen,
    setModalOpen,
  } = useContext(Context)

  //State Hooks
  const [ cartItems, setCartItems ] = useState([])
  const [ isLoading, setLoading ] = useState(false)
  const [ feedback, setFeedback ] = useState("")

  //When orderForm changes
  useEffect( async ()=>{
    setCartItems(orderForm.items) //set orderForm in the state hook
  },[orderForm])
  
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={()=>{setModalOpen(false)}}
        responsiveFullScreen
        centered
        title={
          <div className={styles.modal__titleWrapper}>
            <h3 className={`${styles.modal__title} c-on-base`}>
              ¡MAXAZRIA RECOMIENDA!
            </h3>
            <p className={`${styles.modal__subtitle} c-on-base mb7`}>
              Te recomendamos que combines con:
            </p>
          </div>
        }
        children={
            isLoading ? (
              <>
                <Spinner color="currentColor" />
              </>
            ) : (
              <>
                {
                  <>
                    <div className={`${styles.showTogetherPopup__list} flex w-70 mb7 justify-start`}>
                      {
                        props.items?.map( productItem => {
                          return (
                            <>
                              <Summary 
                                item={ productItem || {} } 
                                productId={productItem.productId}
                              />
                            </>
                          )
                        })
                      }
                    </div>
                    <div className={`${styles.showTogetherPopup__footer} flex`}>
                      <Button onClick={ ()=> setModalOpen(false) } variation="tertiary">
                        Continuar Comprando
                      </Button>
                      <Button onClick={ ()=> window.location.href="/checkout/#/cart" } variation="primary">
                        Finalizar Compra
                      </Button>
                    </div>
                  </>
                }
              </>
            )
        }
      />
    </>
  )
}

export default ModalForm