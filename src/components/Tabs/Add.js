import data from "../../data.json";
import addIcon from '../../imgs/icons/extraIcon.svg';

const Add = () => {
    const addItems = data.side;
    const itemClicked = (name, price)=> {
      console.log(name, price)
    }
    return (
      <>
        <div className="menuItemHeader m-4 px-2">
          <img className="me-3" src={addIcon} alt="logo" />
          <h1 className="main">Add</h1>
        </div>
        <div className="allItemsDiv row m-4">
          {addItems.map((item, index) => (
            <div className="col-3 singleItem p-0" key={index}>           
            <div className='itemName' onClick={() => {
                itemClicked(item.name, item.price )
              }} >
              <span className="lead">{item.name}</span>
            </div>
          </div>
          ))}
        </div>
      </>
    )
}
export default Add;