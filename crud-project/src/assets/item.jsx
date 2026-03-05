function Item({ item, onEdit, onRemove }) {
    return (
        <ul className="list">
            <div className="info">
                <li>{item.name}</li>
                <li>{item.email}</li>
                <li>{item.phone}</li>
            </div>
            <div className="action">
                <button className="btnEdit" onClick={() => onEdit(item.id)}>Edit</button>
                <button className="btnRemove" onClick={() => onRemove(item.id)}>Remove</button>
            </div>
        </ul>
    )
}
export default Item 