function Form({
    text,
    setText,
    email,
    setEmail,
    phone,
    setPhone,
    add,
    error
}) {
    return (
        <>
            <input type="text"
                placeholder="name"
                value={text}
                onKeyDown={(e) => {if (e.key === 'Enter') {add()}}}
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
                onChange={(e) => {
                    const Number = e.target.value.replace(/\D/g, '').slice(0, 11)
                    setPhone(Number)
                }}
            />
            <button onClick={add}>registrar</button >
            {error && <p className="msg-error">{error}</p>}
        </>
    )
}
export default Form