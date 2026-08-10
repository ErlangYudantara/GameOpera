/* ==========================================================================
   FLEXBOX POND - LEVELS DATASET
   ========================================================================== */

export const LEVELS = [
  {
    id: 1,
    title: "Justify Content (Flex-End)",
    badge: "Dasar",
    instructions: "Pandu maskot Vetech ke tempat landing di sebelah kanan dengan menggunakan properti <code>justify-content</code>. Properti ini meratakan elemen secara horizontal.",
    hint: "Gunakan <code>justify-content: flex-end;</code> untuk menggeser elemen ke ujung kanan area.",
    suggestions: ["justify-content:", "flex-end", "flex-start", "center"],
    frogs: [{ id: "frog-1", color: "green" }],
    targetStyle: "justify-content: flex-end;",
    selector: "#pond",
    defaultCode: ""
  },
  {
    id: 2,
    title: "Justify Content (Center)",
    badge: "Dasar",
    instructions: "Gunakan <code>justify-content</code> untuk memindahkan maskot Vetech ke tengah area.",
    hint: "Gunakan nilai <code>center</code> pada <code>justify-content</code>.",
    suggestions: ["justify-content:", "center", "space-around", "flex-end"],
    frogs: [{ id: "frog-1", color: "green" }, { id: "frog-2", color: "yellow" }],
    targetStyle: "justify-content: center;",
    selector: "#pond",
    defaultCode: ""
  },
  {
    id: 3,
    title: "Justify Content (Space-Around)",
    badge: "Dasar",
    instructions: "Bantu ketiga maskot Vetech mendarat di posisi mereka masing-masing sehingga memiliki ruang yang sama di sekelilingnya.",
    hint: "Cobalah <code>justify-content: space-around;</code> untuk memberi jarak simetris.",
    suggestions: ["justify-content:", "space-around", "space-between", "center"],
    frogs: [{ id: "frog-1", color: "green" }, { id: "frog-2", color: "yellow" }, { id: "frog-3", color: "red" }],
    targetStyle: "justify-content: space-around;",
    selector: "#pond",
    defaultCode: ""
  },
  {
    id: 4,
    title: "Justify Content (Space-Between)",
    badge: "Dasar",
    instructions: "Sekarang pisahkan maskot agar posisi paling kiri dan paling kanan berada di tepi area.",
    hint: "Gunakan <code>justify-content: space-between;</code> agar jarak antar elemen sama dan menyentuh tepi.",
    suggestions: ["justify-content:", "space-between", "space-around", "flex-start"],
    frogs: [{ id: "frog-1", color: "green" }, { id: "frog-2", color: "yellow" }, { id: "frog-3", color: "red" }],
    targetStyle: "justify-content: space-between;",
    selector: "#pond",
    defaultCode: ""
  },
  {
    id: 5,
    title: "Align Items (Flex-End)",
    badge: "Menengah",
    instructions: "Gunakan <code>align-items</code> untuk memindahkan maskot Vetech ke bagian bawah area. Properti ini meratakan elemen secara vertikal.",
    hint: "Gunakan <code>align-items: flex-end;</code> untuk meratakan elemen ke bawah.",
    suggestions: ["align-items:", "flex-end", "center", "baseline"],
    frogs: [{ id: "frog-1", color: "green" }, { id: "frog-2", color: "yellow" }, { id: "frog-3", color: "red" }],
    targetStyle: "align-items: flex-end;",
    selector: "#pond",
    defaultCode: ""
  },
  {
    id: 6,
    title: "Kombinasi Horizontal & Vertikal",
    badge: "Menengah",
    instructions: "Pandu kodok tepat ke tengah-tengah danau menggunakan kombinasi <code>justify-content</code> dan <code>align-items</code>.",
    hint: "Gunakan <code>justify-content: center;</code> dan <code>align-items: center;</code>.",
    suggestions: ["justify-content:", "align-items:", "center", "flex-end"],
    frogs: [{ id: "frog-1", color: "green" }],
    targetStyle: "justify-content: center; align-items: center;",
    selector: "#pond",
    defaultCode: ""
  },
  {
    id: 7,
    title: "Justify & Align Combination",
    badge: "Menengah",
    instructions: "Kodok-kodok harus berada di bagian bawah danau dengan jarak yang sama di sekelilingnya.",
    hint: "Gunakan <code>justify-content: space-around;</code> dan <code>align-items: flex-end;</code>.",
    suggestions: ["justify-content: space-around;", "align-items: flex-end;"],
    frogs: [{ id: "frog-1", color: "green" }, { id: "frog-2", color: "yellow" }, { id: "frog-3", color: "red" }],
    targetStyle: "justify-content: space-around; align-items: flex-end;",
    selector: "#pond",
    defaultCode: ""
  },
  {
    id: 8,
    title: "Flex Direction (Row-Reverse)",
    badge: "Menengah",
    instructions: "Ubah urutan horizontal kodok menggunakan <code>flex-direction</code>. Nilai <code>row-reverse</code> membalikkan urutan dari kanan ke kiri.",
    hint: "Gunakan <code>flex-direction: row-reverse;</code>.",
    suggestions: ["flex-direction:", "row-reverse", "column", "row"],
    frogs: [{ id: "frog-1", color: "green" }, { id: "frog-2", color: "yellow" }, { id: "frog-3", color: "red" }],
    targetStyle: "flex-direction: row-reverse;",
    selector: "#pond",
    defaultCode: ""
  },
  {
    id: 9,
    title: "Flex Direction (Column)",
    badge: "Menengah",
    instructions: "Atur posisi kodok secara vertikal dalam satu kolom menggunakan <code>flex-direction: column;</code>.",
    hint: "Cobalah <code>flex-direction: column;</code>.",
    suggestions: ["flex-direction:", "column", "column-reverse", "row"],
    frogs: [{ id: "frog-1", color: "green" }, { id: "frog-2", color: "yellow" }, { id: "frog-3", color: "red" }],
    targetStyle: "flex-direction: column;",
    selector: "#pond",
    defaultCode: ""
  },
  {
    id: 10,
    title: "Flex Direction & Justify",
    badge: "Lanjutan",
    instructions: "Atur kodok dalam baris terbalik (row-reverse) dan geser ke sisi kiri teratai.",
    hint: "Gunakan <code>flex-direction: row-reverse;</code> dan <code>justify-content: flex-end;</code>.",
    suggestions: ["flex-direction: row-reverse;", "justify-content: flex-end;"],
    frogs: [{ id: "frog-1", color: "green" }, { id: "frog-2", color: "yellow" }, { id: "frog-3", color: "red" }],
    targetStyle: "flex-direction: row-reverse; justify-content: flex-end;",
    selector: "#pond",
    defaultCode: ""
  },
  {
    id: 11,
    title: "Column & Vertical Alignment",
    badge: "Lanjutan",
    instructions: "Ubah kontainer menjadi kolom vertikal dan geser kodok-kodok ke bagian bawah.",
    hint: "Ketika <code>flex-direction: column;</code> aktif, <code>justify-content</code> mengontrol sumbu vertikal!",
    suggestions: ["flex-direction: column;", "justify-content: flex-end;"],
    frogs: [{ id: "frog-1", color: "green" }, { id: "frog-2", color: "yellow" }, { id: "frog-3", color: "red" }],
    targetStyle: "flex-direction: column; justify-content: flex-end;",
    selector: "#pond",
    defaultCode: ""
  },
  {
    id: 12,
    title: "Column Reverse & Space Between",
    badge: "Lanjutan",
    instructions: "Balikkan urutan kolom secara vertikal dan beri jarak maksimum di antara kodok.",
    hint: "Gunakan <code>flex-direction: column-reverse;</code> dan <code>justify-content: space-between;</code>.",
    suggestions: ["flex-direction: column-reverse;", "justify-content: space-between;"],
    frogs: [{ id: "frog-1", color: "green" }, { id: "frog-2", color: "yellow" }, { id: "frog-3", color: "red" }],
    targetStyle: "flex-direction: column-reverse; justify-content: space-between;",
    selector: "#pond",
    defaultCode: ""
  },
  {
    id: 13,
    title: "Order Property (Individual)",
    badge: "Lanjutan",
    instructions: "Terkadang kamu perlu memindahkan satu kodok tertentu. Gunakan properti <code>order</code> pada kodok merah agar berpindah ke teratai paling kanan.",
    hint: "Properti <code>order</code> default bernilai 0. Berikan nilai positif seperti <code>order: 1;</code> pada kodok merah.",
    suggestions: ["order:", "1", "-1", "2"],
    frogs: [{ id: "frog-1", color: "green" }, { id: "frog-2", color: "yellow" }, { id: "frog-3", color: "red" }],
    targetStyle: "order: 1;",
    selector: ".frog-red",
    defaultCode: "",
    customCodeHeader: ".frog-red {\n  "
  },
  {
    id: 14,
    title: "Align Self (Individual)",
    badge: "Lanjutan",
    instructions: "Pindahkan HANYA kodok kuning ke bagian bawah danau menggunakan <code>align-self</code>.",
    hint: "Gunakan <code>align-self: flex-end;</code> pada elemen kodok kuning.",
    suggestions: ["align-self:", "flex-end", "center", "flex-start"],
    frogs: [{ id: "frog-1", color: "green" }, { id: "frog-2", color: "yellow" }, { id: "frog-3", color: "red" }],
    targetStyle: "align-self: flex-end;",
    selector: ".frog-yellow",
    defaultCode: "",
    customCodeHeader: ".frog-yellow {\n  "
  },
  {
    id: 15,
    title: "Flex Wrap (Wrap & Align Content)",
    badge: "Master",
    instructions: "Bantu 6 kodok ini agar berpindah ke baris baru ketika ruang danau tidak cukup dengan menggunakan <code>flex-wrap: wrap;</code>.",
    hint: "Gunakan <code>flex-wrap: wrap;</code> pada kontainer <code>#pond</code>.",
    suggestions: ["flex-wrap:", "wrap", "nowrap", "wrap-reverse"],
    frogs: [
      { id: "frog-1", color: "green" }, { id: "frog-2", color: "green" }, { id: "frog-3", color: "green" },
      { id: "frog-4", color: "yellow" }, { id: "frog-5", color: "yellow" }, { id: "frog-6", color: "yellow" }
    ],
    targetStyle: "flex-wrap: wrap;",
    selector: "#pond",
    defaultCode: ""
  }
];
