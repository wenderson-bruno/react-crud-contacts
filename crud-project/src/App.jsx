import { useState } from "react"
import { useEffect } from "react"
import Form from "./assets/form"
import List from "./assets/list"
import './App.css'

function App() {
  /* onde declara as variaveis  */
  const [text /* <-- Valor */, setText /* <-- Função */] = useState('') /* <--estado */ /* o estado é qualquer valor criado com  -->[useState]<-- */
  const [list, setList] = useState(() => {
    const savedList = localStorage.getItem('list')
    return savedList ? JSON.parse(savedList) : []
  })
  const [editItem, setEditItem] = useState(null)
  const [email, setEmail/* <-- função que muda o estado */] = useState('')
  const [phone, setPhone] = useState('')
  const [modalClose, setModalClose] = useState(false)

  /* sessão de erros */
  const [error, setError] = useState('')

  /* salva a lista no localStorage */
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])


  /* função de add */
  const add = () => {
    /* verifica se todos os campos estão preenchidos */
    if (text.trim() === '' || email.trim() === '' || phone.trim() === '') {
      setError('todos os campos não podem estar vazios!')
      return
    } else {
      setError('')
    }

    const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;

    /* verifica o email */
    if (!regex.test(email)) {
      setError('Email inválido!')
      return
    } else {
      setError('')
    }

    /* verifica o telefone */
    if (phone.length < 10) {
      setError('Telefone inválido!')
      return
    } else {
      setError('')
    }

    /* verifica o nome  */
    if (text.length < 3) {
      setError('o numero de caracteres deve ser maior que 3!')
      return
    } else {
      setError('')
    }

    /* cria o novo item */
    const newItem = {
      id: Date.now(),
      name: text,
      email: email,
      phone: phone
    }

    /* verifica se edit for diferente de nulo */
    if (editItem !== null) {
      const newList = list.map((item) =>
        item.id === editItem ? { ...item, name: text, email: email, phone: phone } : item
      )

      /* atualiza a lista */
      setList(newList)

      /* reseta o item em edição */
      setEditItem(null)
    } else {
      /* adiciona o novo item à lista */
      setList([...list, newItem])
    }
    setText('')
    setEmail('')
    setPhone('')

    setModalClose(true)
  }


  const remove = (IdRemove) => {
    /* verifica se o usuário deseja realmente remover o item  */
    const confirmRemove = window.confirm('tem certeza que deseja remover?')
    if (!confirmRemove) return

    /* filtra a lista para remover o item com o índice especificado */
    const newList = list.filter((item) => item.id !== IdRemove)

    /* atualiza a lista */
    setList(newList)
  }

  /* função de edição */
  const edit = (idEdit) => {
    const item = list.find((item) => item.id === idEdit)

    /* se o item não for encontrado, retorna */
    if (!item) return

    /* preenche os campos com os valores do item a ser editado */
    setText(item.name)
    setEmail(item.email)
    setPhone(item.phone)

    /* define o item em edição */
    setEditItem(idEdit)
  }

  return (
    <div className="containerInput">
        <div className="border">
        <h1 >Project crud</h1>
        <Form
          text={text}
          setText={setText}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          add={add}
          error={error}
        />
        <List
          list={list}
          onEdit={edit}
          onRemove={remove}
        />
        
        <div className={`container-modal ${modalClose ? "" : 'hidden'}`}> 
          <div className="modal">
           <img width="50" height="50" src="https://img.icons8.com/ios/50/008000/checked--v1.png" alt="checked--v1"/>
            <p>cadastrado com sucesso!</p>
            <button className="close-modal" onClick={() => setModalClose(false)}>Fechar</button>
          </div>
        </div>
        
        </div>
      </div>
  )
}

export default App