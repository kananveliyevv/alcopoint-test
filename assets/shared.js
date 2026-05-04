(function () {
  const keys = {
    products: "alcopoint_products",
    stores: "alcopoint_stores",
    gallery: "alcopoint_gallery",
    careers: "alcopoint_careers",
    settings: "alcopoint_settings",
    version: "alcopoint_data_version",
    age: "alcopoint_age_ok",
    auth: "alcopoint_admin_auth",
    currentUser: "alcopoint_admin_current_user",
    users: "alcopoint_admin_users",
  };

  const currentVersion = "2026-05-04-alkopoint-wolt-floating-admin";

  const categories = [
    "Vodka",
    "Viski",
    "Eksklüziv",
    "Konyak",
    "Şərab",
    "Şampan",
    "Tekila",
    "Cin",
    "Rom",
    "Rakı",
    "Vermut",
    "Grappa",
    "Absinthe",
    "Çaça",
    "Likör",
    "Pivə",
    "Alkoqolsuz",
    "Siqar",
    "Şirniyyat",
    "Qoruyucular",
    "Hədiyyə çantaları",
  ];

  const woltSource = "https://wolt.com/en/aze/baku/venue/alcopoint-narimanov";

  const initialProducts = window.AlcoPointWoltProducts || [
    {
      id: "p-wolt-1",
      name: "Johnnie Walker Island Green 1L",
      category: "Viski",
      brand: "Johnnie Walker",
      volume: "1 L",
      description: "Wolt kataloqundan götürülmüş məhsul.",
      source: woltSource,
      image: "https://imageproxy.wolt.com/assets/67e3ab14d025c6733684a455?w=600",
      featured: true,
    },
    {
      id: "p-wolt-2",
      name: "The Glenrothes 10 YO 0.7 L",
      category: "Viski",
      brand: "The Glenrothes",
      volume: "0.7 L",
      description: "Wolt kataloqundan götürülmüş məhsul.",
      source: woltSource,
      image: "https://imageproxy.wolt.com/assets/67e3b085df096032fc2e3707?w=600",
      featured: true,
    },
    {
      id: "p-wolt-3",
      name: "Rammstein Whisky 0.7 L",
      category: "Viski",
      brand: "Rammstein",
      volume: "0.7 L",
      description: "Wolt kataloqundan götürülmüş məhsul.",
      source: woltSource,
      image: "https://imageproxy.wolt.com/assets/67e3aed0df096032fc2e3654?w=600",
      featured: false,
    },
    {
      id: "p-wolt-4",
      name: "Crystal Head Aurora 0.7 L",
      category: "Vodka",
      brand: "Crystal Head",
      volume: "0.7 L",
      description: "Wolt kataloqundan götürülmüş məhsul.",
      source: woltSource,
      image: "https://imageproxy.wolt.com/assets/67e39f01149a6079e5cf14c9?w=600",
      featured: true,
    },
    {
      id: "p-wolt-5",
      name: "ASKANELI KONYAK VSOP 0.5 L",
      category: "Konyak",
      brand: "Askaneli",
      volume: "0.5 L",
      description: "Wolt kataloqundan götürülmüş məhsul.",
      source: woltSource,
      image: "https://imageproxy.wolt.com/assets/6852e073dbd9c0cb4a5c195a?w=600",
      featured: false,
    },
    {
      id: "p-wolt-6",
      name: "Meukow VS + 2 Glasses 0.7 L",
      category: "Konyak",
      brand: "Meukow",
      volume: "0.7 L",
      description: "Wolt kataloqundan götürülmüş məhsul.",
      source: woltSource,
      image: "https://imageproxy.wolt.com/menu/menu-images/606d8807c5706dc843231639/6c65c010-ba53-11ee-91f8-fae253e04924_astoria_lounge_cuvee_doc_extra_0.75_x_27.00_azn.png?w=600",
      featured: false,
    },
    {
      id: "p-wolt-7",
      name: "MEUKOW VS 0.05 L",
      category: "Konyak",
      brand: "Meukow",
      volume: "0.05 L",
      description: "Wolt kataloqundan götürülmüş məhsul.",
      source: woltSource,
      image: "https://imageproxy.wolt.com/assets/68fb30c4ca898685544c7352?w=600",
      featured: false,
    },
    {
      id: "p-wolt-8",
      name: "Pop-It-Now Vino Spumante Brut 11% 0,75 L",
      category: "Şampan",
      brand: "Pop-It-Now",
      volume: "0.75 L",
      description: "Wolt kataloqundan götürülmüş məhsul.",
      source: woltSource,
      image: "https://imageproxy.wolt.com/menu/menu-images/606d8807c5706dc843231639/88c5bd34-81a7-11ef-9526-d66dab2f7872_7__pop_it_now_vino_spumante_brut.png?w=600",
      featured: true,
    },
    {
      id: "p-wolt-9",
      name: "Corvezzo Blanc de Blancs Brut 0.75 L",
      category: "Şampan",
      brand: "Corvezzo",
      volume: "0.75 L",
      description: "Wolt kataloqundan götürülmüş məhsul.",
      source: woltSource,
      image: "https://imageproxy.wolt.com/assets/67691b123cb4387c35c6fdef?w=600",
      featured: false,
    },
    {
      id: "p-wolt-10",
      name: "Corvezzo Prosecco DOC Millesimato 0.75 L",
      category: "Şampan",
      brand: "Corvezzo",
      volume: "0.75 L",
      description: "Wolt kataloqundan götürülmüş məhsul.",
      source: woltSource,
      image: "https://imageproxy.wolt.com/assets/67691b4cdf447703b56530ac?w=600",
      featured: false,
    },
    {
      id: "p-wolt-11",
      name: "SANTAL APELSIN 1 L",
      category: "Alkoqolsuz",
      brand: "Santal",
      volume: "1 L",
      description: "Wolt kataloqundan götürülmüş məhsul.",
      source: woltSource,
      image: "https://imageproxy.wolt.com/assets/69ea57df547dd5f4762547ba?w=600",
      featured: false,
    },
    {
      id: "p-wolt-12",
      name: "Red Bull 0.250 L",
      category: "Alkoqolsuz",
      brand: "Red Bull",
      volume: "0.250 L",
      description: "Wolt kataloqundan götürülmüş məhsul.",
      source: woltSource,
      image: "https://imageproxy.wolt.com/menu/menu-images/6281fc026764e61e6ece3796/d013239e-9845-11ee-b833-327a00fb0da6_astoria_lounge_cuvee_doc_extra_0.75_x_27.00_azn.png?w=600",
      featured: false,
    },
  ];

  const initialStoreRows = [
    ["ALCOPOINT H.ELIYEV", "Heydər Əliyev prospekti 32L, Bakı"],
    ["ALCOPOINT 6 PARALEL", "6-cı paralel küçəsi, Yasamal rayonu, Bakı"],
    ["ALCOPOINT INQILAB", "Akademik Həsən Əliyev küçəsi 2, Bakı"],
    ["ALCOPOINT ZOOPARK", "Zooloji Park yaxınlığı, Bakı"],
    ["ALCOPOINT BABEK", "Babək prospekti, Bakı"],
    ["ALCOPOINT ELMLER", "Məhəmməd Naxçıvani küçəsi 12X, Yasamal, Bakı"],
    ["ALCOPOINT BADAMDAR", "Badamdar qəsəbəsi, Bakı"],
    ["ALCOPOINT AG SEHER", "Ağ Şəhər, Bakı"],
    ["ALCOPOINT NIZAMI", "Nizami küçəsi 131, Bakı"],
    ["ALCOPOINT INQILAB 2", "Ünvan dəqiqləşdirilir, Bakı"],
    ["ALCOPOINT MERDEKAN", "Mərdəkan qəsəbəsi, Bakı"],
    ["ALCOPOINT QIS PARKI 2", "Qış parkı ərazisi, Bakı"],
    ["ALCOPOINT LİDO", "Səbail rayonu, Lido ətrafı, Bakı"],
    ["ALCOPOINT TEHSIL N.", "Təhsil Nazirliyi ətrafı, Bakı"],
    ["ALCOPOINT NEAPOL", "Neapol küçəsi 16/2, Xətai rayonu, Bakı"],
    ["ALCOPOINT AZADLIQ 2", "Azadlıq prospekti, Bakı"],
    ["ALCOPOINT QALA SHOPPİNG", "Ünvan dəqiqləşdirilir, Bakı"],
    ["ALCOPOINT NEAPOL 2", "Neapol küçəsi 2B/32, Bakı"],
    ["ALCOPOINT QIS PARKI", "Füzuli küçəsi 39, Bakı"],
    ["ALCOPOINT TIBB", "Tibb Universiteti ətrafı, Bakı"],
    ["ALCOPOINT MALACAN", "Rəsul Rza küçəsi 27B, Bakı"],
    ["ALCOPOINT 28 MAY", "28 May küçəsi 69D, Nəsimi, Bakı"],
    ["ALCOPOINT 4MKR", "4-cü mikrorayon, Bakı"],
    ["ALCOPOINT AZADLIQ", "Azadlıq prospekti, Bakı"],
    ["ALCOPOINT RUSLAN 93", "Dəqiqləşdirilir, Bakı"],
    ["ALCOPOINT LIDER", "Lider TV yaxınlığı, Bakı"],
    ["ALCOPOINT ELIYAR E.", "Eliyər Əliyev küçəsi, Bakı"],
    ["ALCOPOINT BUZOVNA", "Buzovna qəsəbəsi, Bakı"],
    ["ALCOPOINT PRAQA", "Praqa restoranı yaxınlığı, Bakı"],
    ["ALCOPOINT YASAMAL", "Yasamal rayonu, Bakı"],
    ["ALCOPOINT BADAMDAR 2", "Badamdar 2-ci massiv, Bakı"],
  ];

  const storeCoordinates = [
    [40.3946, 49.8701], [40.3815, 49.8138], [40.3976, 49.8396], [40.3925, 49.8509],
    [40.3828, 49.9056], [40.3786, 49.8099], [40.3422, 49.8124], [40.3785, 49.8759],
    [40.3713, 49.8372], [40.3976, 49.8396], [40.4910, 50.1425], [40.3760, 49.8365],
    [40.3595, 49.8348], [40.3955, 49.8388], [40.3843, 49.9524], [40.4174, 49.8422],
    [40.4150, 49.9140], [40.3849, 49.9513], [40.3748, 49.8366], [40.3866, 49.8327],
    [40.3707, 49.8397], [40.3799, 49.8495], [40.4170, 49.8080], [40.4202, 49.8438],
    [40.3820, 49.8600], [40.3990, 49.8800], [40.3974, 49.8749], [40.5180, 50.1144],
    [40.3977, 49.8090], [40.3792, 49.8001], [40.3434, 49.8102]
  ];

  const initialStores = initialStoreRows.map(([name, address], index) => ({
    id: `s-${index + 1}`,
    name,
    address,
    phone: "+994 50 232 00 04",
    hours: "09:00 - 01:00",
    mapUrl: "",
    lat: String(storeCoordinates[index]?.[0] || ""),
    lng: String(storeCoordinates[index]?.[1] || ""),
    image: "",
  }));

  const initialCareers = [
    {
      id: "c-1",
      title: "AlcoPoint MMC-də karyera imkanları",
      description: "Satış, mağaza idarəçiliyi və müştəri xidməti sahəsində komandamıza qoşulmaq istəyən namizədlər bizimlə əlaqə saxlaya bilər.",
      image: "assets/arxa-logo.jpeg",
      link: "mailto:alcopointstore@gmail.com"
    }
  ];

  const initialGallery = [
    {
      id: "g-1",
      title: "Premium vitrin",
      image: "assets/arxa-logo.jpeg",
    },
    {
      id: "g-2",
      title: "AlcoPoint brend simvolu",
      image: "assets/logo.jpeg",
    },
  ];

  const defaultSettings = {
    phone: "+994 50 232 00 04",
    email: "alcopointstore@gmail.com",
    instagram: "https://www.instagram.com/alcopoint.az",
    linkedin: "https://www.linkedin.com/company/alcopoint",
    wolt: "https://wolt.com/en/aze/baku/brand/alcopoint",
    hours: "09:00 - 01:00",
    officeAddress: "Aşıq Molla Cümə küçəsi, 1/5",
    officeHours: "09:00 - 18:00",
    storeHours: "09:00 - 01:00",
  };

  const defaultUsers = [
    {
      id: "u-1",
      username: "admin",
      password: "006296",
      role: "Super admin",
    },
  ];

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  const cache = {
    products: clone(initialProducts),
    stores: clone(initialStores),
    gallery: clone(initialGallery),
    careers: clone(initialCareers),
    settings: clone(defaultSettings),
    users: clone(defaultUsers),
  };

  function localKey(table) { return `alcopoint_local_${table}`; }
  function loadLocal(table, fallback) {
    try { return JSON.parse(localStorage.getItem(localKey(table)) || "null") || fallback; }
    catch (_) { return fallback; }
  }
  function saveLocal(table, items) {
    try { localStorage.setItem(localKey(table), JSON.stringify(items)); } catch (_) {}
  }

  async function request(action, payload = null) {
    const options = payload
      ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
      : {};
    const response = await fetch(`api.php?action=${encodeURIComponent(action)}`, options);
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.ok === false) {
      throw new Error(data.error || "Server xətası baş verdi.");
    }
    return data;
  }

  async function init() {
    try {
      const data = await request("all");
      cache.products = data.products || cache.products;
      cache.stores = data.stores || cache.stores;
      cache.gallery = data.gallery || cache.gallery;
      cache.careers = data.careers || cache.careers;
      cache.settings = data.settings || cache.settings;
      cache.users = data.users || cache.users;
    } catch (error) {
      console.warn("PHP API oxunmadı, brauzer yaddaşı istifadə edilir:", error.message);
      cache.products = loadLocal("products", cache.products);
      cache.stores = loadLocal("stores", cache.stores);
      cache.gallery = loadLocal("gallery", cache.gallery);
      cache.careers = loadLocal("careers", cache.careers);
      cache.settings = loadLocal("settings", cache.settings);
      cache.users = loadLocal("users", cache.users);
    }
  }

  function getProducts() { return cache.products; }
  function getStores() { return cache.stores; }
  function getGallery() { return cache.gallery; }
  function getCareers() { return cache.careers; }
  function getSettings() { return cache.settings; }
  function getUsers() { return cache.users; }

  async function saveProducts(products) {
    cache.products = products;
    saveLocal("products", products);
    await request("save", { table: "products", items: products });
  }
  async function saveStores(stores) {
    cache.stores = stores;
    saveLocal("stores", stores);
    await request("save", { table: "stores", items: stores });
  }
  async function saveGallery(gallery) {
    cache.gallery = gallery;
    saveLocal("gallery", gallery);
    await request("save", { table: "gallery", items: gallery });
  }
  async function saveCareers(careers) {
    cache.careers = careers;
    saveLocal("careers", careers);
    await request("save", { table: "careers", items: careers });
  }
  async function saveSettings(settings) {
    cache.settings = settings;
    saveLocal("settings", settings);
    await request("save", { table: "settings", items: settings });
  }
  async function saveUsers(users) {
    cache.users = users;
    saveLocal("users", users);
    await request("save", { table: "users", items: users });
  }
  async function resetData() {
    const data = await request("reset");
    cache.products = data.products || clone(initialProducts);
    cache.stores = data.stores || clone(initialStores);
    cache.gallery = data.gallery || clone(initialGallery);
    cache.careers = data.careers || clone(initialCareers);
    cache.settings = data.settings || clone(defaultSettings);
    cache.users = data.users || clone(defaultUsers);
  }
  async function login(username, password) {
    const data = await request("login", { username, password });
    if (data.user) localStorage.setItem(keys.currentUser, JSON.stringify(data.user));
    return data.user || { username, role: "admin" };
  }

  async function uploadMedia(file) {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("api.php?action=upload", { method: "POST", body: formData });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.ok === false) throw new Error(data.error || "Fayl yüklənmədi.");
    return data;
  }

  function getCurrentUser() {
    try { return JSON.parse(localStorage.getItem(keys.currentUser) || "null"); }
    catch (_) { return null; }
  }

  function makeId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function mapLink(store) {
    if (store.mapUrl) return store.mapUrl;
    if (store.lat && store.lng) return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${store.lat},${store.lng}`)}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${store.name} ${store.address}`)}`;
  }

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      if (!file) { resolve(""); return; }
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  window.AlcoPoint = {
    keys,
    categories,
    init,
    login,
    uploadMedia,
    getCurrentUser,
    getProducts,
    getStores,
    getGallery,
    getCareers,
    getSettings,
    saveProducts,
    saveStores,
    saveGallery,
    saveCareers,
    saveSettings,
    getUsers,
    saveUsers,
    resetData,
    makeId,
    escapeHTML,
    mapLink,
    fileToDataUrl,
  };
})();
