import Papa from "papaparse";

const generateAjioPlazosAndPantsListing = (selectedData) => {
  const csvHeaders = [
    "Style Code",
    "Style Description",
    "Item SKU",
    "Brand",
    "EAN",
    "TD",
    "MRP",
    "HSN",
    "Product Groups",
    "Fashion Groups",
    "Season Code",
    "Season Year",
    "Size",
    "articleDimensionsUnitHeight",
    "articleDimensionsUnitLength",
    "articleDimensionsUnitWidth",
    "articleDimensionsUnitLengthUOM",
    "articleDimensionsUnitWeight",
    "articleDimensionsUnitWeightUOM",
    "packageDimensionsHeight",
    "packageDimensionsLength",
    "packageDimensionsWidth",
    "packageDimensionsLengthUOM",
    "packageDimensionsWeight",
    "packageDimensionsWeightUOM",
    "Additional Information 1",
    "Additional Information 2",
    "Additional Information 3",
    "Character",
    "Component Count",
    "Country of Origin",
    "Hidden Detail",
    "Highlight",
    "Imported By",
    "Manufactured By",
    "Marketed By",
    "Mood",
    "Sold By",
    "Multi Brick",
    "Multi Segment",
    "Multi Vertical",
    "Net Quantity",
    "Package Contains",
    "Size Tip",
    "USP",
    "Trend Theme",
    "Accent",
    "Color Family",
    "Color Shade",
    "Disclaimer",
    "Fabric Detail",
    "Fabric Type",
    "Pattern",
    "Primary Color",
    "Secondary Color",
    "Size Format",
    "Size Group",
    "Wash Care",
    "Care",
    "Size worn by Model",
    "Stock Type",
    "Fit Type",
    "IND_PT(ONLY FOR INTERNAL USE)",
    "Product Name",
    "Length",
    "Sport",
    "StandardSize",
    "Style Type",
    "Waist Rise",
    "Front Style",
    "Waist Type",
    "Stretch",
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
  const year = new Date().getFullYear();
  const csvData = selectedData.filter((product)=>product.style_type==="Pant" ||product.style_type==="Plazzo" || product.style_type==="Trouser"  )
  .flatMap((product) =>
    sizes.map((size) => {
      const mappedSize = sizeMapping[size]; // Convert size to 2XL, 3XL, etc.

      //   ******************************************** products mapping start from here *********************

      //    *********************** start of season code mapping *********************
      let season = "";

      if (product.season && product.season.trim() !== "") {
        // Check if season exists and is not empty
        const seasonLower = product.season.toLowerCase(); // Convert to lowercase for case-insensitive comparison

        if (seasonLower.includes("summer")) {
          season = "Summer";
        } else if (seasonLower.includes("winter")) {
          season = "Winter";
        } else if (seasonLower.includes("spring")) {
          season = "Spring";
        } else if (seasonLower.includes("fall")) {
          season = "Fall";
        }
      }

      //    *********************** end of season code mapping *********************

      //    *********************** start of color code mapping *********************
      let colorShade = "";

      if (product.color && product.color.trim() !== "") {
        colorShade =
          product.color.trim().toLowerCase() === "pastel" ? "Light" : "Dark";
      }

      // Color Family
      const colorFamily = new Set([
        "Aqua",
        "Beige",
        "Black",
        "Blue",
        "Bronze",
        "Brown",
        "Copper",
        "Cream",
        "Gold",
        "Green",
        "Grey",
        "Khaki",
        "Magenta",
        "Maroon",
        "Metallic",
        "Multi",
        "Mustard",
        "Navy",
        "Nude",
        "Olive",
        "Orange",
        "Peach",
        "Pink",
        "Purple",
        "Red",
        "Rust",
        "Silver",
        "Tan",
        "Teal",
        "White",
        "Yellow",
        "Clear",
        "Rose Gold",
        "Fuchsia",
        "Charcoal",
        "Coffee",
        "Grey Melange",
        "Lime",
        "Off White",
        "Turquoise",
        "Coral",
        "Burgundy",
        "Indigo",
        "Ecru",
        "Lavender",
        "Violet",
        "Wine",
        "Mauve",
        "Sea Green",
        "Taupe",
      ]);

      let prominentColor = "";

      if (product.color && product.color.trim() !== "") {
        const trimmedColor = product.color.trim();

        if (colorFamily.has(trimmedColor)) {
          prominentColor = trimmedColor;
        } else {
          // Mapping alternate color names to standard color family
          const colorMapping = {
            Gray: "Grey",
            "Lavender Blush": "Lavender",
            "Sky Blue": "Blue",
            "Mint Green": "Green",
            "Neon Yellow": "Yellow",
            Ivory: "Off White",
            "Royal Blue": "Blue",
          };

          prominentColor = colorMapping[trimmedColor] || "";
        }
      }

      //    *********************** end of color code mapping *********************

      //    *********************** start of fabric  mapping *********************
      const fabricList = new Set([
        "Acrylic",
        "Art Silk",
        "Banarasi",
        "Cambric",
        "Chanderi",
        "Chiffon",
        "Corduroy",
        "Cotton",
        "Crepe",
        "Denim",
        "Dobby",
        "Dupion",
        "Fleece",
        "Georgette",
        "Ikat",
        "Jacquard",
        "Kanjeevaram",
        "Leather",
        "Linen",
        "Modal",
        "Muslin",
        "Mysore Silk",
        "Net",
        "Nylon",
        "Organza",
        "Pashmina",
        "Polyester",
        "PU",
        "Raw Silk",
        "Rayon",
        "Satin",
        "Silk",
        "Synthetic",
        "Velvet",
        "Viscose",
        "Wool",
        "Bamboo",
        "Brocade",
        "Canvas",
        "Cashmere",
        "Chambray",
        "Flannel",
        "Flex",
        "Handloom",
        "Khadi",
        "Knit",
        "Kosa",
        "Lace",
        "Linen Blend",
        "Organic Cotton",
        "Others",
        "Phulkari",
        "Seersucker",
        "Terry",
        "Elastane",
      ]);

      let fabricType = "Others"; // Default value

      if (product.fabric && product.fabric.trim() !== "") {
        const trimmedFabric = product.fabric.trim();

        if (fabricList.has(trimmedFabric)) {
          fabricType = trimmedFabric;
        }
      }

      //    *********************** end of fabric  mapping *********************

      //    *********************** start of pattern   mapping *********************
      const patternList = new Set([
        "Solid",
        "Stripes",
        "Textured",
        "Tie & Dye",
        "Typographic",
        "Applique",
        "Self-design",
        "Abstract",
        "Animal",
        "Aztec",
        "Block Print",
        "Cartoon",
        "Chevrons",
        "Geometric",
        "Graphic",
        "Heathered",
        "Indian",
        "Leaf",
        "Micro Print",
        "Nailhead",
        "Novelty",
        "Numeric",
        "Paisley",
        "Quilted",
        "Reptilian",
        "Tropical",
        "Baroque",
        "Embroidery",
        "Holographic",
        "Monochrome",
        "Nautical",
        "Others",
        "Ribbed",
        "Ruffles",
        "Colourblock",
        "Crochet",
        "Patch-work",
        "Camouflage",
        "Checks",
        "Embellished",
        "Floral",
        "Lace",
        "Ombre-dyed",
        "Polka-dot",
        "Washed",
        "Tribal",
      ]);

      const patternMapping = {
        Ombre: "Ombre-dyed",
        Polka: "Polka-dot",
        Leopard: "Animal",
      };

      let prints = "Others"; // Default value

      if (product.pattern && product.pattern.trim() !== "") {
        const trimmedPattern = product.pattern.trim();

        // Check if pattern is in patternList
        for (const pattern of patternList) {
          if (trimmedPattern.toLowerCase().includes(pattern.toLowerCase())) {
            prints = pattern;
            break;
          }
        }

        // Check pattern mapping if not found in patternList
        if (prints === "Others") {
          prints = patternMapping[trimmedPattern] || "Others";
        }
      }

      //    *********************** start of pattern   mapping *********************

      //    *********************** start of sleeve length    mapping *********************
      const sleeveMapping = {
        Half: "Short sleeve",
        "Three Quarter": "3/4th sleeve",
        Full: "Full-length sleeve",
      };

      let sleeveKey =
        typeof product.sleeve_length_type === "string"
          ? product.sleeve_length_type.trim()
          : "";
      let sleeveLength = sleeveMapping[sleeveKey] || product.sleeve_length_type; // Default value for unmapped cases

      //    *********************** end of sleeve length    mapping *********************

      //    *********************** start of washcare length    mapping *********************
      const washCareMapping = {
        "Machine Wash": "Machine wash",
        "Dry Clean Only": "Dry clean",
        "Hand Wash": "Hand wash",
      };

      let washCareKey =
        typeof product.care_instruction === "string"
          ? product.care_instruction.trim()
          : "";
      let washCare = washCareMapping[washCareKey] || "Not Specified"; // Default if not mapped
      //    *********************** end of washcare length    mapping *********************

      // Fitting
      let fitting = "";
      const Fitting_List = new Set([
        "Relaxed Fit",
        "Slim Fit",
        "Boxy Fit",
        "Extra Slim Fit",
        "Fitted",
        "Loose Fit",
        "Maternity Fit",
        "Regular Fit",
        "Stylised Fit",
        "Tailored Fit",
      ]);

      if (product.fit && product.fit.trim() !== "") {
        for (const fit of Fitting_List) {
          if (fit.toLowerCase() === product.fit.trim().toLowerCase()) {
            fitting = fit;
            break;
          }
        }
      }

      // Neckline
      let neckline = "";
      const Neckline_List = new Set([
        "V",
        "Round",
        "Boat",
        "Square",
        "High",
        "Collar",
        "Scoop",
        "Off Shoulder",
        "Cowl",
      ]);

      if (product.neckline && product.neckline.trim() !== "") {
        for (const neckStyle of Neckline_List) {
          if (
            product.neckline.toLowerCase().includes(neckStyle.toLowerCase())
          ) {
            neckline = neckStyle;
            break;
          }
        }
      }

      return {
        "Style Code": product.style_number,
        "Style Description": product.description,
        "Item SKU": `${product.style_number}-${product.color}-${mappedSize}`,
        Brand: "Qurvii",
        EAN: `${product.style_number}${product.color}${mappedSize}`,
        TD: "0",
        MRP: product.mrp || 0,
        HSN: "62114290",
        "Product Groups": "Casual",
        "Fashion Groups": "Fashion",
        "Season Code": season || "",
        "Season Year": year,
        Size: mappedSize,
        articleDimensionsUnitHeight: 1,
        articleDimensionsUnitLength: 1,
        articleDimensionsUnitWidth: 1,
        articleDimensionsUnitLengthUOM: "CM",
        articleDimensionsUnitWeight: 200,
        articleDimensionsUnitWeightUOM: "GRAM",
        packageDimensionsHeight: 4,
        packageDimensionsLength: 30,
        packageDimensionsWidth: 17,
        packageDimensionsLengthUOM: "CM",
        packageDimensionsWeight: 300,
        packageDimensionsWeightUOM: "GRAM",
        "Additional Information 1":
          "Our clothes are specially designed for women with curves. Before placing an order, please refer to our Size Chart",
        "Additional Information 2": "",
        "Additional Information 3": "",
        Character: "",
        "Component Count": 1,
        "Country of Origin": "India",
        "Hidden Detail": "",
        Highlight: "",
        "Imported By":
          "Qurvii, B-149 2nd floor sector 6, Noida, Pincode 201301,Email -logistics@qurvii.com",
        "Manufactured By":
          "Qurvii, B-149 2nd floor sector 6, Noida, Pincode 201301,Email -logistics@qurvii.com",
        "Marketed By":
          "Qurvii, B-149 2nd floor sector 6, Noida, Pincode 201301,Email -logistics@qurvii.com",
        Mood: "",
        "Sold By": "",
        "Multi Brick": "",
        "Multi Segment": "Women",
        "Multi Vertical": "Western Wear",
        "Net Quantity": "1N",
        "Package Contains": `1 ${product.style_type}`,
        "Size Tip": "",
        USP: "",
        "Trend Theme": "",
        Accent: "",
        "Color Family": prominentColor || product.color,
        "Color Shade": colorShade || product.color,
        Disclaimer: "",
        "Fabric Detail": product.fabric || "",
        "Fabric Type": fabricType || "Others",
        Pattern: prints || "Others",
        "Primary Color": product.color || "",
        "Secondary Color": "",
        "Size Format": "IN",
        "Size Group": "Regular",
        "Wash Care": washCare || "not mapped",
        Care: "",
        "Size worn by Model": "",
        "Stock Type": "",
        "Fit Type": "",
        "IND_PT(ONLY FOR INTERNAL USE)": "",
        "Product Name": product.style_type || "",
        Length: "",
        Sport: "",
        StandardSize: mappedSize,
        "Style Type": "",
        "Waist Rise": "",
        "Front Style": "",
        "Waist Type": "",
        Stretch: "",
      };
    })
  );

  // Convert data to array format for `Papa.unparse`
  const csvRows = csvData.map((obj) =>
    csvHeaders.map((header) => obj[header] || "")
  );

  // Generate CSV
  const csv = Papa.unparse({
    fields: csvHeaders,
    data: csvRows,
  });

  // Create and download CSV file
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "ajio_plazo_and_trousers_listing.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default generateAjioPlazosAndPantsListing;
