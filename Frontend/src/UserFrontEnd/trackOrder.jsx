import React, { useState } from 'react'
import { MDBInput } from 'mdb-react-ui-kit';
import Header from "UserFrontEnd/components/Header";
import axios from 'axios';

function Trackorders() {
  const [orderId, setOrderId] = useState('');

  const handleButtonClick =async()=>{
    window.location.href=`/orderSummary/${orderId}`
  }

  return (
    <div>
      <Header />
      <section className="text-center text-lg-start">
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .cascading-right {
                margin-right: 0;
              }
            `,
          }}
        />
        <div className="container py-4">
          <div className="row g-0 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0 mt-5 mx-auto">
              <div
                className="card cascading-right"
                style={{
                  background: 'hsla(0, 0%, 100%, 0.55)',
                  backdropFilter: 'blur(30px)',
                }}
              >
                <div className="card-body p-5 shadow-5 text-center">
                  <h2 className="fw-bold mb-5">Track Order</h2>
                  <p>To track your order please enter your Order ID in the box below .This was given to you on your receipt and in the confirmation email you should have received.</p>
                  <form>
                    <div className="row">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-truck fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0 me-3">
                          <MDBInput 
                          id="form1" 
                          type="number" 
                          name="orderId"
                          value={orderId}
                          onChange={(e) => setOrderId(e.target.value)} />
                        </div>
                        <button onClick={handleButtonClick} type="button" className="btn btn-primary px-3">
                          <i className="fa fa-arrow-right" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </form>
           
                </div>
              
              </div>
            </div>
          </div>
        </div>
      </section>
    
    </div>
  )
}

export default Trackorders
