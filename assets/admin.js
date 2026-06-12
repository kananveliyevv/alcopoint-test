(function () {
  const api = window.AlcoPoint;
  const loginScreen = document.getElementById("loginScreen");
  const adminShell = document.getElementById("adminShell");
  const loginForm = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");
  const productForm = document.getElementById("productForm");
  const storeForm = document.getElementById("storeForm");
  const galleryForm = document.getElementById("galleryForm");
  const careerForm = document.getElementById("careerForm");
  const userForm = document.getElementById("userForm");
  const settingsForm = document.getElementById("settingsForm");
  const importStatus = document.getElementById("importStatus");

  function field(form, name) {
    return form.elements.namedItem(name);
  }

  function isAuthed() {
    return localStorage.getItem(api.keys.auth) === "true";
  }

  function setAuthed(value) {
    if (value) localStorage.setItem(api.keys.auth, "true");
    else {
      localStorage.removeItem(api.keys.auth);
      localStorage.removeItem(api.keys.currentUser);
    }
    renderAuth();
  }

  async function renderAuth() {
    const authed = isAuthed();
    loginScreen.hidden = authed;
    adminShell.hidden = !authed;
    if (authed) {
      await api.init();
      renderAll();
    }
  }

  function currentRole() {
    const user = api.getCurrentUser?.();
    return String(user?.role || "admin").toLowerCase();
  }

  function isMainAdmin() {
    return ["admin", "super admin"].includes(currentRole());
  }

  function isCareerRole() {
    return currentRole() === "career";
  }

  function activeView() {
    const hash = window.location.hash.replace("#", "") || "dashboard";
    const allowed = isMainAdmin() ? ["dashboard", "products", "stores", "gallery", "careers", "users", "settings"] : isCareerRole() ? ["careers"] : ["dashboard", "products", "stores", "gallery", "careers", "settings"];
    return allowed.includes(hash) ? hash : allowed[0];
  }

  function renderRoute() {
    const view = activeView();
    document.querySelectorAll(".admin-view").forEach((section) => {
      section.hidden = section.id !== `view-${view}`;
    });
    document.querySelectorAll("[data-admin-link]").forEach((link) => {
      const href = link.getAttribute("href");
      if (href === "#users") link.hidden = !isMainAdmin();
      if (isCareerRole()) link.hidden = href !== "#careers";
      link.classList.toggle("active", href === `#${view}`);
    });
  }

  function metric(label, value, detail) {
    return `
      <article class="metric-card">
        <span>${api.escapeHTML(label)}</span>
        <strong>${api.escapeHTML(value)}</strong>
        <small>${api.escapeHTML(detail)}</small>
      </article>
    `;
  }

  function renderDashboard() {
    const products = api.getProducts();
    const stores = api.getStores();
    const gallery = api.getGallery();
    const careers = api.getCareers ? api.getCareers() : [];
    document.getElementById("metricGrid").innerHTML = [
      metric("Məhsullar", products.length, "Kataloqda aktivdir"),
      metric("Filiallar", stores.length, "Excel siyahısından yüklənib"),
      metric("Media", gallery.length, "Qalereyada göstərilir"),
      metric("Karyera", careers.length, "Saytda göstərilir"),
      metric("Adminlər", api.getUsers().length, "Panelə giriş icazəsi"),
    ].join("");

    document.getElementById("recentList").innerHTML = stores
      .slice(0, 6)
      .map(
        (store) => `
          <div class="recent-row">
            <strong>${api.escapeHTML(store.name)}</strong>
            <span>${api.escapeHTML(store.address)}</span>
          </div>
        `,
      )
      .join("");
  }

  function imageThumb(src, title, type = "image") {
    if (src && type === "video") return `<video src="${api.escapeHTML(src)}" muted playsinline></video>`;
    if (src) return `<img src="${api.escapeHTML(src)}" alt="${api.escapeHTML(title)}" />`;
    return `<div class="admin-thumb-mark"><img src="assets/logo-transparent.png" alt="" /></div>`;
  }

  function renderProducts() {
    const products = api.getProducts();
    document.getElementById("productList").innerHTML = products
      .map(
        (product) => `
          <article class="admin-list-row">
            <div class="admin-thumb">${imageThumb(product.image, product.name)}</div>
            <div>
              <strong>${api.escapeHTML(product.name)}</strong>
              <span>${api.escapeHTML(product.category)} · ${api.escapeHTML(product.brand || "Brend yoxdur")}</span>
            </div>
            <div class="row-actions">
              <button class="ghost-btn" data-edit-product="${api.escapeHTML(product.id)}" type="button">Redaktə</button>
              <button class="danger-btn" data-delete-product="${api.escapeHTML(product.id)}" type="button">Sil</button>
            </div>
          </article>
        `,
      )
      .join("");
  }

  function renderStores() {
    const stores = api.getStores();
    document.getElementById("storeList").innerHTML = stores
      .map(
        (store) => `
          <article class="admin-list-row">
            <div class="admin-thumb">${imageThumb(store.image, store.name)}</div>
            <div>
              <strong>${api.escapeHTML(store.name)}</strong>
              <span>${api.escapeHTML(store.address)}</span>
            </div>
            <div class="row-actions">
              <button class="ghost-btn" data-edit-store="${api.escapeHTML(store.id)}" type="button">Redaktə</button>
              <button class="danger-btn" data-delete-store="${api.escapeHTML(store.id)}" type="button">Sil</button>
            </div>
          </article>
        `,
      )
      .join("");
  }

  function renderGallery() {
    const gallery = api.getGallery();
    document.getElementById("galleryList").innerHTML = gallery
      .map(
        (item) => `
          <article class="admin-list-row">
            <div class="admin-thumb">${imageThumb(item.image, item.title, item.type)}</div>
            <div>
              <strong>${api.escapeHTML(item.title)}</strong>
              <span>${api.escapeHTML(item.type === "video" ? "Video" : "Şəkil")} · ${api.escapeHTML(item.image)}</span>
            </div>
            <div class="row-actions">
              <button class="ghost-btn" data-edit-gallery="${api.escapeHTML(item.id)}" type="button">Redaktə</button>
              <button class="danger-btn" data-delete-gallery="${api.escapeHTML(item.id)}" type="button">Sil</button>
            </div>
          </article>
        `,
      )
      .join("");
  }

  function renderCareers() {
    const careers = api.getCareers ? api.getCareers() : [];
    document.getElementById("careerList").innerHTML = careers
      .map(
        (item) => `
          <article class="admin-list-row">
            <div class="admin-thumb">${imageThumb(item.image, item.title)}</div>
            <div>
              <strong>${api.escapeHTML(item.title)}</strong>
              <span>${api.escapeHTML(item.description || "")}</span>
            </div>
            <div class="row-actions">
              <button class="ghost-btn" data-edit-career="${api.escapeHTML(item.id)}" type="button">Redaktə</button>
              <button class="danger-btn" data-delete-career="${api.escapeHTML(item.id)}" type="button">Sil</button>
            </div>
          </article>
        `,
      )
      .join("");
  }

  function renderUsers() {
    const users = api.getUsers();
    document.getElementById("userList").innerHTML = users
      .map(
        (user) => `
          <article class="admin-list-row">
            <div class="admin-thumb admin-user-icon">${api.escapeHTML((user.username || "A").slice(0, 1).toUpperCase())}</div>
            <div>
              <strong>${api.escapeHTML(user.username)}</strong>
              <span>${api.escapeHTML(user.role || "Admin")}</span>
            </div>
            <div class="row-actions">
              <button class="ghost-btn" data-edit-user="${api.escapeHTML(user.id)}" type="button">Redaktə</button>
              <button class="danger-btn" data-delete-user="${api.escapeHTML(user.id)}" type="button" ${users.length <= 1 ? "disabled" : ""}>Sil</button>
            </div>
          </article>
        `,
      )
      .join("");
  }

  function renderSettings() {
    const settings = api.getSettings();
    field(settingsForm, "phone").value = settings.phone || "";
    field(settingsForm, "email").value = settings.email || "";
    field(settingsForm, "instagram").value = settings.instagram || "";
    field(settingsForm, "linkedin").value = settings.linkedin || "";
    field(settingsForm, "wolt").value = settings.wolt || "https://wolt.com/en/aze/baku/brand/alcopoint";
    field(settingsForm, "officeAddress").value = settings.officeAddress || "Aşıq Molla Cümə küçəsi, 1/5";
    field(settingsForm, "officeHours").value = settings.officeHours || "09:00 - 18:00";
    field(settingsForm, "storeHours").value = settings.storeHours || settings.hours || "09:00 - 01:00";
    field(settingsForm, "hours").value = settings.hours || settings.storeHours || "09:00 - 01:00";
  }

  function renderCategoryOptions() {
    const select = document.getElementById("productCategorySelect");
    select.innerHTML = api.categories
      .map((category) => `<option value="${api.escapeHTML(category)}">${api.escapeHTML(category)}</option>`)
      .join("");
  }

  function renderAll() {
    renderRoute();
    renderCategoryOptions();
    renderDashboard();
    renderProducts();
    renderStores();
    renderGallery();
    renderCareers();
    renderUsers();
    renderSettings();
  }

  function openForm(type) {
    const form = document.getElementById(`${type}Form`);
    form.hidden = false;
    form.reset();
    field(form, "id").value = "";
    const title = document.getElementById(`${type}FormTitle`);
    if (title) {
      title.textContent = type === "product" ? "Yeni məhsul" : type === "store" ? "Yeni filial" : type === "user" ? "Yeni istifadəçi" : type === "career" ? "Yeni karyera məlumatı" : "Yeni media";
    }
  }

  function closeForm(type) {
    const form = document.getElementById(`${type}Form`);
    form.hidden = true;
    form.reset();
    field(form, "id").value = "";
  }

  function editProduct(id) {
    const product = api.getProducts().find((item) => item.id === id);
    if (!product) return;
    openForm("product");
    document.getElementById("productFormTitle").textContent = "Məhsulu redaktə et";
    field(productForm, "id").value = product.id;
    field(productForm, "name").value = product.name || "";
    field(productForm, "category").value = product.category || api.categories[0];
    field(productForm, "brand").value = product.brand || "";
    field(productForm, "volume").value = product.volume || "";
    field(productForm, "source").value = product.source || "";
    field(productForm, "description").value = product.description || "";
    field(productForm, "image").value = product.image || "";
    field(productForm, "featured").checked = Boolean(product.featured);
  }

  function editStore(id) {
    const store = api.getStores().find((item) => item.id === id);
    if (!store) return;
    openForm("store");
    document.getElementById("storeFormTitle").textContent = "Filialı redaktə et";
    field(storeForm, "id").value = store.id;
    field(storeForm, "name").value = store.name || "";
    field(storeForm, "address").value = store.address || "";
    field(storeForm, "phone").value = store.phone || "";
    field(storeForm, "hours").value = store.hours || "";
    field(storeForm, "mapUrl").value = store.mapUrl || "";
    field(storeForm, "lat").value = store.lat || "";
    field(storeForm, "lng").value = store.lng || "";
    field(storeForm, "image").value = store.image || "";
  }

  function editGallery(id) {
    const item = api.getGallery().find((entry) => entry.id === id);
    if (!item) return;
    openForm("gallery");
    document.getElementById("galleryFormTitle").textContent = "Medianı redaktə et";
    field(galleryForm, "id").value = item.id;
    field(galleryForm, "title").value = item.title || "";
    field(galleryForm, "type").value = item.type || "image";
    field(galleryForm, "image").value = item.image || "";
  }

  function editCareer(id) {
    const item = api.getCareers().find((entry) => entry.id === id);
    if (!item) return;
    openForm("career");
    document.getElementById("careerFormTitle").textContent = "Karyera məlumatını redaktə et";
    field(careerForm, "id").value = item.id;
    field(careerForm, "title").value = item.title || "";
    field(careerForm, "description").value = item.description || "";
    field(careerForm, "image").value = item.image || "";
    field(careerForm, "link").value = item.link || "";
  }

  function editUser(id) {
    const user = api.getUsers().find((entry) => entry.id === id);
    if (!user) return;
    openForm("user");
    document.getElementById("userFormTitle").textContent = "İstifadəçini redaktə et";
    field(userForm, "id").value = user.id;
    field(userForm, "username").value = user.username || "";
    field(userForm, "password").value = user.password || "";
    field(userForm, "role").value = user.role || "Admin";
  }

  async function productPayload(form) {
    const fileImage = await api.fileToDataUrl(field(form, "imageFile").files[0]);
    return {
      id: field(form, "id").value || api.makeId("p"),
      name: field(form, "name").value.trim(),
      category: field(form, "category").value,
      brand: field(form, "brand").value.trim(),
      volume: field(form, "volume").value.trim(),
      source: field(form, "source").value.trim(),
      description: field(form, "description").value.trim(),
      image: fileImage || field(form, "image").value.trim(),
      featured: field(form, "featured").checked,
    };
  }

  function normalizeHeader(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replaceAll("ə", "e")
      .replaceAll("ı", "i")
      .replaceAll("ö", "o")
      .replaceAll("ü", "u")
      .replaceAll("ğ", "g")
      .replaceAll("ş", "s")
      .replaceAll("ç", "c")
      .replace(/[^a-z0-9]+/g, "");
  }

  function pick(row, names) {
    const wanted = names.map(normalizeHeader);
    for (const [key, value] of Object.entries(row)) {
      if (wanted.includes(normalizeHeader(key))) return String(value ?? "").trim();
    }
    return "";
  }

  function productFromImport(row) {
    const name = pick(row, ["ad", "name", "mehsul", "məhsul", "mehsul adi", "məhsul adı", "product", "title"]);
    if (!name) return null;
    const category = pick(row, ["kateqoriya", "kategoriya", "category"]) || "Vodka";
    const normalizedCategory =
      api.categories.find((item) => normalizeHeader(item) === normalizeHeader(category)) || category.trim();
    return {
      id: api.makeId("p"),
      name,
      category: normalizedCategory,
      brand: pick(row, ["brend", "brand"]),
      volume: pick(row, ["hecm", "həcm", "volume", "olcu", "ölçü"]),
      description: pick(row, ["tesvir", "təsvir", "description", "aciqlama", "açıqlama"]),
      image: pick(row, ["sekil", "şəkil", "image", "imageurl", "photo", "foto"]),
      source: pick(row, ["source", "menbe", "mənbə", "url", "link"]),
      featured: /^(yes|true|1|beli|hə|he)$/i.test(pick(row, ["featured", "populyar"])),
    };
  }

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let cell = "";
    let quote = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const next = text[i + 1];
      if (char === '"' && quote && next === '"') {
        cell += '"';
        i++;
      } else if (char === '"') {
        quote = !quote;
      } else if (char === "," && !quote) {
        row.push(cell);
        cell = "";
      } else if ((char === "\n" || char === "\r") && !quote) {
        if (char === "\r" && next === "\n") i++;
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
      } else {
        cell += char;
      }
    }
    row.push(cell);
    rows.push(row);

    const headers = rows.shift()?.map((header) => header.trim()) || [];
    return rows
      .filter((values) => values.some((value) => String(value).trim()))
      .map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] || ""])));
  }

  function loadXlsxLibrary() {
    if (window.XLSX) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const existing = document.querySelector("script[data-xlsx-loader]");
      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", () => reject(new Error("XLSX kitabxanası yüklənmədi.")), { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
      script.dataset.xlsxLoader = "true";
      script.onload = resolve;
      script.onerror = () => reject(new Error("XLSX kitabxanası yüklənmədi. CSV faylı ilə də import edə bilərsiniz."));
      document.head.appendChild(script);
    });
  }

  async function readImportRows(file) {
    const extension = file.name.split(".").pop().toLowerCase();
    if (extension === "csv") {
      return parseCsv(await file.text());
    }

    if (!window.XLSX) {
      await loadXlsxLibrary();
    }

    const buffer = await file.arrayBuffer();
    const workbook = window.XLSX.read(buffer, { type: "array" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    return window.XLSX.utils.sheet_to_json(firstSheet, { defval: "" });
  }

  async function mergeImportedProducts(importedProducts) {
    const products = api.getProducts();
    for (const product of importedProducts) {
      const existingIndex = products.findIndex((item) => item.name.toLowerCase() === product.name.toLowerCase());
      if (existingIndex >= 0) products[existingIndex] = { ...products[existingIndex], ...product, id: products[existingIndex].id };
      else products.unshift(product);
    }
    await api.saveProducts(products);
  }

  async function importProductsFromFile() {
    const fileInput = document.getElementById("productImportFile");
    const file = fileInput.files[0];
    if (!file) {
      importStatus.textContent = "Əvvəlcə Excel və ya CSV faylı seçin.";
      return;
    }

    try {
      importStatus.textContent = "Fayl oxunur...";
      const rows = await readImportRows(file);
      const imported = rows.map(productFromImport).filter(Boolean);
      if (!imported.length) {
        importStatus.textContent = "Faylda məhsul adı olan sətir tapılmadı.";
        return;
      }
      await mergeImportedProducts(imported);
      fileInput.value = "";
      importStatus.textContent = `${imported.length} məhsul əlavə edildi/yeniləndi.`;
      renderAll();
    } catch (error) {
      importStatus.textContent = error.message || "Fayl oxunmadı.";
    }
  }

  function downloadTemplate() {
    const template = [
      ["ad", "kateqoriya", "brend", "hecm", "sekil", "tesvir", "menbe"],
      ["Məhsul adı", "Viski", "Brend", "0.7 L", "https://...", "Qısa təsvir", "https://wolt.com/..."],
    ]
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([template], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "alcopoint-mehsul-sablonu.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  const woltReaderPrefix = "https://r.jina.ai/";
  const woltCategoryMap = {
    "EXCLUSIVE - ONLY IN ALСOPOINT 🍾💥": "Eksklüziv",
    "VODKA": "Vodka",
    "WHISKEY": "Viski",
    "TEQUILA": "Tekila",
    "GIN": "Cin",
    "WINE": "Şərab",
    "SPARKLING WINES": "Şampan",
    "COGNAC & BRANDY": "Konyak",
    "LIQUEUR & BITTERS": "Likör",
    "RUM": "Rom",
    "RAKI": "Rakı",
    "VERMOUTH": "Vermut",
    "GRAPPA": "Grappa",
    "ABSINTHE": "Absinthe",
    "CACA": "Çaça",
    "BEER": "Pivə",
    "NON-ALCOHOLIC DRINKS": "Alkoqolsuz",
    "CIGAR AND CIGARILLOS": "Siqar",
    "COOKIES & CHOCOLATES": "Şirniyyat",
    "QORUYUCULAR": "Qoruyucular",
    "GIFT BAGS": "Hədiyyə çantaları",
  };

  function cleanWoltUrl(value) {
    const url = String(value || "").trim();
    if (!/^https:\/\/wolt\.com\//i.test(url)) {
      throw new Error("Wolt linki https://wolt.com/... formatında olmalıdır.");
    }
    return url.replace(/\?[^#]*$/, "").replace(/#.*$/, "");
  }

  function readerUrl(url) {
    return `${woltReaderPrefix}${url}`;
  }

  async function fetchReaderMarkdown(url) {
    const response = await fetch(readerUrl(url), { headers: { Accept: "text/plain" } });
    if (!response.ok) throw new Error(`Wolt oxunmadı: ${response.status}`);
    return response.text();
  }

  function cleanWoltCategory(label) {
    const normalized = String(label || "").replace(/\s+/g, " ").trim();
    return woltCategoryMap[normalized] || normalized.replace(/[🇦🇿🇮🇹🇫🇷🇨🇱🇳🇿🇿🇦🇬🇪🇦🇷]/g, "").trim() || "Məhsul";
  }

  function extractWoltCategoryLinks(markdown) {
    const links = [];
    const seen = new Set();
    const pattern = /\[!\[Image[^\]]*\]\([^)]*\)\s*([^\]]+?)\]\((https:\/\/wolt\.com\/en\/aze\/baku\/venue\/[^/]+\/items\/[^)]+)\)/g;
    let match;
    while ((match = pattern.exec(markdown))) {
      const label = match[1].trim();
      const url = match[2].replace(/\?[^#]*$/, "").replace(/#.*$/, "");
      if (!label || seen.has(url)) continue;
      seen.add(url);
      links.push({ label, category: cleanWoltCategory(label), url });
    }
    return links.filter((link) => !/Most ordered|Discover/i.test(link.label));
  }

  function brandFromWoltName(name) {
    const cleaned = name.replace(/^[^\p{L}\p{N}]+\s*/u, "").trim();
    const parts = cleaned.split(/\s+/).filter(Boolean);
    if (!parts.length) return "";
    if (parts[0].length <= 3 && parts[1]) return `${parts[0]} ${parts[1]}`;
    return parts[0].replace(/[+,:;]$/, "");
  }

  function volumeFromWoltName(name) {
    return (name.match(/(?:\d+(?:[,.]\d+)?\s*(?:L|ML|KG)|\d+\s*%)/i) || [""])[0].replace(",", ".");
  }

  function cleanWoltProductName(name) {
    return String(name || "")
      .replace(/\s+\d+\s*pc\b.*?AZN\s*[\d.,]+\s*\/pc.*$/i, "")
      .replace(/\s+AZN\s*[\d.,]+.*$/i, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function extractWoltProducts(markdown, category) {
    const products = [];
    const pattern = /\]\((https:\/\/wolt\.com\/en\/aze\/baku\/venue\/[^/]+\/[^)]+?itemid-[^)]+)\)\!\[Image[^\]]*\]\((https:\/\/imageproxy\.wolt\.com\/[^)]+)\)[\s\S]{0,700}?###\s+([^\n]+)/g;
    let match;
    while ((match = pattern.exec(markdown))) {
      const name = cleanWoltProductName(match[3]);
      if (!name || /^(Image|Most ordered|See all)$/i.test(name)) continue;
      products.push({
        id: api.makeId("p"),
        name,
        category,
        brand: brandFromWoltName(name),
        volume: volumeFromWoltName(name),
        description: "Wolt kataloqundan import edilib.",
        image: match[2].replace(/\?w=\d+$/, "") + "?w=600",
        source: match[1].replace(/\?[^#]*$/, "").replace(/#.*$/, ""),
        featured: false,
      });
    }
    return products;
  }

  async function importFromWoltLink() {
    const input = document.getElementById("woltImportUrl");
    const url = cleanWoltUrl(input.value);
    const imported = [];

    try {
      importStatus.textContent = "Wolt linki oxunur...";
      const markdown = await fetchReaderMarkdown(url);
      const categoryLinks = url.includes("/items/") ? [] : extractWoltCategoryLinks(markdown);

      if (categoryLinks.length) {
        for (const [index, link] of categoryLinks.entries()) {
          importStatus.textContent = `Wolt kateqoriyası oxunur: ${index + 1}/${categoryLinks.length}`;
          const categoryMarkdown = await fetchReaderMarkdown(link.url);
          imported.push(...extractWoltProducts(categoryMarkdown, link.category));
        }
      } else {
        const titleCategory = (markdown.match(/^Title:\s*([^|]+)/m)?.[1] || "Wolt").trim();
        imported.push(...extractWoltProducts(markdown, cleanWoltCategory(titleCategory)));
      }
    } catch (error) {
      if ((url.includes("/venue/alkopoint") || url.includes("/venue/alcopoint") || url.includes("alcopoint") || url.includes("alkopoint")) && window.AlcoPointWoltProducts?.length) {
        imported.push(
          ...window.AlcoPointWoltProducts.map((product) => ({
            ...product,
            id: api.makeId("p"),
            featured: false,
          })),
        );
        importStatus.textContent = "Canlı oxuma alınmadı, saxlanmış Alkopoint Wolt kataloqu istifadə edildi.";
      } else {
        throw error;
      }
    }

    if (!imported.length) {
      importStatus.textContent = "Bu linkdən məhsul tapılmadı.";
      return;
    }

    mergeImportedProducts(imported);
    input.value = "";
    importStatus.textContent = `${imported.length} Wolt məhsulu əlavə edildi/yeniləndi.`;
    renderAll();
  }

  async function storePayload(form) {
    const fileImage = await api.fileToDataUrl(field(form, "imageFile").files[0]);
    return {
      id: field(form, "id").value || api.makeId("s"),
      name: field(form, "name").value.trim(),
      address: field(form, "address").value.trim(),
      phone: field(form, "phone").value.trim(),
      hours: field(form, "hours").value.trim(),
      mapUrl: field(form, "mapUrl").value.trim(),
      lat: field(form, "lat").value.trim(),
      lng: field(form, "lng").value.trim(),
      image: fileImage || field(form, "image").value.trim(),
    };
  }

  async function galleryPayload(form) {
    const imageFile = field(form, "imageFile").files[0];
    const videoFile = field(form, "videoFile").files[0];
    const uploaded = await api.uploadMedia(videoFile || imageFile);
    const type = uploaded?.type || field(form, "type").value || "image";
    const media = uploaded?.url || field(form, "image").value.trim();
    return {
      id: field(form, "id").value || api.makeId("g"),
      title: field(form, "title").value.trim(),
      type,
      image: media || "assets/arxa-logo.jpeg",
    };
  }

  async function careerPayload(form) {
    const imageFile = field(form, "imageFile").files[0];
    const uploaded = imageFile ? await api.uploadMedia(imageFile) : null;
    return {
      id: field(form, "id").value || api.makeId("c"),
      title: field(form, "title").value.trim(),
      description: field(form, "description").value.trim(),
      image: uploaded?.url || field(form, "image").value.trim() || "assets/logo-transparent.png",
      link: field(form, "link").value.trim(),
    };
  }

  function userPayload(form) {
    return {
      id: field(form, "id").value || api.makeId("u"),
      username: field(form, "username").value.trim(),
      password: field(form, "password").value.trim(),
      role: field(form, "role").value.trim() || "admin",
    };
  }

  function upsert(items, item) {
    const index = items.findIndex((entry) => entry.id === item.id);
    if (index >= 0) items[index] = item;
    else items.unshift(item);
    return items;
  }

  async function runSave(action) {
    try {
      await action();
      alert("Məlumat yadda saxlanıldı.");
    } catch (error) {
      console.error(error);
      alert("Yadda saxlanmadı: " + (error?.message || "Server və ya database xətası."));
    }
  }

  function bindForms() {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = new FormData(loginForm);
      const username = String(data.get("username") || "").trim();
      const password = String(data.get("password") || "").trim();
      try {
        await api.login(username, password);
        loginError.textContent = "";
        setAuthed(true);
      } catch (error) {
        loginError.textContent = "İstifadəçi adı və ya şifrə yanlışdır.";
      }
    });

    productForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      await runSave(async () => {
        const payload = await productPayload(productForm);
        await api.saveProducts(upsert(api.getProducts(), payload));
        closeForm("product");
        renderAll();
      });
    });

    storeForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      await runSave(async () => {
        const payload = await storePayload(storeForm);
        await api.saveStores(upsert(api.getStores(), payload));
        closeForm("store");
        renderAll();
      });
    });

    galleryForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      await runSave(async () => {
        const payload = await galleryPayload(galleryForm);
        await api.saveGallery(upsert(api.getGallery(), payload));
        closeForm("gallery");
        renderAll();
      });
    });


    careerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      await runSave(async () => {
        const payload = await careerPayload(careerForm);
        await api.saveCareers(upsert(api.getCareers(), payload));
        closeForm("career");
        renderAll();
      });
    });


    userForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const payload = userPayload(userForm);
      const existing = api.getUsers().find((entry) => entry.username === payload.username && entry.id !== payload.id);
      if (existing) {
        alert("Bu istifadəçi adı artıq mövcuddur.");
        return;
      }
      if (!isMainAdmin()) { alert("İstifadəçi əlavə etmək üçün Admin rolu lazımdır."); return; }
      await runSave(async () => {
        await api.saveUsers(upsert(api.getUsers(), payload));
        closeForm("user");
        renderAll();
      });
    });

    settingsForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      await runSave(async () => {
        await api.saveSettings({
          phone: field(settingsForm, "phone").value.trim(),
          email: field(settingsForm, "email").value.trim(),
          instagram: field(settingsForm, "instagram").value.trim(),
          linkedin: field(settingsForm, "linkedin").value.trim(),
          wolt: field(settingsForm, "wolt").value.trim(),
          officeAddress: field(settingsForm, "officeAddress").value.trim(),
          officeHours: field(settingsForm, "officeHours").value.trim(),
          storeHours: field(settingsForm, "storeHours").value.trim(),
          hours: field(settingsForm, "hours").value.trim() || field(settingsForm, "storeHours").value.trim(),
        });
        renderAll();
      });
    });
  }

  function bindActions() {
    window.addEventListener("hashchange", renderRoute);

    document.getElementById("logoutBtn").addEventListener("click", async () => {
      try { await fetch("api.php?action=logout", { method: "POST", headers: { "X-Admin-Token": localStorage.getItem("alcopoint_admin_auth") || "" } }); } catch (_) {}
      setAuthed(false);
    });
    document.getElementById("importProductsBtn").addEventListener("click", importProductsFromFile);
    document.getElementById("downloadTemplateBtn").addEventListener("click", downloadTemplate);
    document.getElementById("importWoltBtn").addEventListener("click", () => {
      importFromWoltLink().catch((error) => {
        importStatus.textContent = error.message || "Wolt importu alınmadı.";
      });
    });
    document.getElementById("resetDemoBtn").addEventListener("click", async () => {
      if (!confirm("Bütün məhsul, filial və qalereya məlumatları ilkin vəziyyətə qaytarılsın?")) return;
      await api.resetData();
      renderAll();
    });

    document.addEventListener("click", async (event) => {
      const openButton = event.target.closest("[data-open-form]");
      if (openButton) openForm(openButton.dataset.openForm);

      const cancelButton = event.target.closest("[data-cancel-form]");
      if (cancelButton) closeForm(cancelButton.dataset.cancelForm);

      const editProductButton = event.target.closest("[data-edit-product]");
      if (editProductButton) editProduct(editProductButton.dataset.editProduct);

      const editStoreButton = event.target.closest("[data-edit-store]");
      if (editStoreButton) editStore(editStoreButton.dataset.editStore);

      const editGalleryButton = event.target.closest("[data-edit-gallery]");
      if (editGalleryButton) editGallery(editGalleryButton.dataset.editGallery);

      const editCareerButton = event.target.closest("[data-edit-career]");
      if (editCareerButton) editCareer(editCareerButton.dataset.editCareer);

      const editUserButton = event.target.closest("[data-edit-user]");
      if (editUserButton) editUser(editUserButton.dataset.editUser);

      const deleteProductButton = event.target.closest("[data-delete-product]");
      if (deleteProductButton && confirm("Məhsul silinsin?")) {
        await api.saveProducts(api.getProducts().filter((item) => item.id !== deleteProductButton.dataset.deleteProduct));
        renderAll();
      }

      const deleteStoreButton = event.target.closest("[data-delete-store]");
      if (deleteStoreButton && confirm("Filial silinsin?")) {
        await api.saveStores(api.getStores().filter((item) => item.id !== deleteStoreButton.dataset.deleteStore));
        renderAll();
      }

      const deleteGalleryButton = event.target.closest("[data-delete-gallery]");
      if (deleteGalleryButton && confirm("Media silinsin?")) {
        await api.saveGallery(api.getGallery().filter((item) => item.id !== deleteGalleryButton.dataset.deleteGallery));
        renderAll();
      }

      const deleteCareerButton = event.target.closest("[data-delete-career]");
      if (deleteCareerButton && confirm("Karyera məlumatı silinsin?")) {
        await api.saveCareers(api.getCareers().filter((item) => item.id !== deleteCareerButton.dataset.deleteCareer));
        renderAll();
      }

      const deleteUserButton = event.target.closest("[data-delete-user]");
      if (deleteUserButton && api.getUsers().length > 1 && confirm("İstifadəçi silinsin?")) {
        await api.saveUsers(api.getUsers().filter((item) => item.id !== deleteUserButton.dataset.deleteUser));
        renderAll();
      }
    });
  }

  bindForms();
  bindActions();
  renderAuth();
})();
