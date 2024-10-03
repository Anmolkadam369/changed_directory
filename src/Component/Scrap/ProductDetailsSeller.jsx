

const ProductDetailsSeller=()=>{

    return(
        <div>
            
        <div className="container my-5">
        <div className="row mb-4">
          <div className="col-md-12">
            <h3 className="mb-3">Product Information</h3>
            <ul className="list-group">
              <li className="list-group-item"><strong>Product Name:</strong> Truck Engine Parts</li>
              <li className="list-group-item"><strong>Category:</strong> Trucks</li>
              <li className="list-group-item"><strong>Condition:</strong> Used, like new</li>
              <li className="list-group-item"><strong>Price:</strong> $500</li>
              <li className="list-group-item"><strong>Quantity:</strong> 10 units</li>
              <li className="list-group-item"><strong>Weight/Dimensions:</strong> 200kg, 1.2m x 0.8m</li>
            </ul>
          </div>
        </div>
    
        <div className="row mb-4">
          <div className="col-md-12">
            <h3 className="mb-3">Photos</h3>
            <div className="row">
              <div className="col-md-4">
                <img src="https://via.placeholder.com/300x200" className="img-fluid" alt="Product Image 1"/>
              </div>
              <div className="col-md-4">
                <img src="https://via.placeholder.com/300x200" className="img-fluid" alt="Product Image 2"/>
              </div>
              <div className="col-md-4">
                <button className="btn btn-secondary">Upload/Replace Image</button>
              </div>
            </div>
          </div>
        </div>
    
        <div className="row mb-4">
          <div className="col-md-12">
            <h3 className="mb-3">Product Description</h3>
            <p>
              This is a full description of the product with detailed specifications and information.
            </p>
            <button className="btn btn-primary">Edit Description</button>
          </div>
        </div>
    
        <div className="row mb-4">
          <div className="col-md-12">
            <h3 className="mb-3">Status</h3>
            <p><strong>Current Status:</strong> Active</p>
            <button className="btn btn-warning">Change Status</button>
          </div>
        </div>
    
        <div className="row mb-4">
          <div className="col-md-6">
            <h3 className="mb-3">Views & Inquiries</h3>
            <p><strong>Views:</strong> 150</p>
            <p><strong>Inquiries:</strong> 5</p>
            <button className="btn btn-info">View Inquiries</button>
          </div>
        </div>
    
        <div className="row mb-4">
          <div className="col-md-12">
            <h3 className="mb-3">Offers</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Offer Amount</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>$450</td>
                  <td>2024-10-01</td>
                  <td>
                    <button className="btn btn-success">Accept</button>
                    <button className="btn btn-danger">Reject</button>
                    <button className="btn btn-secondary">Counter-Offer</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    
        <div className="row mb-4">
          <div className="col-md-12">
            <h3 className="mb-3">Shipping Details</h3>
            <ul className="list-group">
              <li className="list-group-item"><strong>Shipping Option:</strong> Seller ships</li>
              <li className="list-group-item"><strong>Shipping Rates:</strong> $50 within 50 miles</li>
              <li className="list-group-item"><strong>Shipping Destinations:</strong> US only</li>
            </ul>
            <button className="btn btn-primary mt-2">Modify Shipping Information</button>
          </div>
        </div>
    
        <div className="row mb-4">
          <div className="col-md-12">
            <h3 className="mb-3">Product Location</h3>
            <p><strong>Location:</strong> 123 Main St, Anytown, USA</p>
            <button className="btn btn-primary">Update Location</button>
          </div>
        </div>
    
        <div className="row mb-4">
          <div className="col-md-12">
            <h3 className="mb-3">Date Posted</h3>
            <p><strong>Date Posted:</strong> 2024-09-30</p>
            <button className="btn btn-primary">Renew/Relist</button>
          </div>
        </div>
    
        <div className="row mb-4">
          <div className="col-md-12">
            <h3 className="mb-3">Seller Notes</h3>
            <textarea className="form-control" rows="3" placeholder="Enter notes here..."></textarea>
          </div>
        </div>
    
        <div className="row mb-4">
          <div className="col-md-12">
            <h3 className="mb-3">Performance Analytics</h3>
            <p>Views: 150 | Inquiries: 5 | Similar Listings Performance: Better than 70% of listings</p>
            <p>Suggested Improvements: Add more images, lower price for quicker sale</p>
          </div>
        </div>
    
        <div className="row mb-4">
          <div className="col-md-12">
            <h3 className="mb-3">Delete Product</h3>
            <button className="btn btn-danger">Remove/Archive Product</button>
          </div>
        </div>
    
        <div className="row mb-4">
          <div className="col-md-12">
            <h3 className="mb-3">Payment Details</h3>
            <p><strong>Payment Method:</strong> PayPal</p>
            <p><strong>Payment Status:</strong> Paid</p>
          </div>
        </div>
      </div>
        </div>
    )
}


export default ProductDetailsSeller;
