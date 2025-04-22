import { generateNykaaListing } from "./ActionButton";
import { generateShopifyListing } from "./actionbuttons/ShopifyActionButton";


const buttons = [
    { name: "Nykaa", action:()=> generateNykaaListing() },
    { name: "Myntra", action:()=> generateShopifyListing() },
    { name: "Shopify", action: ()=> generateNykaaListing() },
    { name: "Ajio", action: ()=> generateNykaaListing() },
    { name: "Tatacliq", action: ()=> generateNykaaListing()},
    { name: "Shoppersstop", action: ()=> generateNykaaListing() },
    { name: "Nykaa +", action: ()=> generateNykaaListing() },
    { name: "Myntra +", action: ()=> generateNykaaListing()},
    { name: "Ajio +", action: ()=> generateNykaaListing() },
    { name: "Tatacliq +", action: ()=> generateNykaaListing() },
    { name: "Shoppersstop +", action:()=> generateNykaaListing() },
    { name: "Edit", action:()=> generateNykaaListing() },
    { name: "Delete", action: ()=> generateNykaaListing() },
    { name: "Update", action: ()=> generateNykaaListing() }
  ];

  export {buttons}