import React from "react"
import styles from './style.css'

const InstitucionalMenu = () => {

  return (
    <>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.group}`}>
          <span>Institucional</span>
          <ul className={`${styles.menu}`}>
            <li className={`${styles.listItem} ${styles.eq01} flex`}>
              <a href="/acerca-de">Acerca de Nosotros</a>
            </li>
            <li className={`${styles.listItem} ${styles.eq01} flex`}>
              <a href="/empleo">Trabaja en BCBG</a>
            </li>
          </ul>
        </div>
        <div className={`${styles.group}`}>
          <span>Ayuda e Suporte</span>
          <ul className={`${styles.menu}`}>
            <li className={`${styles.listItem} ${styles.eq04} flex`}>
              <a href="/account">Mi Cuenta</a>
            </li>
            <li className={`${styles.listItem} ${styles.eq05} flex`}>
              <a href="/account/#orders">Mis Pedidos</a>
            </li>
            <li className={`${styles.listItem} ${styles.eq06} flex`}>
              <a href="/terminos-y-condiciones">Política de Entrega</a>
            </li>
            <li className={`${styles.listItem} ${styles.eq07} flex`}>
              <a href="/terminos-y-condiciones">Términos y Condiciones</a>
            </li>
            <li className={`${styles.listItem} ${styles.eq08} flex`}>
              <a href="/aviso-de-privacidad">Aviso de Privacidad</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default InstitucionalMenu;
