export type ProductCategory = "ac" | "dc";

export type ProductItem = {
  id: string;
  name: string;
  category: ProductCategory;
  image: string;
  glb?: string;
  specs: string[];
};

export const products: ProductItem[] = [
  {
    id: "single-ac-type2",
    name: "Single Output AC Type 2",
    category: "ac",
    image: "/images/charger_1.png",
    glb: "/models/single-ac-type2.glb",
    specs: [
      "3.3kW / 16A rating with OLED display",
      "Wi‑Fi / GSM, OCPP 1.6J, inbuilt metering",
      "Protection: over/under voltage & current, earth fault",
    ],
  },
  {
    id: "three-ac-type2",
    name: "Three Output AC Type 2",
    category: "ac",
    image: "/images/charger_2.png",
    glb: "/models/three-ac-type2.glb", 
    specs: [
      "Bharat AC — 3× 3.3kW; hybrid options with Type 2",
      "RFID, leakage & surge protection",
      "4‑line display, RGB status, remote connectivity",
    ],
  },
  {
    id: "single-dual-gun-ac",
    name: "Single / Dual Gun AC",
    category: "ac",
    image: "/images/charger_3.png",
    glb: "/models/single-dual-gun-ac.glb",
    specs: [
      "Single phase 7.4kW; three phase 11kW & 22kW",
      "Type 2 gun with 5m cable, RFID support",
      "Optional 4.3\" display in metal enclosure",
    ],
  },
  {
    id: "30kw-ccs-wallbox",
    name: "30kW CCS Single Gun Wallbox",
    category: "dc",
    image: "/images/charger_4.png",
    glb: "/models/30kw-ccs-wallbox.glb",
    specs: [
      "CCS gun with 5m cable, compact wallbox",
      "Up to ~95% efficiency, 7\" LCD, OCPP 1.6J",
      "Wall or pedestal mount with full protection suite",
    ],
  },
  {
    id: "ccs-dc-fast",
    name: "CCS Single / Dual Gun DC",
    category: "dc",
    image: "/images/charger_5.png",
    specs: [
      "60kW / 120kW / 240kW single or dual gun",
      "Floor‑mounted enclosure, Wi‑Fi / GSM",
      "Real‑time monitoring, metering, and diagnostics",
    ],
  },
  {
    id: "gbt-dual-dc",
    name: "GB/T Dual Gun DC",
    category: "dc",
    image: "/images/charger_6.png",
    glb: "/models/gbt-dual-dc.glb",
    specs: [
      "15+15kW dual gun configuration",
      "GB/T guns with 5m cables, 7\" display",
      "Robust outdoor enclosure with OCPP 1.6J",
    ],
  },
];

export const productOptions = products.map((p) => ({
  value: p.id,
  label: p.name,
}));
