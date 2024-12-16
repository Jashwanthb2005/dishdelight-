import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FloatingOrderCard from "./FloatingCart.jsx";
import "./Categorypage.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/src/menu.json")
      .then((response) => response.json())
      .then((data) => {
        if (data.categories[categoryName]) {
          setItems(data.categories[categoryName]);
        } else {
          console.error("Category not found");
        }
      });
  }, [categoryName]);

  const handleAddToOrder = (item) => {
    setOrders((prevOrders) => {
      const existingItem = prevOrders.find((order) => order.id === item.id);
      if (existingItem) {
        return prevOrders.map((order) =>
          order.id === item.id
            ? { ...order, quantity: order.quantity + 1 }
            : order
        );
      }
      return [...prevOrders, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateOrder = (id, quantity) => {
    setOrders((prevOrders) =>
      prevOrders
        .map((order) =>
          order.id === id ? { ...order, quantity: Math.max(0, quantity) } : order
        )
        .filter((order) => order.quantity > 0)
    );
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">
        {categoryName.replace("_", " ").toUpperCase()}
      </h1>
      <div className="row">
        {items.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow">
              <img src={item.image} alt={item.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text text-success fw-bold">
                  Price: ₹{item.price}
                </p>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => handleAddToOrder(item)}
                >
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <FloatingOrderCard orders={orders} onUpdateOrder={handleUpdateOrder} />
    </div>
  );
};

export default CategoryPage;
