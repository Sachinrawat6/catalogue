import Papa from "papaparse";

const sizes = [
  "XXS",
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
  "XXXXL",
  "XXXXXL",
];

const sizeData = {
  XXS: [],
  XS: [],
  S: [],
  M: [],
  L: [],
  XL: [],
  XXL: [],
  XXXL: [],
  XXXXL: [],
  XXXXXL: [],
};

// Across Shoulder
sizeData.XXS.push(13.5);
sizeData.XS.push(13.5);
sizeData.S.push(14);
sizeData.M.push(14.5);
sizeData.L.push(15);
sizeData.XL.push(15.5);
sizeData.XXL.push(16);
sizeData.XXXL.push(16.5);
sizeData.XXXXL.push(17);
sizeData.XXXXXL.push(17.5);

// Bust
sizeData.XXS.push(33.5);
sizeData.XS.push(35.5);
sizeData.S.push(37.5);
sizeData.M.push(39.5);
sizeData.L.push(41.5);
sizeData.XL.push(43.5);
sizeData.XXL.push(45.5);
sizeData.XXXL.push(47.5);
sizeData.XXXXL.push(49.5);
sizeData.XXXXXL.push(51.5);

// Chest
sizeData.XXS.push(32.5);
sizeData.XS.push(34.5);
sizeData.S.push(36.5);
sizeData.M.push(38.5);
sizeData.L.push(40.5);
sizeData.XL.push(42.5);
sizeData.XXL.push(44.5);
sizeData.XXXL.push(46.5);
sizeData.XXXXL.push(48.5);
sizeData.XXXXXL.push(50.5);

// Dynamic Front Length Calculation
function addFrontLength(input) {
  if (input.Front_Length_inches_XS > 0) {
    sizes.forEach((size, index) => {
      sizeData[size].push(input.Front_Length_inches_XS + (index - 1) * 0.5);
    });
  } else {
    sizes.forEach((size) => sizeData[size].push(""));
  }
}

// Dynamic Sleeve Length Calculation
function addSleeveLength(input) {
  if (input.Sleeve_Length_inches_XS > 0) {
    sizes.forEach((size, index) => {
      sizeData[size].push(input.Sleeve_Length_inches_XS + (index - 1) * 0.25);
    });
  } else {
    sizes.forEach((size) => sizeData[size].push(""));
  }
}

// Waist
sizeData.XXS.push(25.5);
sizeData.XS.push(27.5);
sizeData.S.push(29.5);
sizeData.M.push(31.5);
sizeData.L.push(33.5);
sizeData.XL.push(35.5);
sizeData.XXL.push(37.5);
sizeData.XXXL.push(39.5);
sizeData.XXXXL.push(41.5);
sizeData.XXXXXL.push(43.5);

// Hips
sizeData.XXS.push(35.5);
sizeData.XS.push(37.5);
sizeData.S.push(39.5);
sizeData.M.push(41.5);
sizeData.L.push(43.5);
sizeData.XL.push(45.5);
sizeData.XXL.push(47.5);
sizeData.XXXL.push(49.5);
sizeData.XXXXL.push(51.5);
sizeData.XXXXXL.push(53.5);

// Inseam Length
const inseamLength = {
  XXS: 29,
  XS: 29.25,
  S: 29.5,
  M: 29.75,
  L: 30,
  XL: 30.25,
  XXL: 30.5,
  XXXL: 30.75,
  XXXXL: 31,
  XXXXXL: 31.25,
};

// Outseam Length
const outseamLength = {
  XXS: 41,
  XS: 41,
  S: 41,
  M: 41,
  L: 41,
  XL: 41,
  XXL: 41,
  XXXL: 41,
  XXXXL: 41,
  XXXXXL: 41,
};

// Example usage
const input = {
  Front_Length_inches_XS: 32,
  Sleeve_Length_inches_XS: 24,
};

addFrontLength(input);
addSleeveLength(input);

// console.log(sizeData);
// console.log(inseamLength);
// console.log(outseamLength);

const generateNykaaDressListing = (selectedData) => {
  const csvHeaders = [
    "Vendor SKU Code",
    "Gender",
    "Brand Name",
    "Style Code",
    "Product Name",
    "Description",
    "Price",
    "Color",
    "Country of Origin",
    "Manufacturer Name",
    "Manufacturer Address",
    "Ean Codes",
    "brand size",
    "Design Code",
    "Multipack Set",
    "Occasion",
    "Season",
    "Care Instruction",
    "Ships In",
    "HSN Codes",
    "Pack Contains",
    "Net Qty",
    "Material",
    "Style Bucket",
    "Dresses Type",
    "Disclaimer",
    "Character/Collection Shop",
    "Neckline",
    "Responsibility Criteria",
    "Pattern",
    "Collections Function",
    "Pocket Description",
    "Closure",
    "Fit",
    "Model details",
    "Sleeve length Type",
    "Age",
    "Bust For Body",
    "Chest For Body",
    "Waist For Body",
    "Hip For Body",
    "Bust for Garment",
    "Chest for Garment",
    "Waist for Garment",
    "Hip for Garment",
    "Shoulder for Garment",
    "Sleeve Length",
    "Shoulder For Body",
    "Length For Body",
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

  const csvData = selectedData
  .filter((product)=>product.style_type==="Dress" ||product.style_type==="Kaftan" || product.style_type.toLowerCase().includes("shirt dress") )
  .flatMap((product) =>
    sizes.map((size) => {
      const mappedSize = sizeMapping[size]; // Convert size to 2XL, 3XL, etc.
      // Sleeve length mapping
      let sleevType = "";

      if (product.sleeve_length_type === "Full") {
        sleevType = "Full Sleeves";
      } else if (product.sleeve_length_type === "Three Quarter") {
        sleevType = "Three Fourth Sleeves";
      } else if (
        product.sleeve_length_type === "Half" ||
        product.sleeve_length_type === "Short" ||
        product.sleeve_length_type === "Quarter" ||
        product.sleeve_length_type === "Elbow Length" ||
        product.sleeve_length_type === "Above Elbow Length"
      ) {
        sleevType = "Half Sleeves";
      }

      // End of sleeve length mapping

      // Fitting type mapping
      if (product.fit === "Loose Fit") {
        product.fit = "Loose";
      } else if (
        [
          "Regular Fit",
          "Regular Fit, Loose Fit",
          "Regular Fit, Western",
          "Regular Fit, Loose Fit, Classic",
          "Regular Fit, Loose Fit, Western",
          "Regular Fit, Western, Relaxed",
          "Regular Fit, Loose Fit, Relaxed",
          "Regular Fit, Relaxed",
          "Regular Fit, Slim Fit, Relaxed",
          "Regular Fit, Slim Fit, Western, Classic",
          "Regular Fit, Slim Fit, Classic",
          "Regular Fit, Loose Fit, Western, Relaxed",
          "Regular Fit, Western, Fusion",
          "Regular Fit, Loose Fit, Western, Fusion",
        ].includes(product.fit)
      ) {
        product.fit = "Regular";
      } else if (
        [
          "Relaxed Fit",
          "Regular Fit, Western",
          "Other",
          "Loose Fit, Western, Fusion",
          "Loose Fit, Western, Relaxed",
          "Loose Fit, Western, Fusion, Relaxed",
          "Slim Fit, Relaxed",
          "Western, Fusion, Relaxed",
        ].includes(product.fit)
      ) {
        product.fit = "Relaxed";
      } else if (product.fit === "Slim Fit") {
        product.fit = "Slim";
      } else if (product.fit === "Stretch Fit") {
        product.fit = "Bodycon";
      } else if (product.fit === "Oversized") {
        product.fit = "Oversized";
      } else if (product.fit === "Fit & Flare") {
        product.fit = "Flared";
      }

      // Neck Style mapping
      const neckStyleMapping = {
        "V Neck": "V-Neck",
        "Wide Collar V Neck": "V-Neck",
        "Shawl Collar": "Shawl Lapel",
        Shawl: "Shawl Lapel",
        "Mandarin Collar": "Mandarin Neck",
        "Tie or Bow": "Tie Up Neck",
      };

      // Update product necline if a match exists
      product.neckline = neckStyleMapping[product.neckline] || product.neckline;

      // color mapping start here 
      
      const colorMapping = {
        "Multi":"Multi-color",
        "Navy":"Navy Blue",
        "Gray":"Grey",
        "fuchia pink":"Pink",
        "Fucia Pink":"Pink",
        "Fuchia Pink":"Pink",
        "Fuchia pink":"Pink",
        "fucia pink":"Pink",
        "Mint Green":"Green",
        "mint green":"Green"
      }

      product.color = colorMapping[product.color] || product.color;

      // end of color mapping 




      // Fabric material mapping
      const fabricMapping = {
        "French crepe": "Poly Silk",
        "Navy french crepe": "Poly Silk",
        "French Crepe": "Poly Silk",
        "French Crepe Silk": "Poly Silk",
        "Burfi silk": "Silk",
        "Burfii silk": "Silk",
        "Burfi Silk": "Silk",
        "Vamika crepe": "Crepe",
        "Vamika Crepe": "Crepe",
        "Capri Crepe": "Crepe",
        "Mint green bubble crepe": "Crepe",
        "Navy stripe crepe": "Crepe",
        "Black Stripes crepe": "Crepe",
        "Black stripe crepe": "Crepe",
        "Pleated mustard Crepe": "Crepe",
        "Solid black Crepe": "Crepe",
        "Solid navy blue crepe": "Crepe",
        "Solid red crepe": "Crepe",
        "Yellow heart print crepe": "Crepe",
        "Red crepe": "Crepe",
        "Black crepe": "Crepe",
        "Polka dot crepe": "Crepe",
        "Polka crepe": "Crepe",
        Crepe: "Crepe",
        "Crepe silk": "Crepe",
        "White crepe": "Crepe",
        "Printed crepe": "Crepe",
        "Wine Stripe Crepe": "Crepe",
        "Blue-White stripe crepe": "Crepe",
        "Lime yellow bird printed crepe": "Crepe",
        "Mustard leopard print crepe": "Crepe",
        "Floral crepe": "Crepe",
        "Floral print crepe": "Crepe",
        "Black floral crepe": "Crepe",
        "Animal print crepe": "Crepe",
        "Solid Crepe": "Crepe",
        "Wine floral crepe": "Crepe",
        "Red floral print Crepe": "Crepe",
        Harnaz: "Georgette",
        Cosmic: "Georgette",
        "Harnaz Georgette": "Georgette",
        Georgette: "Georgette",
        Satin: "Satin",
        "Black Satin": "Satin",
        "Beige-Black leopard print satin": "Satin",
        "Floral print Satin": "Satin",
        "Digital printed Satin": "Satin",
        "Floral Satin": "Satin",
        "Roman Silk": "Silk",
        "Amalfi silk": "Silk",
        "Noritake silk": "Silk",
        "Navy Noritake silk": "Silk",
        "Turquoise green Noritake silk": "Silk",
        "Turquoise blue Noritake silk": "Silk",
        "Orange Noritake silk": "Silk",
        "Off-white burfi silk": "Silk",
        "Gray barfi silk": "Silk",
        "Red barfi silk": "Silk",
        "Moss crepe": "Moss Crepe",
        "Sea green moss crepe": "Moss Crepe",
        "Royal blue moss crepe": "Moss Crepe",
        "Black moss crepe": "Moss Crepe",
        "Gray moss crepe": "Moss Crepe",
        "Teal Moss crepe": "Moss Crepe",
        "Maroon heather moss crepe": "Moss Crepe",
        Telsa: "Lycra",
        Lycra: "Lycra",
        "Telsa Lycra": "Lycra",
        Rayon: "Rayon",
        Reyon: "Rayon",
        "Crinkle Rayon": "Rayon",
        "Rayon Twill": "Rayon",
        "Geometric printed Rayon": "Rayon",
        "Printed Rayon": "Rayon",
        Jersey: "Jersey",
        "Cotton Slub": "Cotton",
        "Cotton slub": "Cotton",
        Cotton: "Cotton",
        "Printed Cotton": "Cotton",
        "Blue-White floral cotton": "Cotton",
        "White & black border printed cotton": "Cotton",
        Velvet: "Velvet",
        Velvit: "Velvet",
        Fleece: "Fleece",
        "Anti-Piling Fleece": "Fleece",
        "Wine Anti-Pilling Fleece": "Fleece",
        "Sherpa Fleece": "Fleece",
        Wool: "Wool",
        "Black plaid wool": "Wool",
        "Brown plaid wool": "Wool",
        "Black Nep wool": "Wool",
        "Black and white houndstooth wool": "Wool",
        Suede: "Suede",
        "Rabbit fur": "Fur",
        "Couture soft": "Suede",
        Net: "Net",
        "Net Fabric": "Net",
        Sequins: "Sequin",
        "Poly Crepe": "Poly Silk",
        "Poly Silk": "Poly Silk",
        Poplin: "Poplin",
        Chambray: "Chambray",
        Twill: "Twill",
        Chiffon: "Chiffon",
        Rib: "Rib",
      };

      // Update product fabric
      if (fabricMapping[product.fabric]) {
        product.fabric = fabricMapping[product.fabric];
      }
      // Season mapping
      const seasonMapping = {
        "Summer,Spring": "Spring/Summer",
        "Summer, Spring": "Spring/Summer",
        Summer: "Summer",
        Fall: "Winter",
        fall: "Winter",
        Spring: "Spring",
        "Winter, Fall": "Winter",
        Winter: "Winter",
        "Spring, Fall": "Spring",
        "Autum/ Fall": "Autumn",
        "Summer, Fall": "Summer",
        "Summer, Spring, Fall": "Spring/Summer",
        "Summer, Winter, Fall": "Autumn/Winter",
        "Summer, Winter, Spring, Fall": "Spring/Summer",
      };

      // Update product season
      if (seasonMapping[product.season]) {
        product.season = seasonMapping[product.season];
      }

      // Pattern mapping
      const patternMapping = {
        Solid: "Solid/Plain",
        "Solid,": "Solid/Plain",
        solid: "Solid/Plain",
        "Solid, Floral": "Solid/Plain",
        "Solid, Stripe": "Solid/Plain",
        "Solid, Pastels": "Solid/Plain",
        "Solid, Pastels, Floral": "Solid/Plain",
        "Solid, Brocade": "Solid/Plain",
        "Solid, printed": "Solid/Plain",
        "Solid, Check": "Solid/Plain",
        "Solid, Heart": "Solid/Plain",
        "Solid, Abstract": "Solid/Plain",
        "Solid, Paisley": "Solid/Plain",
        "Solid, Geometric": "Solid/Plain",
        "Solid/Plain, Floral": "Solid/Plain, Floral",
        "Solid/Plain, Stripes": "Solid/Plain, Floral",
        "Solid/Plain, Abstract": "Solid/Plain, Floral",
        "Animal, Floral": "Animal Print",
        "Animal, Pastels": "Animal Print",
        "Animal, Leopard": "Animal Print",
        "Solid, Animal, Leopard": "Animal Print",
        "Tie & dye": "Tie & Dye",
        "tie & dye": "Tie & Dye",
        "Tie & Dye": "Tie & Dye",
        Polka: "Polka Dots",
        "Polka Dots": "Polka Dots",
        Tropical: "Nature",
        Nature: "Nature",
        "Tropical, Stripe": "Nature",
        Abstract: "Abstract",
        "Abstract, Pastels": "Abstract",
        "Abstract, Tropical": "Abstract",
        Geometric: "Geometric",
        "Geometric, Pastels": "Geometric",
        "Geometric, Polka": "Geometric",
        Zebra: "Animal Print",
        "Animal Print": "Animal Print",
        "Solid, Zebra": "Animal Print",
        "Marbel print": "Printed",
        Printed: "Printed",
        "Hounds tooth": "Printed",
        Camouflage: "Printed",
        "Panel print": "Printed",
        Check: "Printed",
        "Check, Plaid": "Printed",
        "Swiss dott": "Printed",
        "Border print": "Printed",
        "Pastels, Printed": "Printed",
        "Pastels, Polka": "Printed",
        Pastels: "Printed",
        Plaid: "Printed",
        Embroidered: "Embroidered",
        "multi dot print":"Polka Dots",
        cow: "Animal Print",
        "Pastels, Swiss-dot": "Textured",
        "Swiss-dot": "Textured",
        COLORBLOCK: "Colorblock",
        Stripe: "Stripes",
      };

      // Update product pattern if a match exists
      product.pattern = patternMapping[product.pattern] || product.pattern;

      // Occasion mapping
      const occasionMapping = {
        "Evening, Party, Festival": "Evening Wear",
        "Evening, Party, Casual, Festival": "Evening Wear",
        "Evening, Party, Casual, Festival, Night": "Evening Wear",
        "Evening, Party, Casual, Office, Daily, Festival, Night":
          "Evening Wear",
        "Evening, Festival, Party": "Evening Wear",
        "Evening, Party, Festival, Smart Casual": "Evening Wear",
        "Party, Festival": "Evening Wear",
        "Festival, Party": "Evening Wear",
        "Casual, Daily, Day, Smart Casual": "Casual",
        "Evening, Casual, Beach, Smart Casual": "Evening Wear",

        Festival: "Festive Wear",
        "Casual, Festival": "Festive Wear",
        "Casual, Festival, Smart Casual": "Festive Wear",
        "Casual, Festival, Day, Smart Casual": "Festive Wear",
        "Casual, Festival, Smart Casual, Active": "Festive Wear",

        "Evening, Party, Casual, Night": "Casual",
        "Casual, Daily, Day, Smart Casual, Active": "Casual",
        "Casual, Daily, Beach, Smart Casual": "Casual",
        "Casual, Daily, Night, Day, Smart Casual, Active": "Casual",
        "Casual, Daily, Smart Casual, Active": "Casual",
        "Casual, Daily, Smart Casual": "Casual",
        "Casual, Daily, Night": "Casual",
        "Casual, Office, Daily": "Casual",
        "Casual, Office, Daily, Smart Casual": "Casual",
        "Casual, Smart Casual, Active": "Casual",
        "Casual, Daily, Beach": "Casual",
        "Casual, Formal, Day": "Casual",
        "Casual, Daily": "Casual",
        "Casual, Formal, Semi Formal": "Casual",
        "Casual, Day, Smart Casual, Active": "Casual",
        "Casual, Day, Smart Casual": "Casual",
        "Casual, Formal, Daily, Beach": "Casual",
        "Casual, Formal, Semi Formal, Daily, Day, Smart Casual": "Casual",
        "Casual, Formal, Semi Formal, Daily, Beach": "Casual",
        "Casual, Formal": "Casual",
        "Casual, Semi Formal, Daily, Day, Smart Casual": "Casual",
        "Casual, Office, Smart Casual": "Casual",
        "Casual, Office": "Casual",
        "Casual, Office, Beach": "Casual",
        "Casual, Beach": "Casual",
        "Casual, Office, Day": "Casual",
        "Casual, Office, Active": "Casual",

        "Evening, Festival, Night, Day, Smart Casual": "Evening Wear",
        "Evening, Festival, Smart Casual, Active": "Evening Wear",
        "Evening, Casual, Smart Casual, Active, Outerwear": "Evening Wear",
        "Evening, Smart Casual": "Evening Wear",
        "Evening, Festival, Night, Smart Casual, Active": "Evening Wear",
        "Evening, Party, Smart Casual, Night": "Evening Wear",
        "Evening, Festival, Night": "Evening Wear",

        "Semi Formal": "Semi Formal",
        "Semi Formal, Smart Casual": "Semi Formal",
        "Semi Formal, Office, Smart Casual": "Semi Formal",
        "Semi Formal, Office, Daily": "Semi Formal",
        "Semi Formal, Office, Night, Smart Casual": "Semi Formal",

        Active: "Sporty",
        Evening: "Evening Wear",
      };

      // Update product occasion if a match exists
      product.occasion = occasionMapping[product.occasion] || product.occasion;

      return {
        "Vendor SKU Code": `${product.style_number}-${product.color}-${mappedSize}`, // Use mapped size
        Gender: "Women",
        "Brand Name": "Qurvii",
        "Style Code": product.style_number || "",
        "Product Name": product.style_name || "",
        Description: product.description || "",
        Price: product.mrp || "",
        Color: product.color || "",
        "Country of Origin": "India",
        "Manufacturer Name": "Qurvii",
        "Manufacturer Address": "B-149, Sector 6, Noida, UP 201301, India",
        
        
        
        "Ean Codes": product.ean_codes || "",
        "brand size": mappedSize, // Use mapped size here
        "Design Code": product.design_code || "",
        "Multipack Set": "Single",
        Occasion: product.occasion || "Update",
        Season: product.season || "Update",
        "Care Instruction": product.care_instruction || "Update",
        "Ships In": 2,
        "HSN Codes": product.hsn_codes || "62044490",
        "Pack Contains": `1 ${product.style_type}` || "",
        "Net Qty": 1,
        Material: product.fabric || "",
        "Style Bucket": "Fashion",
        "Dresses Type": product.dresses_type || "",
        Disclaimer:
          "Qurvii styles specially for curvy women of all sizes. Your size in our brand might be different from the other brands. Please check our size chart before ordering",
        "Character Shop": product.character_shop || "",
        Neckline: product.neckline || "",
        "Responsibility Criteria": product.responsibility_criteria || "",
        Pattern: product.pattern || "",
        "Collections Function": product.collections_function || "",
        "Pocket Description": product.pocket_description || "",
        Closure: product.closure || "",
        Fit: product.fit || "",
        "Model details": "Model is 5ft 9in tall and is wearing size XS",
        "Sleeve length Type": sleevType ||"Sleeveless",
        Age: "",
        "Bust For Body": sizeData[size]?.[1] ?? "",
        "Chest For Body": sizeData[size]?.[2] ?? "",
        "Waist For Body": sizeData[size]?.[5] ?? "",
        "Hip For Body": sizeData[size]?.[6] ?? "",
        "Bust for Garment": sizeData[size]?.[1] ?? "",
        "Chest for Garment": sizeData[size]?.[2] ?? "",
        "Waist for Garment": sizeData[size]?.[5] ?? "",
        "Hip for Garment": sizeData[size]?.[6] ?? "",
        "Shoulder for Garment": sizeData[size]?.[0] ?? "",
        "Sleeve Length": product.sleeve_length || 0,
        "Shoulder For Body": sizeData[size]?.[0] ?? "",
        "Length For Body": sizeData[size]?.[3] ?? "",
      };
    })
  );

    // LocalStorage me data save karna
    // localStorage.setItem("nykaaListingData", JSON.stringify(csvData));
  
    // console.log("Nykaa listing data saved to localStorage!");

    // alert("Product Added to listing files")
 

  const csv = Papa.unparse({
    fields: csvHeaders,
    data: csvData,
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Nykaa_Dress_listing.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export { generateNykaaDressListing };
