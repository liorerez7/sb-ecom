import { FaBoxOpen, FaHome, FaShoppingCart, FaStore, FaThList } from "react-icons/fa";
import bannerImageOne from "../assets/sliders/1.jpg";
import bannerImageTwo from "../assets/sliders/2.jpg";
import bannerImageThree from "../assets/sliders/3.jpg";
import { current } from "@reduxjs/toolkit";

export const bannerLists = [
  { id: 1, image: bannerImageOne, title: "Home Comfort", subtitle: "Living Room", description: "Upgrade your space with cozy and stylish sofas" },
  { id: 2, image: bannerImageTwo, title: "Entertainment Hub", subtitle: "Smart TV", description: "Experience the latest in home entertainment" },
  { id: 3, image: bannerImageThree, title: "Playful Picks", subtitle: "Kids' Clothing", description: "Bright and fun styles for kids, up to 20% off" }
];


export const adminNavigation = [
  {name: "Dashboard",
     href: "/admin",
      icon: FaHome,
       curent: true
  },{
    name: "Products",
     href: "/admin/products",
      icon: FaBoxOpen,
  },{
    name: "Categories",
     href: "/admin/categories",
      icon: FaThList,
  },{
    name: "Sellers",
     href: "/admin/sellers",
      icon: FaStore,
  },{
    name: "Orders",
     href: "/admin/orders",
      icon: FaShoppingCart
  }

]

export const sellerNavigation = [
  {
    name: "Products",
     href: "/admin/products",
      icon: FaBoxOpen,
      current: true
  },{
    name: "Orders",
     href: "/admin/orders",
      icon: FaShoppingCart
  }
]