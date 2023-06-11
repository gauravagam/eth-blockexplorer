const Row = ({ title, value, dataType }) => {
    return (
        <div className='row'>
            <p className='col-3'>{title}</p>
            <p className='col-9'>{dataType==="hex" ? Number(value) : value}</p>
        </div>)
}

export default Row;