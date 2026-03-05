import Item from "./item";

function List({ list, onEdit, onRemove }) {
    return (
        <>
            {list.map((item) => (
                <Item
                    key={item.id}
                    item={item}
                    onEdit={onEdit}
                    onRemove={onRemove}
                />
            ))}
        </>
    )
}
export default List