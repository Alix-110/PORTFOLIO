const elements = [
  {number:1,symbol:"H",name:"Hydrogen",type:"nonmetal",group:1,period:1},
  {number:2,symbol:"He",name:"Helium",type:"noble-gas",group:18,period:1},
  {number:3,symbol:"Li",name:"Lithium",type:"alkali",group:1,period:2},
  {number:4,symbol:"Be",name:"Beryllium",type:"alkaline-earth",group:2,period:2},
  {number:5,symbol:"B",name:"Boron",type:"metalloid",group:13,period:2},
  {number:6,symbol:"C",name:"Carbon",type:"nonmetal",group:14,period:2},
  {number:7,symbol:"N",name:"Nitrogen",type:"nonmetal",group:15,period:2},
  {number:8,symbol:"O",name:"Oxygen",type:"nonmetal",group:16,period:2},
  {number:9,symbol:"F",name:"Fluorine",type:"halogen",group:17,period:2},
  {number:10,symbol:"Ne",name:"Neon",type:"noble-gas",group:18,period:2},
  {number:11,symbol:"Na",name:"Sodium",type:"alkali",group:1,period:3},
  {number:12,symbol:"Mg",name:"Magnesium",type:"alkaline-earth",group:2,period:3},
  {number:13,symbol:"Al",name:"Aluminium",type:"transition",group:13,period:3},
  {number:14,symbol:"Si",name:"Silicon",type:"metalloid",group:14,period:3},
  {number:15,symbol:"P",name:"Phosphorus",type:"nonmetal",group:15,period:3},
  {number:16,symbol:"S",name:"Sulfur",type:"nonmetal",group:16,period:3},
  {number:17,symbol:"Cl",name:"Chlorine",type:"halogen",group:17,period:3},
  {number:18,symbol:"Ar",name:"Argon",type:"noble-gas",group:18,period:3},
  {number:19,symbol:"K",name:"Potassium",type:"alkali",group:1,period:4},
  {number:20,symbol:"Ca",name:"Calcium",type:"alkaline-earth",group:2,period:4},
  {number:21,symbol:"Sc",name:"Scandium",type:"transition",group:3,period:4},
  {number:22,symbol:"Ti",name:"Titanium",type:"transition",group:4,period:4},
  {number:23,symbol:"V",name:"Vanadium",type:"transition",group:5,period:4},
  {number:24,symbol:"Cr",name:"Chromium",type:"transition",group:6,period:4},
  {number:25,symbol:"Mn",name:"Manganese",type:"transition",group:7,period:4},
  {number:26,symbol:"Fe",name:"Iron",type:"transition",group:8,period:4},
  {number:27,symbol:"Co",name:"Cobalt",type:"transition",group:9,period:4},
  {number:28,symbol:"Ni",name:"Nickel",type:"transition",group:10,period:4},
  {number:29,symbol:"Cu",name:"Copper",type:"transition",group:11,period:4},
  {number:30,symbol:"Zn",name:"Zinc",type:"transition",group:12,period:4},
  {number:31,symbol:"Ga",name:"Gallium",type:"transition",group:13,period:4},
  {number:32,symbol:"Ge",name:"Germanium",type:"metalloid",group:14,period:4},
  {number:33,symbol:"As",name:"Arsenic",type:"metalloid",group:15,period:4},
  {number:34,symbol:"Se",name:"Selenium",type:"nonmetal",group:16,period:4},
  {number:35,symbol:"Br",name:"Bromine",type:"halogen",group:17,period:4},
  {number:36,symbol:"Kr",name:"Krypton",type:"noble-gas",group:18,period:4},
  {number:37,symbol:"Rb",name:"Rubidium",type:"alkali",group:1,period:5},
  {number:38,symbol:"Sr",name:"Strontium",type:"alkaline-earth",group:2,period:5},
  {number:39,symbol:"Y",name:"Yttrium",type:"transition",group:3,period:5},
  {number:40,symbol:"Zr",name:"Zirconium",type:"transition",group:4,period:5},
  {number:41,symbol:"Nb",name:"Niobium",type:"transition",group:5,period:5},
  {number:42,symbol:"Mo",name:"Molybdenum",type:"transition",group:6,period:5},
  {number:43,symbol:"Tc",name:"Technetium",type:"transition",group:7,period:5},
  {number:44,symbol:"Ru",name:"Ruthenium",type:"transition",group:8,period:5},
  {number:45,symbol:"Rh",name:"Rhodium",type:"transition",group:9,period:5},
  {number:46,symbol:"Pd",name:"Palladium",type:"transition",group:10,period:5},
  {number:47,symbol:"Ag",name:"Silver",type:"transition",group:11,period:5},
  {number:48,symbol:"Cd",name:"Cadmium",type:"transition",group:12,period:5},
  {number:49,symbol:"In",name:"Indium",type:"transition",group:13,period:5},
  {number:50,symbol:"Sn",name:"Tin",type:"transition",group:14,period:5},
  {number:51,symbol:"Sb",name:"Antimony",type:"metalloid",group:15,period:5},
  {number:52,symbol:"Te",name:"Tellurium",type:"metalloid",group:16,period:5},
  {number:53,symbol:"I",name:"Iodine",type:"halogen",group:17,period:5},
  {number:54,symbol:"Xe",name:"Xenon",type:"noble-gas",group:18,period:5},
  {number:55,symbol:"Cs",name:"Cesium",type:"alkali",group:1,period:6},
  {number:56,symbol:"Ba",name:"Barium",type:"alkaline-earth",group:2,period:6},
  {number:57,symbol:"La",name:"Lanthanum",type:"lanthanide",group:3,period:6},
  {number:58,symbol:"Ce",name:"Cerium",type:"lanthanide",group:3,period:6},
  {number:59,symbol:"Pr",name:"Praseodymium",type:"lanthanide",group:3,period:6},
  {number:60,symbol:"Nd",name:"Neodymium",type:"lanthanide",group:3,period:6},
  {number:61,symbol:"Pm",name:"Promethium",type:"lanthanide",group:3,period:6},
  {number:62,symbol:"Sm",name:"Samarium",type:"lanthanide",group:3,period:6},
  {number:63,symbol:"Eu",name:"Europium",type:"lanthanide",group:3,period:6},
  {number:64,symbol:"Gd",name:"Gadolinium",type:"lanthanide",group:3,period:6},
  {number:65,symbol:"Tb",name:"Terbium",type:"lanthanide",group:3,period:6},
  {number:66,symbol:"Dy",name:"Dysprosium",type:"lanthanide",group:3,period:6},
  {number:67,symbol:"Ho",name:"Holmium",type:"lanthanide",group:3,period:6},
  {number:68,symbol:"Er",name:"Erbium",type:"lanthanide",group:3,period:6},
  {number:69,symbol:"Tm",name:"Thulium",type:"lanthanide",group:3,period:6},
  {number:70,symbol:"Yb",name:"Ytterbium",type:"lanthanide",group:3,period:6},
  {number:71,symbol:"Lu",name:"Lutetium",type:"lanthanide",group:3,period:6},
  {number:72,symbol:"Hf",name:"Hafnium",type:"transition",group:4,period:6},
  {number:73,symbol:"Ta",name:"Tantalum",type:"transition",group:5,period:6},
  {number:74,symbol:"W",name:"Tungsten",type:"transition",group:6,period:6},
  {number:75,symbol:"Re",name:"Rhenium",type:"transition",group:7,period:6},
  {number:76,symbol:"Os",name:"Osmium",type:"transition",group:8,period:6},
  {number:77,symbol:"Ir",name:"Iridium",type:"transition",group:9,period:6},
  {number:78,symbol:"Pt",name:"Platinum",type:"transition",group:10,period:6},
  {number:79,symbol:"Au",name:"Gold",type:"transition",group:11,period:6},
  {number:80,symbol:"Hg",name:"Mercury",type:"transition",group:12,period:6},
  {number:81,symbol:"Tl",name:"Thallium",type:"transition",group:13,period:6},
  {number:82,symbol:"Pb",name:"Lead",type:"transition",group:14,period:6},
  {number:83,symbol:"Bi",name:"Bismuth",type:"metal",group:15,period:6},
  {number:84,symbol:"Po",name:"Polonium",type:"metalloid",group:16,period:6},
  {number:85,symbol:"At",name:"Astatine",type:"halogen",group:17,period:6},
  {number:86,symbol:"Rn",name:"Radon",type:"noble-gas",group:18,period:6},
  {number:87,symbol:"Fr",name:"Francium",type:"alkali",group:1,period:7},
  {number:88,symbol:"Ra",name:"Radium",type:"alkaline-earth",group:2,period:7},
  {number:89,symbol:"Ac",name:"Actinium",type:"actinide",group:3,period:7},
  {number:90,symbol:"Th",name:"Thorium",type:"actinide",group:3,period:7},
  {number:91,symbol:"Pa",name:"Protactinium",type:"actinide",group:3,period:7},
  {number:92,symbol:"U",name:"Uranium",type:"actinide",group:3,period:7},
  {number:93,symbol:"Np",name:"Neptunium",type:"actinide",group:3,period:7},
  {number:94,symbol:"Pu",name:"Plutonium",type:"actinide",group:3,period:7},
  {number:95,symbol:"Am",name:"Americium",type:"actinide",group:3,period:7},
  {number:96,symbol:"Cm",name:"Curium",type:"actinide",group:3,period:7},
  {number:97,symbol:"Bk",name:"Berkelium",type:"actinide",group:3,period:7},
  {number:98,symbol:"Cf",name:"Californium",type:"actinide",group:3,period:7},
  {number:99,symbol:"Es",name:"Einsteinium",type:"actinide",group:3,period:7},
  {number:100,symbol:"Fm",name:"Fermium",type:"actinide",group:3,period:7},
  {number:101,symbol:"Md",name:"Mendelevium",type:"actinide",group:3,period:7},
  {number:102,symbol:"No",name:"Nobelium",type:"actinide",group:3,period:7},
  {number:103,symbol:"Lr",name:"Lawrencium",type:"actinide",group:3,period:7},
  {number:104,symbol:"Rf",name:"Rutherfordium",type:"transition",group:4,period:7},
  {number:105,symbol:"Db",name:"Dubnium",type:"transition",group:5,period:7},
  {number:106,symbol:"Sg",name:"Seaborgium",type:"transition",group:6,period:7},
  {number:107,symbol:"Bh",name:"Bohrium",type:"transition",group:7,period:7},
  {number:108,symbol:"Hs",name:"Hassium",type:"transition",group:8,period:7},
  {number:109,symbol:"Mt",name:"Meitnerium",type:"transition",group:9,period:7},
  {number:110,symbol:"Ds",name:"Darmstadtium",type:"transition",group:10,period:7},
  {number:111,symbol:"Rg",name:"Roentgenium",type:"transition",group:11,period:7},
  {number:112,symbol:"Cn",name:"Copernicium",type:"transition",group:12,period:7},
  {number:113,symbol:"Nh",name:"Nihonium",type:"transition",group:13,period:7},
  {number:114,symbol:"Fl",name:"Flerovium",type:"transition",group:14,period:7},
  {number:115,symbol:"Mc",name:"Moscovium",type:"metal",group:15,period:7},
  {number:116,symbol:"Lv",name:"Livermorium",type:"metal",group:16,period:7},
  {number:117,symbol:"Ts",name:"Tennessine",type:"halogen",group:17,period:7},
  {number:118,symbol:"Og",name:"Oganesson",type:"noble-gas",group:18,period:7}
];


const table = document.getElementById("periodicTable");
const tooltip = document.getElementById("tooltip");

const totalCols = 18;
const totalRows = 9;
const grid = Array.from({length: totalRows*totalCols}, () => null);

// Place normal elements (period 1-7, except lanthanides/actinides)
elements.forEach(el => {
    if(el.type !== "lanthanide" && el.type !== "actinide") {
        const row = el.period - 1;
        const col = el.group - 1;
        grid[row*totalCols + col] = el;
    }
});

// Render main grid
grid.forEach(cell => {
    const div = document.createElement("div");
    if(cell){
        div.classList.add("element", cell.type);
        div.innerHTML = `<div class="number">${cell.number}</div>
                         <div class="symbol">${cell.symbol}</div>
                         <div class="name">${cell.name}</div>`;
        div.addEventListener("mouseenter",(e)=>{
            tooltip.style.display = "block";
            tooltip.innerHTML = `<strong>${cell.name}</strong><br>Atomic Number: ${cell.number}<br>Type: ${cell.type}`;
        });
        div.addEventListener("mousemove",(e)=>{
            tooltip.style.left = e.pageX + 15 + "px";
            tooltip.style.top = e.pageY + 15 + "px";
        });
        div.addEventListener("mouseleave",()=>{
            tooltip.style.display = "none";
        });
    }
    table.appendChild(div);
});

// Create separate row for lanthanides
const lanRow = document.createElement("div");
lanRow.classList.add("lanthanide-row");
elements.filter(e=>e.type==="lanthanide").forEach(el=>{
    const div = document.createElement("div");
    div.classList.add("element", el.type);
    div.innerHTML = `<div class="number">${el.number}</div>
                     <div class="symbol">${el.symbol}</div>
                     <div class="name">${el.name}</div>`;
    div.addEventListener("mouseenter",(e)=>{
        tooltip.style.display = "block";
        tooltip.innerHTML = `<strong>${el.name}</strong><br>Atomic Number: ${el.number}<br>Type: ${el.type}`;
    });
    div.addEventListener("mousemove",(e)=>{
        tooltip.style.left = e.pageX + 15 + "px";
        tooltip.style.top = e.pageY + 15 + "px";
    });
    div.addEventListener("mouseleave",()=>{
        tooltip.style.display = "none";
    });
    lanRow.appendChild(div);
});
table.appendChild(lanRow);

// Create separate row for actinides
const actRow = document.createElement("div");
actRow.classList.add("actinide-row");
elements.filter(e=>e.type==="actinide").forEach(el=>{
    const div = document.createElement("div");
    div.classList.add("element", el.type);
    div.innerHTML = `<div class="number">${el.number}</div>
                     <div class="symbol">${el.symbol}</div>
                     <div class="name">${el.name}</div>`;
    div.addEventListener("mouseenter",(e)=>{
        tooltip.style.display = "block";
        tooltip.innerHTML = `<strong>${el.name}</strong><br>Atomic Number: ${el.number}<br>Type: ${el.type}`;
    });
    div.addEventListener("mousemove",(e)=>{
        tooltip.style.left = e.pageX + 15 + "px";
        tooltip.style.top = e.pageY + 15 + "px";
    });
    div.addEventListener("mouseleave",()=>{
        tooltip.style.display = "none";
    });
    actRow.appendChild(div);
});
table.appendChild(actRow);


