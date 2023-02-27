import homeIcon from "../../imgs/icons/homeIcon.svg";
import addIcon from "../../imgs/icons/extraIcon.svg";
import lunchIcon from "../../imgs/icons/lunchIcon.svg";
import drinkIcon from "../../imgs/icons/drinkIcon.svg";
import menu_Data from "../../data.json";
import Modal from 'react-bootstrap/Modal';
import {useState} from 'react';

const MenuItems = ({
  Category,
  menuDatas,
  ActiveTab,
  setActiveTab,
  setCategory,
  curOrder,
  setCurOrder,
  setSubTotal,
  setSaleTax,
  ativeTableItem,
  setAtiveTableItem
}) => {

  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState(false);
  const [Options, setOptions] = useState(null);
  const [optionsNum, setOptionsNum] = useState(null);
  const [selectedItem, setSelectedItem] = useState([]);
  const [mutipleChooiceItem, setMutipleChooiceItem] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Lo Mein');

  const handleClose = () => {
    setShow(false)
    setSelectedItem([]);
  };

  const handleShow = () => setShow(true);
  
  const tabClicked = (tab) => {
    setActiveTab(tab);
    setCategory(null);
    setOptions(null);
  };

  const updateStateAndLocalstorage =async (upToDateOrder) => {
    const removedDuplicateArr = upToDateOrder.reduce((accumulator, currentObject) => {
      const existingObject = accumulator.find((item) => item.itemName === currentObject.itemName);
      if (existingObject) {
        existingObject.qty += currentObject.qty;
      } else {
        accumulator.push(currentObject);
      }
      return accumulator;
    }, []);
    
    localStorage.setItem("curOrder", JSON.stringify(removedDuplicateArr));
    await setCurOrder(removedDuplicateArr);
    let num = (removedDuplicateArr.length -1).toString()
    setAtiveTableItem(removedDuplicateArr.length -1)
    let elem = document.getElementById("row_"+num);
    elem.scrollIntoView({ behavior: 'smooth' });
  };

  const calSumTotal = async (upToDateOrder)=> {
    const initialValue = 0;
    const calSum = upToDateOrder.reduce(
      (acc, cur) => acc + (cur.price * cur.qty),
      initialValue
    );
    let calSaleTax =  Number(calSum * 0.08)
    setSaleTax(calSaleTax);
    localStorage.setItem("SaleTax", calSaleTax);
    localStorage.setItem("OrderSubTotal", calSum);
    await setSubTotal(calSum);
  };

  const placeOrder =  (orderNum, itemName, price) => {
    if(curOrder !== null ) {
      if (curOrder.length > 0 ) {
        let existOrder = curOrder.filter((order, i)=> {
          return order.orderNum === orderNum && order.itemName === itemName;
        })
        let restOrder = curOrder.filter((order, i)=> {
          return (order.orderNum !== orderNum || order.itemName !== itemName);
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

  const addWhiteRice = ()=> {
    if(curOrder){    
      if(curOrder[ativeTableItem].orderNum[0] === "L" || 
        curOrder[ativeTableItem].orderNum[0] === "h" ||
        curOrder[ativeTableItem].orderNum.substring(0,3) === "c10"||
        curOrder[ativeTableItem].orderNum.substring(0,3) === "c11" ||
        curOrder[ativeTableItem].orderNum.substring(0,3)=== "c12" ||
        curOrder[ativeTableItem].orderNum.substring(0,3) === "c13"){
          if(curOrder.length === 1 && (!curOrder[ativeTableItem].itemName.includes("(w. White Rice)"))) {
            let newObj = {
              orderNum: curOrder[ativeTableItem].orderNum, 
              itemName: `${curOrder[ativeTableItem].itemName} (w. White Rice)`, 
              price: curOrder[ativeTableItem].price, 
              qty: curOrder[ativeTableItem].qty
            }
            return updateStateAndLocalstorage([newObj]);
          } 
          else {
            if((!curOrder[ativeTableItem].itemName.includes("(w. White Rice)"))) {
              let newName = `${curOrder[ativeTableItem].itemName } (w. White Rice)`;
              let  newObj = {
                orderNum: curOrder[ativeTableItem].orderNum, 
                itemName: newName, 
                price: curOrder[ativeTableItem].price, 
                qty: curOrder[ativeTableItem].qty
              }
              let restOr = curOrder.filter((item, i)=> {
                return item.itemName !== curOrder[ativeTableItem].itemName
              });
              return updateStateAndLocalstorage([...restOr, newObj]);
            }
          }
      } 
    }else return
  }

  const toggleOption = async (orderNum, price)=> {
    if(orderNum === "side_btwr") {
      return addWhiteRice();
    }
    switch (orderNum) {
      case "b9":
        setModalTitle("b9. Baked Rice choice of two");
        setOptions(menu_Data.BakeRice_options);
        setOptionsNum(2);
        setMutipleChooiceItem([orderNum, "Baked Rice Choice of Two", price])
        break;
      case "c9" :
        setModalTitle("c9. Lo Mein or Fried Rice (w. 2 protein)");
        setOptions(menu_Data.Lomein_rice_options);
        setMutipleChooiceItem([orderNum, "Lo Mein or Fried Rice (w. 2 protein)", price])
        setOptionsNum(2);
        break;
      case "side_3p":
        setModalTitle("Lo Mein or Fried Rice (w. 3 protein)");
        setOptions(menu_Data.Lomein_rice_options);
        setMutipleChooiceItem([orderNum, "Lo Mein or Fried Rice (w. 3 protein)", price])
        setOptionsNum(3);
        break;
      case "L7":
      setModalTitle("L7. Lunch Hibachi Choice of Two");
      setOptions(menu_Data.Hibachi_options);
      setMutipleChooiceItem([orderNum, "Lunch Hibachi Choice of Two", price])
      setOptionsNum(2);
        break;
      case "h7":
      setModalTitle("h7. Dinner Hibachi Choice of Two");
      setOptions(menu_Data.Hibachi_options);
      setMutipleChooiceItem([orderNum, "Dinner Hibachi Choice of Two", price])
      setOptionsNum(2);
        break;
      default:
        setModalTitle(null);
        setOptions(null);
        break;
    }
    handleShow();
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
    case "Others":
      curIcon = addIcon;
      break;
    default:
      curIcon = null;
      break;
  }

  const checkBoxHandler = (e)=> {
    const value = e.target.value;

    if(e.target.checked) {
      if (selectedItem.length < optionsNum) {
        setSelectedItem([...selectedItem, value]);
      }
    } else {
      setSelectedItem(selectedItem.filter((val) => val !== value));
    }
  }

  const isCheckboxDisabled = (option) => {
    return selectedItem.length === optionsNum && !selectedItem.includes(option);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const beforePlaceOrder = () => {
    let itemName;
    let orderNum =  mutipleChooiceItem[0];
    let price =  mutipleChooiceItem[2];

    if(mutipleChooiceItem[0] === "c9") {
      itemName = `${selectedOption} (w. 2 proteins) ${selectedItem[0]} & ${selectedItem[1]}`;
    }
    else if(selectedItem.length === 3) {
      itemName = `${selectedOption} (w. 3 proteins) ${selectedItem[0]} & ${selectedItem[1]} & ${selectedItem[2]}`;
    }else {
      itemName = `${mutipleChooiceItem[1]} ${selectedItem[0]} & ${selectedItem[1]}`;
    }
    placeOrder(orderNum,itemName, price);
    handleClose();
  }
     
  return (
    <>
      {Category && ( 
      <>
        {( Category === "drinks" ) ? 
        <>
        <div className="menuItemHeader m-4 px-2">
          <img className="me-3" src={ drinkIcon} alt="logo" />
          <h1 className="main">{ActiveTab}</h1>
        </div>
        <div className="allItemsDiv row m-4">
          {menuDatas.map((item, index) => (
            <div className="col-3 singleItem p-0" key={index}>           
            <div className='itemName card' onClick={() => {
                placeOrder(
                  item.item_num, 
                  item.name, 
                  item.price,
                  );
              }}>
              <span className="lead">{item.name}</span>
            </div>
          </div>
          ))}
        </div>
        </>
        :
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
                <div className="col-3 singleItem p-0" key={index + item.name}>
                  <div
                    className="itemName card"
                    onClick={() => {
                      item.item_num !== "b9" 
                      &&item.item_num !=="c9" 
                      &&item.item_num !=="side_3p"
                      &&item.item_num !=="h7"
                      &&item.item_num !=="L7"
                      &&item.item_num !=="side_btwr"?
                      placeOrder(
                        item.item_num, 
                        item.name, 
                        item.price,
                      )
                      :
                      toggleOption(
                        item.item_num, 
                        item.price);
                    }}
                  >
                    <h6 className="lead m-0">{(Category !== "Party" && Category !== "Side" && (item.item_num.slice(0, 2 ) !== "si")) && item.item_num }</h6>
                    <span className="lead">{Category === "Party" ? (item.name.slice(0, -8)) : item.name}</span>
                  </div>
                </div>
              ))}
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>    
            <div className="row">
            { Options && Options.map((item, index) => (
              <div className="col-6" key={index}>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox" value={item.name}
                      onChange={(e)=>{checkBoxHandler(e)}} 
                      disabled={isCheckboxDisabled(item.name)}
                    />
                    <label className="form-check-label" htmlffor="inlineCheckbox">{item.name}</label>
                  </div>
              </div>
            ))
            }
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="ModalFooter">
            {(mutipleChooiceItem[0] === "c9" || mutipleChooiceItem[0] === "side_3p") &&
              <select value={selectedOption} onChange={(e)=>{handleSelectChange(e)}}  className="form-select form-select-lg mt-2 w-50 me-4" aria-label=".form-select-lg">
                <option value="Lo Mein">Lo Mein</option>
                <option value="Fried Rice">Fried Rice</option>
              </select>
            }
            <div className="ModalBtnDiv">
              <button className="btn btn-outline-danger w-40 mt-2 me-4" onClick={handleClose}>
                Close
              </button>
              <button className="btn btn-outline-danger w-40 mt-2"
                disabled={selectedItem.length < optionsNum }  onClick={()=> {
                beforePlaceOrder()
              }}>
                Add Order
              </button>
            </div>
            </div>
          </Modal.Footer>
        </Modal>
        </>
        }
      </>
      )}
    </>
  );
};
export default MenuItems;
