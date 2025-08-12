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

// Across Shoulder 0
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


// Bust 1
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

// Chest 2
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




// Waist 3
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

// Hips 4
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

// Myntra dropdown color 
const Prominent_Colour = ["Red", "Blue", "Green", "Black", "Purple", "White", "Pink", "Grey", "Brown", "Yellow", "Orange", "Navy Blue", "Maroon", "Cream", "Silver", "Gold", "Tan", "Beige", "Peach", "Multi", "Copper", "Steel", "Olive", "Khaki", "Rose", "Taupe", "Off White", "Metallic", "Charcol", "Grey Melange", "Turquoise Blue", "Coffee Brown", "Sea Green", "Lavender", "Lime Green", "Magenta", "Burgundy", "Teal", "Nude", "Bronze", "Fluorescent Green", "Rust", "Mustard", "NA", "Mauve", "Coral", "Rose Gold", "Assorted", "Champagne", "Fuchsia", "Violet", "Camel Brown", "Transparent"];
const Fabric_Dresses = ["Cotton", "Other", "Polyester", "Nylon", "Viscose Rayon", "Synthetic", "Cashmere", "Linen", "Silk", "Wool", "Linen Blend", "Tencel", "Acrylic", "Modal", "Ramie", "Leather", "Bemberg", "Khadi", "Pure Wool", "Wool Blend", "Liva", "Brasso", "Jacquard", "Livaeco", "Polyester PU Coated", "Georgette", "Organic Cotton", "Bamboo", "Poly Silk"];
const Fabric_Type_Dresses = ["Chiffon", "Georgette", "Denim", "Net", "Lace", "Crepe", "Satin", "Jacquard", "Cotton", "Linen", "Knitted", "Velvet", "NA", "Scuba", "Liva", "Dobby", "Corduroy", "Cotton Cambric", "Chambray", "Schiffli"];
const Occasion_Values = ["Casual", "Formal", "Party", "Maternity", "Sports"];
const Neckline_Values = [
    "V-Neck",
    "Round Neck",
    "Boat Neck",
    "Halter Neck",
    "Off-Shoulder",
    "Strapless",
    "Square Neck",
    "Shirt Collar",
    "Mock Neck",
    "One Shoulder",
    "Cowl Neck",
    "Mandarin Collar",
    "Scoop Neck",
    "Peter Pan Collar",
    "Sweetheart Neck",
    "Tie-Up Neck",
    "Shoulder Straps",
    "Keyhole Neck",
    "Choker Neck",
    "Hood",
    "Asymmetric Neck",
    "Above the Keyboard Collar",
    "High Neck",
    "Plunge Neck",
    "Scarf Neck"
];

const Patterns_Values = [
    "Checked",
    "Solid",
    "Striped",
    "Printed",
    "Embroidered",
    "Self Design",
    "Embellished",
    "Colourblocked",
    "Dyed"
];

const Closure_Values = ["Zip", "Concealed Zip", "Button", "Hook and Eye", "NA"];
const Sleeve_Length_Values = ["Long Sleeves", "Short Sleeves", "Sleeveless", "Three-Quarter Sleeves"];


const generateMyntraDressListingFile = (selectedData) => {
    console.log(selectedData)



    const csvHeaders = [
        "styleId",
        "styleGroupId",
        "vendorSkuCode",
        "vendorArticleNumber",
        "vendorArticleName",
        "brand",
        "Manufacturer Name and Address with Pincode",
        "Packer Name and Address with Pincode",
        "Importer Name and Address with Pincode",
        "Country Of Origin",
        "Country Of Origin2",
        "Country Of Origin3",
        "Country Of Origin4",
        "Country Of Origin5",
        "articleType",
        "Brand Size",
        "Standard Size",
        "is Standard Size present on Label",
        "Brand Colour (Remarks)",
        "GTIN",
        "HSN",
        "SKUCode",
        "MRP",
        "AgeGroup",
        "Prominent Colour",
        "Second Prominent Colour",
        "Third Prominent Colour",
        "FashionType",
        "Usage",
        "Year",
        "season",
        "Product Details",
        "styleNote",
        "materialCareDescription",
        "sizeAndFitDescription",
        "productDisplayName",
        "tags",
        "addedDate",
        "Color Variant GroupId",
        "Fabric",
        "Occasion",
        "Shape",
        "Neck",
        "Pattern",
        "Fabric 2",
        "Fabric 3",
        "Length",
        "Sleeve Length",
        "Knit or Woven",
        "Hemline",
        "Print or Pattern Type",
        "Surface Styling",
        "Body Shape ID",
        "Main Trend",
        "Sleeve Styling",
        "Transparency",
        "Fabric Type",
        "Lining",
        "Wash Care",
        "Body or Garment Size",
        "Closure",
        "Add-Ons",
        "Stitch",
        "Character",
        "Sustainable",
        "Number of Pockets",
        "Multipack Set",
        "Number of Items",
        "Net Quantity Unit",
        "Theme",
        "Contact Brand or Retailer for pre-sales product queries",
        "Where-to-wear",
        "Style Tip",
        "Care for me",
        "Collection Name",
        "Package Contains",
        "BIS Expiry Date",
        "BIS Certificate Image URL",
        "BIS Certificate Number",
        "Net Quantity",
        "Bust ( Inches )",
        "Chest ( Inches )",
        "Front Length ( Inches )",
        "Hips ( Inches )",
        "Waist ( Inches )",
        "Across Shoulder ( Inches )",
        "Sleeve-Length ( Inches )",
        "To Fit Bust ( Inches )",
        "To Fit Hip ( Inches )",
        "To Fit Waist ( Inches )",
        "Front Image",
        "Side Image",
        "Back Image",
        "Detail Angle",
        "Look Shot Image",
        "Additional Image 1",
        "Additional Image 2"
    ];

    const sizeMapping = {
        XXS: "XXS",
        XS: "XS",
        S: "S",
        M: "M",
        L: "L",
        XL: "1XL",
        XXL: "2XL",
        XXXL: "3XL",
        XXXXL: "4XL",
        XXXXXL: "5XL",
    };

    try {

        const sizes = Object.keys(sizeMapping);
        const csvData = selectedData
            .filter((product) => product.style_type === "Dress" || product.style_type === "Kaftan" || product.style_type.toLowerCase().includes("shirt dress"))
            .flatMap((product) =>
                sizes.map((size) => {
                    const mappedSize = sizeMapping[size]; // Convert size to 2XL, 3XL, etc.


                    // color mapping start here 

                    let prominentColor = "";

                    for (let color of Prominent_Colour) {
                        if (color.trim().toLowerCase() === product.color.trim().toLowerCase()) {
                            prominentColor = color;
                            break;
                        } else {
                            if (product.color.trim().toLowerCase() === "gray") {
                                prominentColor = "Grey";
                                break;
                            } else if (product.color.trim().toLowerCase() === "lavender blush") {
                                prominentColor = "Lavender";
                                break;
                            } else if (product.color.trim().toLowerCase() === "turquoise") {
                                prominentColor = "Turquoise Blue";
                                break;
                            } else if (product.color.trim().toLowerCase() === "sky blue") {
                                prominentColor = "Blue";
                                break;
                            } else if (product.color.toLowerCase().includes("green")) {
                                prominentColor = "Green";
                                break;
                            } else if (product.color.trim().toLowerCase() === "neon yellow") {
                                prominentColor = "Yellow";
                                break;
                            } else if (product.color.trim().toLowerCase() === "ivory") {
                                prominentColor = "Off White";
                                break;
                            } else if (product.color.toLowerCase().includes("navy")) {
                                prominentColor = "Navy Blue";
                                break;
                            } else if (product.color.toLowerCase().includes("wine")) {
                                prominentColor = "Burgundy";
                                break;
                            } else if (product.color.toLowerCase().includes("royal blue")) {
                                prominentColor = "Blue";
                                break;
                            }

                            else {
                                prominentColor = "NA";
                            }
                        }
                    }

                    // ***************************// end of color mapping *********************

                    // ****************************** // Season mapping ****************************
                    let season = "";

                    if (product.season && product.season.toLowerCase().includes("summer")) {
                        season = "Summer";
                    } else if (product.season && product.season.toLowerCase().includes("winter")) {
                        season = "Winter";
                    } else if (product.season && product.season.toLowerCase().includes("spring")) {
                        season = "Spring";
                    } else if (product.season && product.season.toLowerCase().includes("fall")) {
                        season = "Fall";
                    }

                    //  ******************************** end of season mapping *****************************************

                    // **************************** start of fabric mapping ************************************

                    let mappedfabric = "";

                    for (let fabric of Fabric_Dresses) {
                        if (product.fabric.toLowerCase().trim() === product.fabric.toLowerCase().trim()) {
                            mappedfabric = fabric;
                            break;
                        }
                        else {

                            if (product.fabric.toLowerCase().trim().includes("crepe")
                                || product.fabric.toLowerCase().trim().includes("net")
                                || product.fabric.toLowerCase().trim().includes("chiffon")

                            ) {
                                mappedfabric = "Polyester";
                                break;
                            }
                            else {
                                mappedfabric = "Other";

                            }
                        }
                    }
                    // **************************** end of fabric mapping ************************************

                    // **************************** start of fabricType mapping ************************************

                    let mappedfabricType = "NA";
                    for (let fabricTypeDress of Fabric_Type_Dresses) {
                        if (product.fabric && product.fabric.trim().toLowerCase() === fabricTypeDress.toLowerCase()) {
                            mappedfabricType = fabricTypeDress;
                            break;
                        }
                    }

                    // **************************** end of fabricType mapping ************************************
                    // **************************** start of fabricType mapping ************************************
                    let mappedOccasion = "";
                    for (const occasion of Occasion_Values) {
                        if (product.occasion && product.occasion.toLowerCase().trim().includes(occasion.toLowerCase())) {
                            mappedOccasion = occasion
                            break;
                        }

                    }

                    // **************************** end of fabricType mapping ************************************
                    // **************************** start of neckline mapping ************************************

                    let mappedNeckline = "";
                    for (const neckline of Neckline_Values) {
                        if (product.neckline && product.neckline.toLowerCase().trim().includes(neckline.toLowerCase())) {
                            mappedNeckline = neckline;
                            break;
                        }
                        else if (product.neckline.toLowerCase().trim() === "classic shirt") {
                            mappedNeckline = "Shirt Collar";
                            break;
                        }
                        else if (product.neckline.toLowerCase().trim() === "spaghetti strap") {
                            mappedNeckline = "Shoulder Straps";
                            break;
                        }

                    }
                    // **************************** end of neckline mapping ************************************
                    // **************************** start of pattern mapping ************************************

                    let mappedPattern = "Self Design";
                    for (const pattern of Patterns_Values) {
                        if (product.pattern.toLowerCase().trim().includes(pattern.toLowerCase())) {
                            mappedPattern = pattern;
                            break;
                        }

                    }
                    // **************************** end of pattern mapping ************************************

                    // **************************** start of sleeve length mapping ************************************
                    // Mapping object
                    const sleeveMapping = {
                        "Full": "Long Sleeves",
                        "Three Quarter": "Three-Quarter Sleeves",
                        "Half": "Sleeveless",
                        "Short": "Short Sleeves",
                        "Quarter": "Three-Quarter Sleeves",
                        "Elbow Length": "Three-Quarter Sleeves",
                        "Sleeveless": "Sleeveless",
                        "Above Elbow Length": "Three-Quarter Sleeves",
                    };


                    // **************************** end of sleeve length mapping ************************************


                    // **************************** start of closure mapping ************************************

                    let mappedClosure = 'NA';
                    for (const closure of Closure_Values) {
                        if (product.closure.toLowerCase().trim().includes(closure.toLowerCase())) {
                            mappedClosure = closure;
                            break;
                        }
                        else if (product.closure.toLowerCase().trim() === "not applicable") {
                            mappedClosure = 'NA';
                            break;
                        }
                    }

                    // **************************** end of closure mapping ************************************
                    // **************************** start of wash care mapping ************************************
                    const WashCare_Values = ["Hank Wash", "Machine Wash", "Dry Clean"];
                    let mappedWashCare = "Machine Wash";
                    for (const washcare of WashCare_Values) {
                        if (product.care_instruction.toLowerCase().trim().includes(washcare.toLocaleLowerCase())) {
                            mappedWashCare = washcare;
                            break;
                        }
                    }
                    // Dynamic Front Length Calculation
                    const input = {
                        front_length: Number(product?.front_length),
                        Sleeve_Length_inches_XS: Number(product.sleeve_length)
                    }

                    function addFrontLengthValue(index) {
                        if (input?.front_length > 0) {
                            return input?.front_length + (index - 1) * 0.5;
                        } else {
                            return "";
                        }
                    }



                    const productData = {
                        "styleId": "",
                        "styleGroupId": "",
                        "vendorSkuCode": `${product.style_number}-${product.color}-${mappedSize}`,
                        "vendorArticleNumber": product.style_number || "",
                        "vendorArticleName": product.style_name || "",
                        "brand": "Qurvii",
                        "Manufacturer Name and Address with Pincode": "B-149, Sector 6, Noida, UP 201301, India",
                        "Packer Name and Address with Pincode": "B-149, Sector 6, Noida, UP 201301, India",
                        "Importer Name and Address with Pincode": "",
                        "Country Of Origin": "India",
                        "Country Of Origin2": "",
                        "Country Of Origin3": "",
                        "Country Of Origin4": "",
                        "Country Of Origin5": "",
                        "articleType": "Dresses",
                        "Brand Size": mappedSize,
                        "Standard Size": mappedSize === "1XL" ? "XL" : mappedSize === "2XL" ? "XXL" : mappedSize,
                        "is Standard Size present on Label": "Yes",
                        "Brand Colour (Remarks)": product.color || "",
                        "GTIN": "",
                        "HSN": "62114290",
                        "SKUCode": "",
                        "MRP": product.mrp || "",
                        "AgeGroup": "Adults-Women",
                        "Prominent Colour": prominentColor,
                        "Second Prominent Colour": "",
                        "Third Prominent Colour": "",
                        "FashionType": "Fashion",
                        "Usage": "",
                        "Year": new Date().getFullYear() || "",
                        "season": season,
                        "Product Details": product.description || "",
                        "styleNote": "",
                        "materialCareDescription": product.fabric || "",
                        "sizeAndFitDescription": "",
                        "productDisplayName": "",
                        "tags": "",
                        "addedDate": "",
                        "Color Variant GroupId": "",
                        "Fabric": mappedfabric,
                        "Occasion": mappedOccasion,
                        "Shape": "",
                        "Neck": mappedNeckline || "",
                        "Pattern": mappedPattern,
                        "Fabric 2": "",
                        "Fabric 3": "",
                        "Length": "",
                        "Sleeve Length": sleeveMapping[product.sleeve_length_type.trim()] || "",
                        "Knit or Woven": "Woven",
                        "Hemline": "",
                        "Print or Pattern Type": mappedPattern,
                        "Surface Styling": "",
                        "Body Shape ID": "",
                        "Main Trend": "",
                        "Sleeve Styling": "",
                        "Transparency": "Opaque",
                        "Fabric Type": mappedfabricType,
                        "Lining": product.lining?.toLowerCase().includes("without") ? "NA" : "Has a lining",
                        "Wash Care": mappedWashCare,
                        "Body or Garment Size": "Garment Measurements in",
                        "Closure": mappedClosure,
                        "Add-Ons": "NA",
                        "Stitch": "",
                        "Character": "",
                        "Sustainable": "",
                        "Number of Pockets": "NA",
                        "Multipack Set": "NA",
                        "Number of Items": 1,
                        "Net Quantity Unit": "Piece",
                        "Theme": "",
                        "Contact Brand or Retailer for pre-sales product queries": "",
                        "Where-to-wear": "",
                        "Style Tip": "",
                        "Care for me": "",
                        "Collection Name": "",
                        "Package Contains": "1 Dress",
                        "BIS Expiry Date": "",
                        "BIS Certificate Image URL": "",
                        "BIS Certificate Number": "",
                        "Net Quantity": 1,
                        "Bust ( Inches )": sizeData[size]?.[1] ?? "",
                        "Chest ( Inches )": sizeData[size]?.[2] ?? "",
                        "Front Length ( Inches )": addFrontLengthValue(sizes.indexOf(size)),
                        "Hips ( Inches )": sizeData[size]?.[4] ?? "",
                        "Waist ( Inches )": sizeData[size]?.[3] ?? "",
                        "Across Shoulder ( Inches )": sizeData[size]?.[0] ?? "",
                        "Sleeve-Length ( Inches )": "",
                        "To Fit Bust ( Inches )": "",
                        "To Fit Hip ( Inches )": "",
                        "To Fit Waist ( Inches )": "",
                        "Front Image": "",
                        "Side Image": "",
                        "Back Image": "",
                        "Detail Angle": "",
                        "Look Shot Image": "",
                        "Additional Image 1": "",
                        "Additional Image 2": ""
                    };
                    return productData
                })
            );

        const csv = Papa.unparse({
            fields: csvHeaders,
            data: csvData,
        });

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Myntra_Dress_listing.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (error) {
        console.log("Failed to download listing file", error);
    }
};

export { generateMyntraDressListingFile };
