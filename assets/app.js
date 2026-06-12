(function () {
  const api = window.AlcoPoint;
  const state = {
    category: "all",
    productSearch: "",
    storeSearch: "",
    userLocation: null,
  };

  const translations = {
    az: {
      pageTitle: "AlcoPoint.az", nearestShort: "Yaxın filial", ageEyebrow: "18+ yaş təsdiqi", ageText: "Saytda alkoqollu içkilər haqqında məlumat yerləşdirilib. Davam etmək üçün 18 yaşdan yuxarı olduğunuzu təsdiq edin.", ageButton: "18 yaşdan yuxarıyam",
      navProducts: "Məhsullar", navStores: "Filiallar", navGallery: "Qalereya", navCareer: "Karyera", navContact: "Əlaqə", heroEyebrow: "Bakı üzrə premium içki mağazaları", heroCopy: "Orijinal məhsullar, zövqlü seçimlər və şəhərin əsas ünvanlarında rahat filial şəbəkəsi.", heroProductsBtn: "Məhsullara bax", heroNearestBtn: "Mənə ən yaxın filial", statStoresLabel: "filial", statProductsLabel: "məhsul", statHoursLabel: "mağaza iş saatı", feature1Title: "Seçilmiş içki çeşidləri", feature1Text: "AlcoPoint MMC keyfiyyətli spirtli içkiləri, hədiyyəlik dəstləri və gündəlik seçimləri bir ünvanda təqdim edir.", feature2Title: "Rahat filial şəbəkəsi", feature2Text: "Bakı üzrə filiallarımız sizə yaxın ünvanlarda xidmət göstərir və alış-verişi daha rahat edir.", feature3Title: "Operativ yenilənən məlumatlar", feature3Text: "Məhsul siyahısı, kampaniyalar, qalereya və filial məlumatları daim aktual saxlanılır.", catalogEyebrow: "Kataloq", productsText: "Kateqoriya və axtarışla məhsulları sürətli tapın.", searchLabel: "Axtarış", productPlaceholder: "Məsələn: viski, konyak...", locationEyebrow: "Lokasiya ilə sıralama", nearestTitle: "Ən yaxın filialı tapın", nearestText: "İcazə verdiyiniz zaman filiallar məsafəyə görə sıralanır və ən yaxın ünvan yuxarı qalxır.", useLocation: "Lokasiyadan istifadə et", locationNotAllowed: "Lokasiya icazəsi verilməyib.", addressesEyebrow: "Ünvanlar", storesText: "Filialları axtarın və lokasiyanıza görə ən yaxın ünvanı birinci görün.", storeSearchLabel: "Filial axtar", storePlaceholder: "Rayon, küçə və ya filial adı", mapEyebrow: "Xəritə", mapTitle: "Mağazalar xəritədə", mapText: "Bütün filiallarımız xəritədə nöqtələr kimi göstərilir. Nöqtəyə klikləyib ünvanı görə və Google Maps-də aça bilərsiniz.", visualEyebrow: "Vizual", galleryText: "Admin paneldə yüklənən şəkil və videolar burada görünür.", careerEyebrow: "Komandamıza qoşulun", careerText: "AlcoPoint MMC-də vakansiyalar, komanda xəbərləri və iş imkanları.", contactEyebrow: "Əlaqə və iş saatı", contactTitle: "AlcoPoint ilə əlaqə saxlayın", contactText: "Suallar, məhsul mövcudluğu və filial məlumatları üçün bizə yazın.", officeTitle: "Mərkəzi Ofis", storesTitle: "Mağazalar", sevenDays: "Həftənin 7 günü", footerResponsible: "Drink responsibly. 18+ yaş məhdudiyyəti.", all: "Hamısı", popular: "Populyar", productFallback: "Məhsul", noProducts: "Axtarışa uyğun məhsul tapılmadı.", noStores: "Bu axtarış üzrə filial tapılmadı.", nearestLabel: "Ən yaxın filial", mapOpen: "Xəritədə aç", mapOpenGoogle: "Google Maps-də aç", phoneMissing: "Telefon əlavə edilməyib", hoursMissing: "İş saatı əlavə edilməyib", addressMissing: "Ünvan əlavə edilməyib", locationGetting: "Lokasiya alınır...", locationUnsupported: "Brauzeriniz lokasiya funksiyasını dəstəkləmir.", locationDenied: "Lokasiya icazəsi verilmədi. Filiallar standart sıra ilə göstərilir.", nearestPrefix: "Sizə ən yaxın", distanceAt: "məsafədə", mapLibraryError: "Xəritə kitabxanası yüklənmədi. İnternet bağlantısını yoxlayın.", mapNoCoords: "Koordinatı olan filial tapılmadı. Admin paneldə filiallara latitude/longitude əlavə edin.", mapShown: "filial xəritədə göstərilir.", noGallery: "Qalereyada şəkil yoxdur.", careerTag: "Karyera", apply: "Müraciət et", noCareers: "Hazırda karyera məlumatı əlavə edilməyib.", lightMode: "Ağ rejim", darkMode: "Qara rejim", woltFloating: "Wolt-da bizi tapın"
    },
    ru: {
      pageTitle: "AlcoPoint.az", nearestShort: "Ближайший", ageEyebrow: "Подтверждение 18+", ageText: "На сайте размещена информация об алкогольной продукции. Подтвердите, что вам исполнилось 18 лет, чтобы продолжить.", ageButton: "Мне есть 18 лет", navProducts: "Продукты", navStores: "Филиалы", navGallery: "Галерея", navCareer: "Карьера", navContact: "Контакты", heroEyebrow: "Премиальные алкогольные магазины в Баку", heroCopy: "Оригинальная продукция, продуманный выбор и удобная сеть филиалов в ключевых точках города.", heroProductsBtn: "Смотреть продукты", heroNearestBtn: "Найти ближайший филиал", statStoresLabel: "филиалов", statProductsLabel: "продуктов", statHoursLabel: "часы работы магазинов", feature1Title: "Отборный ассортимент", feature1Text: "AlcoPoint MMC предлагает качественные алкогольные напитки, подарочные наборы и повседневные варианты в одном месте.", feature2Title: "Удобная сеть филиалов", feature2Text: "Наши филиалы в Баку расположены рядом с вами и делают покупки удобнее.", feature3Title: "Актуальная информация", feature3Text: "Список товаров, акции, галерея и данные филиалов постоянно обновляются.", catalogEyebrow: "Каталог", productsText: "Быстро находите товары по категории и поиску.", searchLabel: "Поиск", productPlaceholder: "Например: виски, коньяк...", locationEyebrow: "Сортировка по локации", nearestTitle: "Найдите ближайший филиал", nearestText: "После разрешения филиалы сортируются по расстоянию, а ближайший адрес поднимается наверх.", useLocation: "Использовать локацию", locationNotAllowed: "Доступ к локации не предоставлен.", addressesEyebrow: "Адреса", storesText: "Ищите филиалы и смотрите ближайший адрес первым.", storeSearchLabel: "Поиск филиала", storePlaceholder: "Район, улица или название филиала", mapEyebrow: "Карта", mapTitle: "Магазины на карте", mapText: "Все филиалы показаны на карте точками. Нажмите на точку, чтобы увидеть адрес и открыть в Google Maps.", visualEyebrow: "Визуал", galleryText: "Загруженные в админ-панели фото и видео отображаются здесь.", careerEyebrow: "Присоединяйтесь к команде", careerText: "Вакансии, новости команды и карьерные возможности в AlcoPoint MMC.", contactEyebrow: "Контакты и часы работы", contactTitle: "Свяжитесь с AlcoPoint", contactText: "Напишите нам по вопросам наличия товаров и информации о филиалах.", officeTitle: "Центральный офис", storesTitle: "Магазины", sevenDays: "7 дней в неделю", footerResponsible: "Потребляйте ответственно. Ограничение 18+.", all: "Все", popular: "Популярное", productFallback: "Продукт", noProducts: "Товары по запросу не найдены.", noStores: "Филиалы по этому запросу не найдены.", nearestLabel: "Ближайший филиал", mapOpen: "Открыть на карте", mapOpenGoogle: "Открыть в Google Maps", phoneMissing: "Телефон не добавлен", hoursMissing: "Часы работы не добавлены", addressMissing: "Адрес не добавлен", locationGetting: "Получаем локацию...", locationUnsupported: "Ваш браузер не поддерживает геолокацию.", locationDenied: "Доступ к локации не предоставлен. Филиалы показаны в стандартном порядке.", nearestPrefix: "Ближайший к вам", distanceAt: "от вас", mapLibraryError: "Карта не загрузилась. Проверьте интернет-соединение.", mapNoCoords: "Филиалы с координатами не найдены. Добавьте latitude/longitude в админ-панели.", mapShown: "филиалов показано на карте.", noGallery: "В галерее пока нет изображений.", careerTag: "Карьера", apply: "Откликнуться", noCareers: "Информация о карьере пока не добавлена.", woltFloating: "Найдите нас в Wolt", lightMode: "Светлый режим", darkMode: "Темный режим"
    },
    en: {
      pageTitle: "AlcoPoint.az", nearestShort: "Nearest store", ageEyebrow: "18+ confirmation", ageText: "This website contains information about alcoholic beverages. Please confirm that you are over 18 to continue.", ageButton: "I am over 18", navProducts: "Products", navStores: "Stores", navGallery: "Gallery", navCareer: "Career", navContact: "Contact", heroEyebrow: "Premium beverage stores across Baku", heroCopy: "Original products, refined selections and a convenient branch network across key city locations.", heroProductsBtn: "View products", heroNearestBtn: "Find my nearest store", statStoresLabel: "stores", statProductsLabel: "products", statHoursLabel: "store working hours", feature1Title: "Curated beverage range", feature1Text: "AlcoPoint MMC offers quality alcoholic beverages, gift sets and everyday selections in one place.", feature2Title: "Convenient store network", feature2Text: "Our Baku branches serve you at nearby addresses and make shopping easier.", feature3Title: "Always updated information", feature3Text: "Product lists, campaigns, gallery and branch details are kept up to date.", catalogEyebrow: "Catalog", productsText: "Find products quickly by category and search.", searchLabel: "Search", productPlaceholder: "For example: whisky, cognac...", locationEyebrow: "Location-based sorting", nearestTitle: "Find the nearest store", nearestText: "When permission is granted, stores are sorted by distance and the closest address moves to the top.", useLocation: "Use location", locationNotAllowed: "Location permission has not been granted.", addressesEyebrow: "Addresses", storesText: "Search stores and see the nearest address first based on your location.", storeSearchLabel: "Store search", storePlaceholder: "District, street or branch name", mapEyebrow: "Map", mapTitle: "Stores on the map", mapText: "All branches are displayed as points on the map. Click a point to see the address and open it in Google Maps.", visualEyebrow: "Visual", galleryText: "Photos and videos uploaded from the admin panel appear here.", careerEyebrow: "Join our team", careerText: "Vacancies, team news and career opportunities at AlcoPoint MMC.", contactEyebrow: "Contact and working hours", contactTitle: "Contact AlcoPoint", contactText: "Write to us for product availability and branch information.", officeTitle: "Head Office", storesTitle: "Stores", sevenDays: "7 days a week", footerResponsible: "Drink responsibly. 18+ only.", all: "All", popular: "Popular", productFallback: "Product", noProducts: "No products matched your search.", noStores: "No stores matched this search.", nearestLabel: "Nearest store", mapOpen: "Open on map", mapOpenGoogle: "Open in Google Maps", phoneMissing: "Phone number is not added", hoursMissing: "Working hours are not added", addressMissing: "Address is not added", locationGetting: "Getting location...", locationUnsupported: "Your browser does not support geolocation.", locationDenied: "Location permission was denied. Stores are shown in the default order.", nearestPrefix: "Nearest to you", distanceAt: "away", mapLibraryError: "Map library failed to load. Check your internet connection.", mapNoCoords: "No stores with coordinates found. Add latitude/longitude in the admin panel.", mapShown: "stores are shown on the map.", noGallery: "No images in the gallery yet.", careerTag: "Career", apply: "Apply", noCareers: "No career information has been added yet.", woltFloating: "Find us on Wolt", lightMode: "Light mode", darkMode: "Dark mode"
    }
  };
  const prefKeys = { lang: "alcopoint_lang", theme: "alcopoint_theme" };
  let currentLang = localStorage.getItem(prefKeys.lang) || "az";
  let currentTheme = localStorage.getItem(prefKeys.theme) || "dark";
  function t(key) { return (translations[currentLang] && translations[currentLang][key]) || translations.az[key] || key; }
  function applyStaticLanguage() {
    document.documentElement.lang = currentLang;
    document.title = t("pageTitle");
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    document.querySelectorAll("#languageSelect,#mobileLanguageSelect").forEach((el) => { if (el) el.value = currentLang; });
  }
  function applyTheme() {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(`theme-${currentTheme}`);
    const icon = currentTheme === "dark" ? "☀️" : "🌙";
    const label = currentTheme === "dark" ? t("lightMode") : t("darkMode");
    document.querySelectorAll("#themeToggle,#mobileThemeToggle").forEach((btn) => { if (btn) { btn.textContent = icon; btn.title = label; btn.setAttribute("aria-label", label); } });
  }


  let storesMap = null;
  let storesMarkers = null;

  const productGrid = document.getElementById("productGrid");
  const storeGrid = document.getElementById("storeGrid");
  const galleryGrid = document.getElementById("galleryGrid");
  const careerGrid = document.getElementById("careerGrid");
  const categoryTabs = document.getElementById("categoryTabs");
  const productSearch = document.getElementById("productSearch");
  const storeSearch = document.getElementById("storeSearch");
  const mobileNav = document.getElementById("mobileNav");
  const menuToggle = document.getElementById("menuToggle");
  const nearestStoreBtn = document.getElementById("nearestStoreBtn");
  const nearestHeroBtn = document.getElementById("nearestHeroBtn");
  const nearestHeaderBtn = document.getElementById("nearestHeaderBtn");
  const nearestStatus = document.getElementById("nearestStatus");
  const nearestMini = document.getElementById("nearestMini");

  function toRad(value) {
    return (Number(value) * Math.PI) / 180;
  }

  function distanceKm(lat1, lng1, lat2, lng2) {
    if ([lat1, lng1, lat2, lng2].some((v) => v === "" || v === null || v === undefined || Number.isNaN(Number(v)))) return null;
    const R = 6371;
    const dLat = toRad(Number(lat2) - Number(lat1));
    const dLng = toRad(Number(lng2) - Number(lng1));
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }

  function enrichedStores() {
    const term = state.storeSearch.trim().toLowerCase();
    return api.getStores()
      .filter((store) => `${store.name} ${store.address}`.toLowerCase().includes(term))
      .map((store) => ({
        ...store,
        distance: state.userLocation ? distanceKm(state.userLocation.lat, state.userLocation.lng, store.lat, store.lng) : null,
      }))
      .sort((a, b) => {
        if (!state.userLocation) return 0;
        const da = a.distance ?? Number.POSITIVE_INFINITY;
        const db = b.distance ?? Number.POSITIVE_INFINITY;
        return da - db;
      });
  }

  function distanceText(store) {
    if (store.distance === null || store.distance === undefined) return "";
    return store.distance < 1 ? `${Math.round(store.distance * 1000)} m` : `${store.distance.toFixed(1)} km`;
  }

  function updateNearestUI(stores) {
    const nearest = stores.find((store) => store.distance !== null && store.distance !== undefined);
    if (!nearest) return;
    const text = `${t("nearestPrefix")}: ${nearest.name} · ${distanceText(nearest)}`;
    if (nearestStatus) nearestStatus.textContent = text;
    if (nearestMini) {
      nearestMini.hidden = false;
      nearestMini.innerHTML = `<strong>${api.escapeHTML(nearest.name)}</strong><span>${api.escapeHTML(distanceText(nearest))} ${api.escapeHTML(t("distanceAt"))}</span>`;
    }
  }

  function requestLocation() {
    if (!navigator.geolocation) {
      if (nearestStatus) nearestStatus.textContent = t("locationUnsupported");
      return;
    }
    if (nearestStatus) nearestStatus.textContent = t("locationGetting");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        state.userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
        renderStores();
        document.getElementById("stores")?.scrollIntoView({ behavior: "smooth" });
      },
      () => {
        if (nearestStatus) nearestStatus.textContent = t("locationDenied");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
    );
  }

  function productImage(product) {
    if (product.image) {
      return `<img src="${api.escapeHTML(product.image)}" alt="${api.escapeHTML(product.name)}" />`;
    }

    return `
      <div class="product-placeholder">
        <img src="assets/logo-transparent.png" alt="" />
        <span>${api.escapeHTML(product.category)}</span>
      </div>
    `;
  }

  function renderCategories() {
    const productCategories = api.getProducts().map((product) => product.category).filter(Boolean);
    const all = ["all", ...new Set([...api.categories, ...productCategories])];
    categoryTabs.innerHTML = all
      .map(
        (category) => `
          <button class="${state.category === category ? "active" : ""}" data-category="${api.escapeHTML(category)}" type="button">
            ${api.escapeHTML(category === "all" ? t("all") : category)}
          </button>
        `,
      )
      .join("");
  }

  function renderProducts() {
    const term = state.productSearch.trim().toLowerCase();
    const products = api.getProducts().filter((product) => {
      const matchesCategory = state.category === "all" || product.category === state.category;
      const haystack = `${product.name} ${product.brand} ${product.category} ${product.description}`.toLowerCase();
      return matchesCategory && haystack.includes(term);
    });

    document.getElementById("statProducts").textContent = String(api.getProducts().length);

    productGrid.innerHTML = products.length
      ? products
          .map(
            (product) => `
              <article class="product-card">
                <div class="product-media">
                  ${product.featured ? `<span class="badge">${api.escapeHTML(t("popular"))}</span>` : ""}
                  ${productImage(product)}
                </div>
                <div class="product-info">
                  <span>${api.escapeHTML(product.brand || product.category)}</span>
                  <h3>${api.escapeHTML(product.name)}</h3>
                  <p>${api.escapeHTML(product.description || "")}</p>
                  <div class="card-meta">
                    <strong>${api.escapeHTML(product.category || t("productFallback"))}</strong>
                    <small>${api.escapeHTML(product.volume || "")}</small>
                  </div>
                </div>
              </article>
            `,
          )
          .join("")
      : `<div class="empty-state">${api.escapeHTML(t("noProducts"))}</div>`;
  }


  function renderStoreMap(stores) {
    const mapEl = document.getElementById("storesMap");
    const noteEl = document.getElementById("mapNote");
    if (!mapEl || typeof L === "undefined") {
      if (noteEl) noteEl.textContent = t("mapLibraryError");
      return;
    }

    const points = stores
      .map((store) => ({ ...store, latNum: Number(store.lat), lngNum: Number(store.lng) }))
      .filter((store) => Number.isFinite(store.latNum) && Number.isFinite(store.lngNum));

    if (!storesMap) {
      storesMap = L.map(mapEl, { scrollWheelZoom: false }).setView([40.4093, 49.8671], 11);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(storesMap);
      storesMarkers = L.layerGroup().addTo(storesMap);
    }

    storesMarkers.clearLayers();

    if (!points.length) {
      if (noteEl) noteEl.textContent = t("mapNoCoords");
      storesMap.setView([40.4093, 49.8671], 11);
      setTimeout(() => storesMap.invalidateSize(), 100);
      return;
    }

    const bounds = [];
    points.forEach((store, index) => {
      const marker = L.marker([store.latNum, store.lngNum]).addTo(storesMarkers);
      const distance = store.distance !== null && store.distance !== undefined ? `<br><b>Məsafə:</b> ${api.escapeHTML(distanceText(store))}` : "";
      marker.bindPopup(`
        <div class="map-popup">
          <strong>${api.escapeHTML(store.name)}</strong><br>
          ${api.escapeHTML(store.address || t("addressMissing"))}<br>
          <span>${api.escapeHTML(store.hours || "09:00 - 01:00")}</span>
          ${distance}<br>
          <a href="${api.escapeHTML(api.mapLink(store))}" target="_blank" rel="noreferrer">${api.escapeHTML(t("mapOpenGoogle"))}</a>
        </div>
      `);
      if (index === 0 && state.userLocation) marker.openPopup();
      bounds.push([store.latNum, store.lngNum]);
    });

    if (bounds.length === 1) {
      storesMap.setView(bounds[0], 14);
    } else {
      storesMap.fitBounds(bounds, { padding: [30, 30] });
    }
    if (noteEl) noteEl.textContent = `${points.length} ${t("mapShown")}`;
    setTimeout(() => storesMap.invalidateSize(), 100);
  }

  function renderStores() {
    const stores = enrichedStores();

    document.getElementById("statStores").textContent = String(api.getStores().length);
    updateNearestUI(stores);

    storeGrid.innerHTML = stores.length
      ? stores
          .map(
            (store, index) => `
              <article class="store-card ${index === 0 && state.userLocation ? "nearest" : ""}">
                <div class="store-art">
                  ${
                    store.image
                      ? `<img src="${api.escapeHTML(store.image)}" alt="${api.escapeHTML(store.name)}" />`
                      : `<img src="assets/logo-transparent.png" alt="" />`
                  }
                </div>
                <div>
                  <div class="store-title-row">
                    <h3>${api.escapeHTML(store.name)}</h3>
                    ${store.distance !== null && store.distance !== undefined ? `<span class="distance-pill">${api.escapeHTML(distanceText(store))}</span>` : ""}
                  </div>
                  ${index === 0 && state.userLocation ? `<span class="nearest-label">${api.escapeHTML(t("nearestLabel"))}</span>` : ""}
                  <p>${api.escapeHTML(store.address)}</p>
                  <ul>
                    <li>${api.escapeHTML(store.phone || t("phoneMissing"))}</li>
                    <li>${api.escapeHTML(store.hours || t("hoursMissing"))}</li>
                  </ul>
                  <a href="${api.escapeHTML(api.mapLink(store))}" target="_blank" rel="noreferrer">${api.escapeHTML(t("mapOpen"))}</a>
                </div>
              </article>
            `,
          )
          .join("")
      : `<div class="empty-state">${api.escapeHTML(t("noStores"))}</div>`;

    renderStoreMap(stores);
  }

  function renderGallery() {
    const gallery = api.getGallery();
    galleryGrid.innerHTML = gallery.length
      ? gallery
          .map(
            (item) => `
              <figure class="gallery-card">
                ${item.type === "video"
                  ? `<video src="${api.escapeHTML(item.image)}" controls muted playsinline></video>`
                  : `<img src="${api.escapeHTML(item.image)}" alt="${api.escapeHTML(item.title)}" />`}
                <figcaption>${api.escapeHTML(item.title)}</figcaption>
              </figure>
            `,
          )
          .join("")
      : `<div class="empty-state">${api.escapeHTML(t("noGallery"))}</div>`;
  }

  function renderCareers() {
    const careers = api.getCareers ? api.getCareers() : [];
    if (!careerGrid) return;
    careerGrid.innerHTML = careers.length
      ? careers
          .map((item) => `
            <article class="career-card">
              <div class="career-media">
                <img src="${api.escapeHTML(item.image || "assets/logo-transparent.png")}" alt="${api.escapeHTML(item.title)}" />
              </div>
              <div class="career-info">
                <span>${api.escapeHTML(t("careerTag"))}</span>
                <h3>${api.escapeHTML(item.title)}</h3>
                <p>${api.escapeHTML(item.description || "")}</p>
                ${item.link ? `<a class="outline-btn small" href="${api.escapeHTML(item.link)}" target="_blank" rel="noreferrer">${api.escapeHTML(t("apply"))}</a>` : ""}
              </div>
            </article>
          `)
          .join("")
      : `<div class="empty-state">${api.escapeHTML(t("noCareers"))}</div>`;
  }

  function renderSettings() {
    const settings = api.getSettings();
    const instagram = settings.instagram || "https://www.instagram.com/alcopoint.az";
    const linkedin = settings.linkedin || "https://www.linkedin.com/company/alcopoint";
    const wolt = settings.wolt || "https://wolt.com/en/aze/baku/brand/alcopoint";
    const officeAddress = settings.officeAddress || "Aşıq Molla Cümə küçəsi, 1/5";
    const officeHours = settings.officeHours || "09:00 - 18:00";
    const storeHours = settings.storeHours || settings.hours || "09:00 - 01:00";
    const instagramLink = document.getElementById("instagramLink");
    const linkedinLink = document.getElementById("linkedinLink");
    const footerInstagramLink = document.getElementById("footerInstagramLink");
    const footerLinkedinLink = document.getElementById("footerLinkedinLink");
    const emailLink = document.getElementById("emailLink");
    const floatingWoltLink = document.getElementById("floatingWoltLink");
    [instagramLink, footerInstagramLink].forEach((link) => { if (link) link.href = instagram; });
    [linkedinLink, footerLinkedinLink].forEach((link) => { if (link) link.href = linkedin; });
    if (emailLink) emailLink.href = `mailto:${settings.email || "alcopointstore@gmail.com"}`;
    if (floatingWoltLink) floatingWoltLink.href = wolt;
    const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
    setText("officeAddressText", officeAddress);
    setText("officeHoursText", officeHours);
    setText("storeHoursText", storeHours);
    setText("footerOfficeAddress", officeAddress);
    setText("footerOfficeHours", officeHours);
    setText("footerStoreHours", storeHours);
  }

  function initAgeGate() {
    const gate = document.getElementById("ageGate");
    const confirm = document.getElementById("confirmAge");
    if (localStorage.getItem(api.keys.age) === "true") {
      gate.classList.add("hidden");
    }
    confirm.addEventListener("click", () => {
      localStorage.setItem(api.keys.age, "true");
      gate.classList.add("hidden");
    });
  }

  function bindEvents() {
    categoryTabs.addEventListener("click", (event) => {
      const target = event.target.closest("[data-category]");
      if (!target) return;
      state.category = target.dataset.category;
      renderCategories();
      renderProducts();
    });

    productSearch.addEventListener("input", (event) => {
      state.productSearch = event.target.value;
      renderProducts();
    });

    storeSearch.addEventListener("input", (event) => {
      state.storeSearch = event.target.value;
      renderStores();
    });

    document.querySelectorAll("#languageSelect,#mobileLanguageSelect").forEach((select) => {
      if (select) select.addEventListener("change", (event) => {
        currentLang = event.target.value;
        localStorage.setItem(prefKeys.lang, currentLang);
        applyStaticLanguage();
        applyTheme();
        renderCategories(); renderProducts(); renderStores(); renderGallery(); renderCareers(); renderSettings();
      });
    });

    document.querySelectorAll("#themeToggle,#mobileThemeToggle").forEach((button) => {
      if (button) button.addEventListener("click", () => {
        currentTheme = currentTheme === "dark" ? "light" : "dark";
        localStorage.setItem(prefKeys.theme, currentTheme);
        applyTheme();
      });
    });

    [nearestStoreBtn, nearestHeroBtn, nearestHeaderBtn].forEach((button) => {
      if (button) button.addEventListener("click", requestLocation);
    });

    menuToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
      menuToggle.classList.toggle("open");
    });

    mobileNav.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuToggle.classList.remove("open");
    });
  }

  async function init() {
    await api.init();
    initAgeGate();
    applyStaticLanguage();
    applyTheme();
    renderCategories();
    renderProducts();
    renderStores();
    renderGallery();
    renderCareers();
    renderSettings();
    bindEvents();
  }

  init();
})();
