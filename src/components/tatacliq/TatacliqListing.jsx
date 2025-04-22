import Papa from "papaparse";

const generateTatacliqListing = (selectedData) => {
  const csvHeaders = [
    "SKUCODE*",
    "CATEGORY_NAME",
    "inventorydetails",
    "HSNCODE*",
    "#ATTR_colorapparel_Color*",
    "#ATTR_menpattern_Pattern",
    "#ATTR_sizechart_Size Chart*",
    "#ATTR_washcare_Wash Care*",
    "#ATTR_washcare_Wash*",
    "#ATTR_others1apparel_Care",
    "#ATTR_stylecode_Style Code*",
    "#ATTR_fittopwearmen_Fit*",
    "#ATTR_mencasualtopwearsize_Size*",
    "#ATTR_fabricapparel_Fabric*",
    "SKUCODE*",
    "#ATTR_waistrise_Waist Rise*",
    "#ATTR_denimtreatments_Denim Treatments*",
    "#ATTR_withblouse_With Blouse*",
    "#ATTR_wiring_Wiring*",
    "#ATTR_bracoverage_Coverage*",
    "#ATTR_padding_Padding*",
    "TITLE*",
    "DESCRIPTION*",
    "PBIIDENTITYCODE*",
    "PBIIDENTITYVALUE*",
    "#ATTR_menfabric_Fabric Family*",
    "#ATTR_mencasualtopwearcollarneck_Neck/Collar*",
    "#ATTR_brand_Brand*",
    "#ATTR_mensleeve_Sleeve*",
    "#ATTR_occasion_Occasion*",
    "#ATTR_colorfamilyapparel_Color Family*",
    "#ATTR_trousertype_Trouser Type*",
    "#ATTR_pocketapparel_Pocket",
    "#ATTR_brieftype_Brief Type*",
    "#ATTR_bratype_Bra Type*",
    "#ATTR_nightweartype_Nightwear Type",
    "#ATTR_dresslength_Dress Length*",
    "#ATTR_skirtlength_Skirt Length*",
    "VIDEOURL",
    "COUNTRYOFMANUFACTURER",
    "#ATTR_multipack_Multi Pack*",
    "#ATTR_mrp_MRP [INR]*",
    "#ATTR_packquantity_Pack Quantity",
    "#ATTR_mensetcontents_Set Contents*",
    "#ATTR_setitems_Set Items*",
    "#ATTR_dressshape_Dress Shape",
    "#ATTR_skirtshape_Skirt Shape",
    "#ATTR_shapeapparel_Shape",
    "#ATTR_collectiondateapparel_Collection Date",
    "#ATTR_collectionapparel_Collection",
    "#ATTR_collectioninfoapparel_Collection Info",
    "#ATTR_seasonapparel_Season",
    "PRODUCTUPLOADSTATUS*",
    "NAME*",
    "MINIDESCRIPTION",
    "METATITLE",
    "METAKEYWORD",
    "METADESCRIPTION",
    "TAGS",
    "STARTDATE*",
    "ENDDATE*",
    "REVIEW",
    "PITIMAGE*",
    "IMAGEPRIORITY",
    "LENGTH",
    "WIDTH",
    "HEIGHT",
    "WEIGHT",
    "#ATTR_upSellAssociatedProducts_Up Sell - Associated Products",
    "#ATTR_stylenote_Style Note*",
    "#ATTR_crossSellAssociatedProductStatus_Cross Sell - Associated Product Status",
    "#ATTR_ageband_Age Band*",
    "#ATTR_brandDescription_Brand Description*",
    "#ATTR_featureapparel_Feature",
    "#ATTR_weightapparel_Weight*",
    "#ATTR_sellerAssociationStatus_Seller Product Association Status*",
    "#ATTR_upSellAssociatedProductStatus_Up Sell - Associated Product Status",
    "#ATTR_warrantyType_Warranty Type*",
    "#ATTR_leadTimeForTheSKUHomeDelivery_Lead time for the SKU -  Home Delivery [No. of days]*",
    "#ATTR_unisexapparel_Unisex",
    "#ATTR_crossSellAssociatedProducts_Cross Sell - Associated Products",
    "#ATTR_leadvariantid_Lead Variant ID",
    "#ATTR_displayproduct_Display Product Name*",
    "#ATTR_modelfit_Model Fit*",
    "#ATTR_packcolor_Pack Color",
    "#ATTR_warrantyTimePeriod_Warranty Time Period [Months]*",
    "#ATTR_storyname_Story Name",
    "#ATTR_tshirttype_Tshirt Type",
    "#ATTR_brandfitname_Brand Fit Name",
    "#ATTR_apparelsports_Sports",
    "#ATTR_sockusage_Usage",
    "#ATTR_womensetcontents_Set Contents*",
    "#ATTR_sleepwearcoverage_Length",
    "#ATTR_cut_Cut",
    "PBIIDENTITYCODE_2",
    "PBIIDENTITYVALUE_2",
    "PBIIDENTITYCODE_3",
    "PBIIDENTITYVALUE_3",
    "#ATTR_others3apparel_Others 3",
    "#ATTR_others2apparel_Others 2",
    "Inventory",
    "Sub Brand",
    "Manufacturer Details",
    "Packer Details",
    "Importer Details",
    "Country of origin",
    "Image link 1",
    "Image link 2",
    "Image link 3",
    "Image link 4",
    "Image link 5",
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

      let product_category = {
        Dress: "Dresses",
        Top: "Tops",
        Shirt: "Shirts",
        Jacket: "Jackets",
        Coat: "Coats",
        Plazzo: "Plazzoes",
        Shrug: "Shrugs",
      };

      let category_name =
        typeof product.style_type === "string" ? product.style_type.trim() : "";
      let productCategory =
        product_category[category_name] || product.style_type;

      let seasonYear = new Date().getFullYear();

      //   **********************Fitting mapping ***************************************
      let fittingType = "Regular fit";

      if (product.fit && typeof product.fit === "string") {
        const fit = product.fit.toLowerCase(); // Convert to lowercase for case-insensitive comparison
        if (fit.includes("relaxed")) {
          fittingType = "Relaxed Fit";
        } else if (fit.includes("slim")) {
          fittingType = "Slim fit";
        }
      }
      
     //   ********************** end of Fitting mapping ***************************************


     //   ********************** start of occasion mapping ***************************************
      
      let occasion = "Casual Wear";

      if (product.occasion && typeof product.occasion === "string") {
        const occasionText = product.occasion.toLowerCase(); // Convert to lowercase for case-insensitive matching
        
        if (occasionText.includes("evening") || occasionText.includes("festival")) {
          occasion = "Evening Wear";
        } else if (occasionText.includes("casual")) {
          occasion = "Casual Wear";
        }
      }
      

//   ********************** end of occasion mapping ***************************************

//   ********************** start of pattern  mapping ***************************************

      const patternList = [
        "Print", "Solid", "Lace", "Stripes", "Paisley", "Floral", "Pin Stripes", 
        "Geometric", "Checks", "Embroidery", "Metallic", "Embellished", "Polka Dot", 
        "Animal Print", "Other", "Color-Block", "Structured"
      ];
      
      let patternType = "";
      
      if (product.pattern && typeof product.pattern === "string") {
        const patternText = product.pattern.toLowerCase(); // Normalize input for case-insensitive comparison
        
        if (patternText === "leopard" || patternText === "animal") {
          patternType = "Animal Print";
        } else if (patternText === "polka") {
          patternType = "Polka Dot";
        } else if (patternText === "check") {
          patternType = "Checks";
        } else if (patternText === "stripe") {
          patternType = "Stripes";
        } else {
          // Find a match in patternList
          patternType = patternList.find(pattern => patternText.includes(pattern.toLowerCase())) || "";
        }
      }
          
     

      return {
        "SKUCODE*": `${product.style_number}-${product.color}-${mappedSize}`,
        CATEGORY_NAME: productCategory,
        inventorydetails: "",
        "HSNCODE*": "62114290",
        "#ATTR_colorapparel_Color*": product.color,
        "#ATTR_menpattern_Pattern": patternType || product.pattern,
        "#ATTR_sizechart_Size Chart*": "",
        "#ATTR_washcare_Wash Care*": product.care_instruction,
        "#ATTR_washcare_Wash*": "",
        "#ATTR_others1apparel_Care": "",
        "#ATTR_stylecode_Style Code*": product.style_number,
        "#ATTR_fittopwearmen_Fit*": fittingType,
        "#ATTR_mencasualtopwearsize_Size*": mappedSize,
        "#ATTR_fabricapparel_Fabric*": product.fabric,
        "SKUCODE*": `${product.style_number}-${product.color}-${mappedSize}`,
        "#ATTR_waistrise_Waist Rise*": "Mid rise",
        "#ATTR_denimtreatments_Denim Treatments*": "Other",
        "#ATTR_withblouse_With Blouse*": "No",
        "#ATTR_wiring_Wiring*": "",
        "#ATTR_bracoverage_Coverage*": "",
        "#ATTR_padding_Padding*": "",
        "TITLE*": product.style_name,
        "DESCRIPTION*": product.description,
        "PBIIDENTITYCODE*": "",
        "PBIIDENTITYVALUE*": "",
        "#ATTR_menfabric_Fabric Family*": product.fabric,
        "#ATTR_mencasualtopwearcollarneck_Neck/Collar*": "",
        "#ATTR_brand_Brand*": "Qurvii",
        "#ATTR_mensleeve_Sleeve*": "",
        "#ATTR_occasion_Occasion*": occasion,
        "#ATTR_colorfamilyapparel_Color Family*": product.color,
        "#ATTR_trousertype_Trouser Type*": "",
        "#ATTR_pocketapparel_Pocket": "",
        "#ATTR_brieftype_Brief Type*": "",
        "#ATTR_bratype_Bra Type*": "",
        "#ATTR_nightweartype_Nightwear Type": "",
        "#ATTR_dresslength_Dress Length*": "",
        "#ATTR_skirtlength_Skirt Length*": "",
        VIDEOURL: "",
        COUNTRYOFMANUFACTURER: "",
        "#ATTR_multipack_Multi Pack*": "No",
        "#ATTR_mrp_MRP [INR]*": product.mrp,
        "#ATTR_packquantity_Pack Quantity": "1",
        "#ATTR_mensetcontents_Set Contents*": "",
        "#ATTR_setitems_Set Items*": "",
        "#ATTR_dressshape_Dress Shape": "",
        "#ATTR_skirtshape_Skirt Shape": "",
        "#ATTR_shapeapparel_Shape": "",
        "#ATTR_collectiondateapparel_Collection Date": "",
        "#ATTR_collectionapparel_Collection": "",
        "#ATTR_collectioninfoapparel_Collection Info": "",
        "#ATTR_seasonapparel_Season": `AW${seasonYear}`,
        "PRODUCTUPLOADSTATUS*": "Pending",
        "NAME*": product.style_type,
        MINIDESCRIPTION: "",
        METATITLE: "",
        METAKEYWORD: "",
        METADESCRIPTION: "",
        TAGS: "",
        "STARTDATE*": "",
        "ENDDATE*": "",
        REVIEW: "",
        "PITIMAGE*": "",
        IMAGEPRIORITY: "1",
        LENGTH: "30",
        WIDTH: "17",
        HEIGHT: "4",
        WEIGHT: "150",
        "#ATTR_upSellAssociatedProducts_Up Sell - Associated Products": "",
        "#ATTR_stylenote_Style Note*": "",
        "#ATTR_crossSellAssociatedProductStatus_Cross Sell - Associated Product Status":
          "",
        "#ATTR_ageband_Age Band*": "18-45",
        "#ATTR_brandDescription_Brand Description*": "Qurvii",
        "#ATTR_featureapparel_Feature": "",
        "#ATTR_weightapparel_Weight*": "",
        "#ATTR_sellerAssociationStatus_Seller Product Association Status*":
          "No",
        "#ATTR_upSellAssociatedProductStatus_Up Sell - Associated Product Status":
          "",
        "#ATTR_warrantyType_Warranty Type*": "NA",
        "#ATTR_leadTimeForTheSKUHomeDelivery_Lead time for the SKU -  Home Delivery [No. of days]*":
          "",
        "#ATTR_unisexapparel_Unisex": "",
        "#ATTR_crossSellAssociatedProducts_Cross Sell - Associated Products":
          "",
        "#ATTR_leadvariantid_Lead Variant ID": "",
        "#ATTR_displayproduct_Display Product Name*": "",
        "#ATTR_modelfit_Model Fit*":
          "Model is 5ft 9in tall and is wearing size XS",
        "#ATTR_packcolor_Pack Color": "",
        "#ATTR_warrantyTimePeriod_Warranty Time Period [Months]*": "",
        "#ATTR_storyname_Story Name": "",
        "#ATTR_tshirttype_Tshirt Type": "",
        "#ATTR_brandfitname_Brand Fit Name": "",
        "#ATTR_apparelsports_Sports": "",
        "#ATTR_sockusage_Usage": "",
        "#ATTR_womensetcontents_Set Contents*": "",
        "#ATTR_sleepwearcoverage_Length": "",
        "#ATTR_cut_Cut": "",
        PBIIDENTITYCODE_2: "",
        PBIIDENTITYVALUE_2: "",
        PBIIDENTITYCODE_3: "",
        PBIIDENTITYVALUE_3: "",
        "#ATTR_others3apparel_Others 3": "",
        "#ATTR_others2apparel_Others 2": "",
        Inventory: "",
        "Sub Brand": "",
        "Manufacturer Details":
          "Qurvii, B-149 2nd floor sector 6, Noida, Pincode 201301, Email- logistics@qurvii.com",
        "Packer Details":
          "Qurvii, B-149 2nd floor sector 6, Noida, Pincode 201301, Email- logistics@qurvii.com",
        "Importer Details":
          "Qurvii, B-149 2nd floor sector 6, Noida, Pincode 201301, Email- logistics@qurvii.com",
        "Country of origin": "India",
      };
    })
  );

  const csv = Papa.unparse({
    fields: csvHeaders,
    data: csvData,
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "tatacliq_listing.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export { generateTatacliqListing };
