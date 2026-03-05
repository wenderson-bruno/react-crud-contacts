function Form ({
    text,
    setText,
    email,
    setEmail,
    phone,
    setPhone,
    add,
    error
}) {
    return(
        <>
            <input type="text" 
            placeholder="name" 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            />

            <input type="email" 
            placeholder="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            />

            <input type="text" 
            placeholder="phone" 
            value={phone} 
            onChange={(e) => 
            setPhone(e.target.value.replace(/\D/g, ''))}
            />
            <button onClick={add}>registrar</button>
            {error && <p className="msg-error">{error}</p>}
        </>
    )}
export default Form