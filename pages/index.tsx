import { useState } from "react";

const cars = [
  { make: "Audi", models: ["A5 B9 Coupe 2020", "S6 2020"] },
  { make: "Mercedes", models: ["C43 AMG", "S223"] },
  { make: "BMW", models: ["M5 2020", "340 2020"] },
];

const colors = ["Black", "White", "Silver", "Gray", "Blue", "Red"];

const wheels = [
  {
    id: 1,
    name: "Alutec R19 Black",
    brand: "Alutec",
    models: ["A5 B9 Coupe 2020"],
    image: "/alutec_black.jpg",
    preview: {
      Black: "/audi_a5_black.jpg",
      White: "/audi_a5_white.jpg",
    },
  },
  {
    id: 2,
    name: "AEZ R20 Silver",
    brand: "AEZ",
    models: ["M5 2020"],
    image: "/aez_silver.jpg",
    preview: {
      Silver: "/bmw_m5_silver.jpg",
      Gray: "/bmw_m5_gray.jpg",
    },
  },
];

export default function Home() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [preview, setPreview] = useState("");

  const handleSearch = () => {
    const result = wheels.filter(
      (w) => w.models.includes(model) && Object.keys(w.preview).includes(color)
    );
    setFiltered(result);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>DiskFit: Конфигуратор дисков</h1>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <select onChange={(e) => setMake(e.target.value)}>
          <option>Марка</option>
          {cars.map((c) => (
            <option key={c.make}>{c.make}</option>
          ))}
        </select>

        <select onChange={(e) => setModel(e.target.value)}>
          <option>Модель</option>
          {cars.find((c) => c.make === make)?.models.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        <select onChange={(e) => setColor(e.target.value)}>
          <option>Цвет кузова</option>
          {colors.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <button onClick={handleSearch}>Найти диски</button>
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        {filtered.map((w) => (
          <div
            key={w.id}
            onMouseEnter={() => setPreview(w.preview[color])}
            onMouseLeave={() => setPreview("")}
          >
            <img src={w.image} alt={w.name} width="160" />
            <div>{w.name}</div>
          </div>
        ))}
      </div>

      {preview && (
        <div style={{ marginTop: 40 }}>
          <h3>Превью на авто:</h3>
          <img src={preview} alt="preview" width="300" />
        </div>
      )}
    </div>
  );
}
