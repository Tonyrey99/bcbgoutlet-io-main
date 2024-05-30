import React, { useState, createContext } from 'react'

export const Context = createContext({})

export default function ContextProvider({children}){
  const [ isModalOpen, setModalOpen ] = useState(false)

  return(
      <Context.Provider value=
        {{
          isModalOpen,
          setModalOpen
        }}
      >
        {children}
      </Context.Provider>
  )
}