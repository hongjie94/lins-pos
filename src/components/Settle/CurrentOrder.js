
const CurrentOrder = () => {
   
    return (
      <>
       <div className="totalBox">
        <div className="tableDiv">
          <table class="table table-hover">
            <tbody>
              <tr>
                <td>
                  2 pcs of Sushi & 2 Classic Roll
                  <div>$6.99</div>
                </td>
                <td className='itemNumDiv'>
                  <div className="itemNumWrap">
                    <span className="h3 addItem">+</span>
                    <span className="qty">50</span>
                    <span className="h3 removeItem"> - </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
            
            <div className='totalFooter px-3'>
                <div className="preSubDiv">
                  <h6 className="text-muted">Subtotal</h6>
                  <strong>$0.00</strong>
                </div>
                <div className="preSubDiv">
                  <h6 className="text-muted"> Discount sales</h6>
                  <strong> - $0.00</strong>
                </div>
                <div className="preSubDiv">
                  <h6 className="text-muted">Total sales tax</h6>
                  <strong>$0.00</strong>
                </div>
                <hr />
                <div className="h3 totalubDiv">
                  <span>Total</span>
                  <span>$0.00</span>
                </div>
                <button type="button" class="btn btn-outline-danger w-100 mt-2"><strong>Settle</strong></button>
            </div>
          </div>
      </>
    )
}
export default CurrentOrder;