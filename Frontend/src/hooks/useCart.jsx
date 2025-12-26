// File: hooks/useCart.js
import { useState, useEffect } from "react";

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const loadFromLocalStorage = () => {
      try {
        const savedCart = localStorage.getItem("persistentCart");
        const savedWishlist = localStorage.getItem("persistentWishlist");
        
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
        if (savedWishlist) {
          setWishlist(JSON.parse(savedWishlist));
        }
      } catch (error) {
        console.error("Error loading from localStorage:", error);
      }
      setIsLoaded(true);
    };

    loadFromLocalStorage();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("persistentCart", JSON.stringify(cartItems));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
    }
  }, [cartItems, isLoaded]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("persistentWishlist", JSON.stringify(wishlist));
      } catch (error) {
        console.error("Error saving wishlist to localStorage:", error);
      }
    }
  }, [wishlist, isLoaded]);

  // Add to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item._id === product._id);
      if (existing) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, qty: 1 }];
    });
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  // Update cart quantity
  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === productId ? { ...item, qty: newQty } : item
        )
      );
    }
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Toggle wishlist
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const existing = prevWishlist.find((item) => item._id === product._id);
      if (existing) {
        return prevWishlist.filter((item) => item._id !== product._id);
      }
      return [...prevWishlist, product];
    });
  };

  // Get cart total
  const getCartTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  // Get cart count
  const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + item.qty, 0);
  };

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  return {
    cartItems,
    wishlist,
    isLoaded,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    getCartTotal,
    getCartCount,
    isInWishlist,
    setCartItems,
    setWishlist,
  };
};

export default useCart;