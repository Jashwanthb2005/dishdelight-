
import PropTypes from "prop-types";
import "./FloatingCart.css";

const FloatingOrderCard = ({ orders, onUpdateOrder }) => {
  const totalAmount = orders.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="floating-order-card shadow-lg">
      <h5 className="text-center">Your Order</h5>
      <div className="order-items">
        {orders.map((item) => (
          <div key={item.id} className="order-item d-flex align-items-center justify-content-between">
            <div>
              <p className="mb-0">{item.name}</p>
              <small className="text-muted">₹{item.price} x {item.quantity}</small>
            </div>
            <div className="quantity-controls">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => onUpdateOrder(item.id, item.quantity - 1)}
              >
                −
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => onUpdateOrder(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="d-flex justify-content-between">
        <span>Total:</span>
        <span className="fw-bold">₹{totalAmount.toFixed(2)}</span>
      </div>
      <button className="btn btn-primary w-100 mt-3">Place Order</button>
    </div>
  );
};

// Add prop types validation
FloatingOrderCard.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onUpdateOrder: PropTypes.func.isRequired,
};

export default FloatingOrderCard;
