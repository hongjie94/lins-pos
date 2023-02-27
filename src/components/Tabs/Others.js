import data from "../../data.json";
import extraIcon from '../../imgs/icons/extraIcon.svg';

const Add = ({setCategory, setActiveItems, setActiveTab}) => {
      const categories = data.others
      const itemClicked = (name) => {
            setCategory(name);
            setActiveTab("Others")
            switch (name) {
              case "Side":
                setActiveItems(data.side);
              break;
              case "Party":
                setActiveItems(data.party);
              break;
              default:
                setActiveItems(null);
              break;
            };
      };
      return (
      <>
          <div className="menuItemHeader m-4 px-2">
            <img className="me-3" src={extraIcon} alt="logo" />
            <h1 className="main">Others</h1>
          </div>
          <div className="allItemsDiv row m-4">
            {categories.map((name, index) => (
              <div className="col-3 singleItem p-0" key={index}>           
              <div className='itemName' onClick={() => {
                  itemClicked(name)
                }} >
                <span className="lead mainSpan">{name}</span>
              </div>
            </div>
            ))}
          </div>
        </>
      )
}
export default Add;