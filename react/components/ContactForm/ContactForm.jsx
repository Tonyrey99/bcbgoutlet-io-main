import React, { useState } from "react"
import styles from './ContactForm.css'

const ContactForm = () => {

  const handleSubmit = (e) => {

    const inputs = e.target.elements;
    const data = {};

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        data[inputs[i].name] = inputs[i].value;
      }
    }

    console.log(data)

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    e.preventDefault();
    console.log('enviando');
    fetch('/api/dataentities/CO/documents', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .then(response => alert('Mensage enviada con éxito.'))
    .catch(err => console.error(err));
  }

  const successSubmit = () => {

  }

  return (
    <>
      <div>
        <form className={`${styles.contact__form}`} onSubmit={handleSubmit}>
          <div className={`${styles.contact__group}`}>
            <label className={`${styles.contact__label}`}>Nombre</label>
            <input id="contactName" className={`${styles.contact__input}`} name="name" label="name" />
          </div>
          <div className={`${styles.contact__group}`}>
            <label className={`${styles.contact__label}`}>Email</label>
            <input id="contactEmail"  className={`${styles.contact__input}`} name="email" label="email" />
          </div>
          <div className={`${styles.contact__group}`}>
            <label className={`${styles.contact__label}`}>Mensage</label>
            <textarea id="contactMessage" className={`${styles.contact__textarea}`} name="message" label="message" />
          </div>
          <div className={`${styles.contact__group}`}>
            <button type="submit"  className={`${styles.contact__button}`}>Enviar</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ContactForm;
