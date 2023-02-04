import homeIcon from "../../imgs/icons/homeIcon.svg";
import addIcon from "../../imgs/icons/extraIcon.svg";
import lunchIcon from "../../imgs/icons/lunchIcon.svg";
import drinkIcon from "../../imgs/icons/drinkIcon.svg";

const MenuItems = ({
  Category,
  menuDatas,
  ActiveTab,
  setActiveTab,
  setCategory,
  curOrder,
  setCurOrder,
  setSubTotal
}) => {
  const tabClicked = (tab) => {
    setActiveTab(tab);
    setCategory(null);
  };

  const updateStateAndLocalstorage =async (upToDateOrder) => {
    localStorage.setItem("curOrder", JSON.stringify(upToDateOrder));
    await setCurOrder(upToDateOrder);
    let num = (upToDateOrder.length -1).toString()
    let elem = document.getElementById("row_"+num);
    elem.scrollIntoView({ behavior: 'smooth' });
  };

  const calSumTotal = async (upToDateOrder)=> {
    
    const initialValue = 0;
    const calSum = upToDateOrder.reduce(
      (acc, cur) => acc + (cur.price * cur.qty),
      initialValue
    );
    localStorage.setItem("OrderSubTotal", calSum);
    await setSubTotal(calSum);
  };

  const placeOrder =  (orderNum, itemName, price) => {
    if(curOrder !== null) {
      if (curOrder.length > 0 ) {
        let existOrder = curOrder.filter((order, i)=> {
          return order.orderNum === orderNum && order.itemName === itemName;
        })

        let restOrder = curOrder.filter((order, i)=> {
          return (order.orderNum !== orderNum && order.itemName !== itemName);
        })
        if(existOrder.length > 0) {
          existOrder[0].qty = existOrder[0].qty +1;
          if(restOrder.length > 0) {
            const updateOrder = [ 
              ...restOrder,
              {
                orderNum: existOrder[0].orderNum,
                itemName: existOrder[0].itemName,
                price: existOrder[0].price,
                qty: existOrder[0].qty,
              }
            ];
            updateStateAndLocalstorage(updateOrder);
            calSumTotal(updateOrder);
          }else {
            updateStateAndLocalstorage([
              {
                orderNum: existOrder[0].orderNum,
                itemName: existOrder[0].itemName,
                price: existOrder[0].price,
                qty: existOrder[0].qty,
              }
            ]);
            calSumTotal([
              {
                orderNum: existOrder[0].orderNum,
                itemName: existOrder[0].itemName,
                price: existOrder[0].price,
                qty: existOrder[0].qty,
              }
            ]);
          }
        }else {
          const addOrders = [ 
            ...curOrder,
            {
              orderNum: orderNum,
              itemName: itemName,
              price: price,
              qty: 1,
            }
          ];
          updateStateAndLocalstorage(addOrders);
          calSumTotal(addOrders);
        }
      } 
    }
    else {
      let fristOrder = [
        {
          orderNum: orderNum,
          itemName: itemName,
          price: price,
          qty: 1,
        }
      ];
      updateStateAndLocalstorage(fristOrder);
      calSumTotal(fristOrder);
    }
  };
  let curIcon = null;
  switch (ActiveTab) {
    case "Main":
      curIcon = homeIcon;
      break;
    case "Lunch":
      curIcon = lunchIcon;
      break;
    case "Drinks":
      curIcon = drinkIcon;
      break;
    case "Add":
      curIcon = addIcon;
      break;
    default:
      curIcon = null;
      break;
  }
  return (
    <>
      {Category && (
        <>
          <div className="menuItemHeader m-4 px-2">
            <img className="me-3" src={curIcon} alt="logo" />
            <h1
              className="main activeM"
              onClick={() => {
                tabClicked(ActiveTab);
              }}
            >
            {ActiveTab}
            </h1>
            <h1 className="menuCat mx-2">/ {Category}</h1>
          </div>
          <div className="allItemsDiv row m-4">
            {menuDatas.map((item, index) => (
              <div className="col-3 singleItem p-0" key={index}>
                <div
                  className="itemName"
                  onClick={() => {
                    placeOrder(item.item_num, item.name, item.price);
                  }}
                >
                  <h6 className="lead m-0">{item.item_num}</h6>
                  <span className="lead">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
export default MenuItems;
