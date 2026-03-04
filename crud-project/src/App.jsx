import { useState } from "react"
import { useEffect } from "react"
import './App.css'

function App() {
  /* onde declara as variaveis  */
  const [text /* <-- Valor */, setText /* <-- Função */] = useState('')
  const [list, setList] = useState([])
  const [editItem, setEditItem] = useState(null)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  /* carrega a lista do localStorage */

  useEffect(() => {
    const savedList = localStorage.getItem('list')

    if (savedList) {
      setList(JSON.parse(savedList))
    }
  }, [])

  /* salva a lista no localStorage */
  useEffect(() => {
    if (list.length > 0) {
      localStorage.setItem('list', JSON.stringify(list))
    }
  }, [list])

  /* função de add */
  const add = () => {
    if (text.trim() === '' || email.trim() === '' || phone.trim() === '') return

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
  }


  const remove = (IdRemove) => {
    /* filtra a lista para remover o item com o índice especificado */
    const newList = list.filter((item) => item.id !== IdRemove)
    /* atualiza a lista */
    setList(newList)
  }

  /* função de edição */
  const edit = (idEdit) => {
    const item = list.find((item) => item.id === idEdit)

    /* se o item não for encontrado, retorna */
    if(!item) return

    /* preenche os campos com os valores do item a ser editado */
    setText(item.name)
    setEmail(item.email)
    setPhone(item.phone)

    /* define o item em edição */
    setEditItem(idEdit)
  }


  return (
    <div className="containerGeral"> {/* geral */}

      <div className="containerInput">
        <div className="border">
          <h1>Project Crud</h1>
          <input type="text" maxLength={40} placeholder="name" value={text} onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                add()
              }
            }} />
          <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" maxLength={11} placeholder="phone" value={phone} onChange={(e) => {
            const onLyNumbers = e.target.value.replace(/\D/g, '')
            setPhone(onLyNumbers)
          }} />
          <button className="register" onClick={add}>registrar</button>


          {list.map((item, index) => (

            <ul className="list" key={item.id}>
              <div className="info">
                <li>{item.name}</li>
                <li>{item.email}</li>
                <li>{item.phone}</li>
              </div>
              <div className="action">
                <button className="btnEdit" onClick={() => edit(item.id)} >edit</button>
                <button className="btnRemove" onClick={() => remove(item.id)} >remover</button>
              </div>
            </ul>

          ))}
        </div>
      </div>
    </div>
  )
}

export default App