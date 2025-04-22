import Papa from "papaparse";

const generateShopifyListing = (selectedData) => {
  
  const csvHeaders = [
    "Handle",
    "Command",
    "Title",
    "Body HTML",
    "Vendor",
    "Type",
    "Tags",
    "Tags Command",
    "Status",
    "Published",
    "Published At",
    "Published Scope",
    "Template Suffix",
    "Gift Card",
    "Category: ID",
    "Category: Name",
    "Category",
    "Custom Collections",
    "Image Attachment",
    "Image Src",
    "Image Command",
    "Image Position",
    "Title 1",
    "Variant ID",
    "Variant Command",
    "Option1 Name",
    "Option1 Value",
    "Option2 Name",
    "Option2 Value",
    "Option3 Name",
    "Option3 Value",
    "Variant Generate From Options",
    "Variant Position",
    "Variant SKU",
    "Variant Weight",
    "Variant Weight Unit",
    "Variant HS Code",
    "Variant Country of Origin",
    "Variant Province of Origin",
    "Variant Price",
    "Variant Compare At Price",
    "Variant Cost",
    "Variant Requires Shipping",
    "Variant Taxable",
    "Variant Tax Code",
    "Variant Barcode",
    "Variant Image",
    "Variant Inventory Tracker",
    "Variant Inventory Policy",
    "Variant Fulfillment Service",
    "Variant Inventory Qty",
    "Variant Inventory Adjust"
  ];
  
  
  
  const sizeMapping = {
    XXS: "XXS",
    XS: "XS",
    S: "S",
    M: "M",
    L: "L",
    XL: "XL",
    XXL: "2XL",
    XXXL: "3XL",
    XXXXL: "4XL",
    XXXXXL: "5XL",
  };

  const sizes = Object.keys(sizeMapping); // ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXXXL", "XXXXXL"]

  const csvData = selectedData.flatMap((product) =>
    sizes.map((size) => {
      const mappedSize = sizeMapping[size]; // Convert size to 2XL, 3XL, etc.
     

   
      return {
        Handle: product.style_name.trim().toLowerCase().replace(/\s+/g,"-"),
        Command: "MERGE",
        Title: product.style_name || "",
        "Body HTML": product.description ||"",
        Vendor: "Qurvii",
        Type: product.style_type,
        Tags: `Qurvii Women, ${product.color}, ${product.pattern}, women's fashion, casual wear, women's clothing, ${product.style_type}, New Arrivals , New Arrival`,

        "Tags Command": "",
        Status: "active",
        Published: true,
        "Published At": "",
        "Published Scope": "",
        "Template Suffix": "",
        "Gift Card": "",
        "Category: ID": "",
        "Category: Name": "",
        Category: "",
        "Custom Collections": "",
        "Image Attachment": "",
        "Image Src": "",
        "Image Command": "",
        "Image Position": "",
        "Title 1": product.style_name || "",
        "Variant ID": "",
        "Variant Command": "",
        "Option1 Name": "SIZE",
        "Option1 Value": mappedSize || "",
        "Option2 Name": "",
        "Option2 Value": "",
        "Option3 Name": "",
        "Option3 Value": "",
        "Variant Generate From Options": "",
        "Variant Position": "",
        "Variant SKU": `${product.style_number}-${product.color}-${mappedSize}`,
        "Variant Weight": 0,
        "Variant Weight Unit": "g",
        "Variant HS Code": "",
        "Variant Country of Origin": "India",
        "Variant Province of Origin": "",
        "Variant Price": product.mrp,
        "Variant Compare At Price": product.mrp,
        "Variant Cost": "",
        "Variant Requires Shipping": true,
        "Variant Taxable": true,
        "Variant Tax Code": "",
        "Variant Barcode": "",
        "Variant Image": "",
        "Variant Inventory Tracker": "shopify",
        "Variant Inventory Policy": "continue",
        "Variant Fulfillment Service": "manual",
        "Variant Inventory Qty": 6,
        "Variant Inventory Adjust": 0
      }
    })
  );

    

  const csv = Papa.unparse({
    fields: csvHeaders,
    data: csvData,
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Shopify_Listing.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export { generateShopifyListing };
