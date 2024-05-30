import React, { useState, useEffect } from "react"
import styles from './style.css'

import CookieService from './utils/CookieService';

const PromotionalPopup = ({ children, isSubcriptionActive }) => {

  const [isModalVisible, setModalVisible] = useState("dn")

  const closeModal = () => {
    setModalVisible("dn")
    CookieService.setCookie('promotionalPopup', 'true', 1)
  }

  useEffect(() => {
    const cookieValue = CookieService.getCookie('promotionalPopup');
    isSubcriptionActive && (
      cookieValue?.length ? setModalVisible("dn") : setModalVisible("flex")
    )
  }, []);

  return (
    isSubcriptionActive && (
      <div id="promotionalPopupOverlay" className={`${styles.promotionalPopupOverlay} ${isModalVisible}`}>
        <div className={styles.promotionalPopup__container}>
          <div className={styles.promotionalPopup__header}>
            <button className={styles.promotionalPopup__closeButton} onClick={closeModal}>X</button>
          </div>
          <div className={styles.promotionalPopup__content}>
            { children }
          </div>
        </div>
      </div>
    )
  )
}

PromotionalPopup.defaultProps = {
  isSubcriptionActive: true
}

PromotionalPopup.schema = {
  title: 'Newsletter Popup',
  description: 'Modal for subscribe to receive newsletter',
  type: 'object',
  properties: {
    isSubcriptionActive: {
      title: 'Is Subscription Active?',
      description: 'Show or Hide the App',
      type: 'boolean',
      enum: [
        true,
        false
      ],
      default: PromotionalPopup.defaultProps.isSubcriptionActive
    }
  },
}

export default PromotionalPopup;
