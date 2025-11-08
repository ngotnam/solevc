// =====================
// Cấu hình mặc định
// =====================
const defaultConfig = {
  background_color: "#1e40af",
  surface_color: "#ffffff",
  text_color: "#1f2937",
  primary_action_color: "#ffffff",
  secondary_action_color: "#3b82f6",
  font_family: "Inter",
  font_size: 16,
  company_name: "SOL EVC",
  hero_title: "Hệ Thống Trạm Sạc Xe Điện Thông Minh",
  hero_subtitle: "Giải pháp sạc toàn diện cho ô tô và xe máy điện tất cả các hãng",
  car_charging_title: "Trạm Sạc Ô Tô Điện",
  motorbike_charging_title: "Trạm Sạc Xe Máy Điện",
  basic_circuit: "SOL EVC Basic",
  plus_circuit: "SOL EVC Plus",
  pro_circuit: "SOL EVC Pro",
  contact_title: "Liên Hệ Với Chúng Tôi",
  company_address: "123 Đường ABC, Quận XYZ, TP.HCM",
  company_phone: "0123 456 789",
  company_email: "info@solevc.com"
};

function setTextContent(id, value, fallback) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || fallback;
}

function updateConfigField(config, key, value) {
  config[key] = value;
  if (window.elementSdk && typeof window.elementSdk.setConfig === "function") {
    window.elementSdk.setConfig({ [key]: value });
  }
}

// Cập nhật UI khi config thay đổi
async function onConfigChange(config) {
  const customFont = config.font_family || defaultConfig.font_family;
  const baseFontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  const baseSize = config.font_size || defaultConfig.font_size;

  const backgroundColor = config.background_color || defaultConfig.background_color;
  const surfaceColor = config.surface_color || defaultConfig.surface_color;
  const textColor = config.text_color || defaultConfig.text_color;
  const primaryActionColor = config.primary_action_color || defaultConfig.primary_action_color;
  const secondaryActionColor = config.secondary_action_color || defaultConfig.secondary_action_color;

  document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;
  document.body.style.fontSize = `${baseSize}px`;
  document.body.style.color = textColor;

  const heroSection = document.querySelector('.gradient-bg');
  if (heroSection) {
    heroSection.style.background =
      `linear-gradient(135deg, ${backgroundColor} 0%, ${secondaryActionColor} 50%, #06b6d4 100%)`;
  }

  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.style.backgroundColor = surfaceColor;
    navbar.style.color = textColor;
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.style.color = textColor;
  });

  const companyNameEl = document.getElementById('company-name');
  if (companyNameEl) {
    companyNameEl.style.color = backgroundColor;
    companyNameEl.textContent = config.company_name || defaultConfig.company_name;
  }

  document.querySelectorAll('.charging-animation').forEach(icon => {
    icon.style.color = primaryActionColor;
  });

  document.querySelectorAll('.card-hover').forEach(card => {
    card.style.backgroundColor = surfaceColor;
    card.style.color = textColor;
  });

  document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.classList.contains('bg-white')) {
      button.style.backgroundColor = primaryActionColor;
      button.style.color = backgroundColor;
    } else {
      button.style.backgroundColor = backgroundColor;
      button.style.color = primaryActionColor;
    }
  });

  setTextContent('hero-title', config.hero_title, defaultConfig.hero_title);
  setTextContent('hero-subtitle', config.hero_subtitle, defaultConfig.hero_subtitle);
  setTextContent('car-charging-title', config.car_charging_title, defaultConfig.car_charging_title);
  setTextContent('motorbike-charging-title', config.motorbike_charging_title, defaultConfig.motorbike_charging_title);
  setTextContent('basic-circuit', config.basic_circuit, defaultConfig.basic_circuit);
  setTextContent('plus-circuit', config.plus_circuit, defaultConfig.plus_circuit);
  setTextContent('pro-circuit', config.pro_circuit, defaultConfig.pro_circuit);
  setTextContent('contact-title', config.contact_title, defaultConfig.contact_title);
  setTextContent('company-address', config.company_address, defaultConfig.company_address);
  setTextContent('company-phone', config.company_phone, defaultConfig.company_phone);
  setTextContent('company-email', config.company_email, defaultConfig.company_email);

  document.querySelectorAll('h1').forEach(el => el.style.fontSize = `${baseSize * 3}px`);
  document.querySelectorAll('h2').forEach(el => el.style.fontSize = `${baseSize * 2}px`);
  document.querySelectorAll('h3').forEach(el => el.style.fontSize = `${baseSize * 1.5}px`);
  document.querySelectorAll('h4').forEach(el => el.style.fontSize = `${baseSize * 1.125}px`);
  document.querySelectorAll('p').forEach(el => el.style.fontSize = `${baseSize}px`);
}

function mapToCapabilities(config) {
  return {
    recolorables: [
      { get: () => config.background_color || defaultConfig.background_color,
        set: (v) => updateConfigField(config, "background_color", v) },
      { get: () => config.surface_color || defaultConfig.surface_color,
        set: (v) => updateConfigField(config, "surface_color", v) },
      { get: () => config.text_color || defaultConfig.text_color,
        set: (v) => updateConfigField(config, "text_color", v) },
      { get: () => config.primary_action_color || defaultConfig.primary_action_color,
        set: (v) => updateConfigField(config, "primary_action_color", v) },
      { get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
        set: (v) => updateConfigField(config, "secondary_action_color", v) }
    ],
    borderables: [],
    fontEditable: {
      get: () => config.font_family || defaultConfig.font_family,
      set: (v) => updateConfigField(config, "font_family", v)
    },
    fontSizeable: {
      get: () => config.font_size || defaultConfig.font_size,
      set: (v) => updateConfigField(config, "font_size", v)
    }
  };
}

function mapToEditPanelValues(config) {
  return new Map([
    ["company_name", config.company_name || defaultConfig.company_name],
    ["hero_title", config.hero_title || defaultConfig.hero_title],
    ["hero_subtitle", config.hero_subtitle || defaultConfig.hero_subtitle],
    ["car_charging_title", config.car_charging_title || defaultConfig.car_charging_title],
    ["motorbike_charging_title", config.motorbike_charging_title || defaultConfig.motorbike_charging_title],
    ["basic_circuit", config.basic_circuit || defaultConfig.basic_circuit],
    ["plus_circuit", config.plus_circuit || defaultConfig.plus_circuit],
    ["pro_circuit", config.pro_circuit || defaultConfig.pro_circuit],
    ["contact_title", config.contact_title || defaultConfig.contact_title],
    ["company_address", config.company_address || defaultConfig.company_address],
    ["company_phone", config.company_phone || defaultConfig.company_phone],
    ["company_email", config.company_email || defaultConfig.company_email]
  ]);
}

// Điều hướng section SPA
function showSection(sectionName) {
  document.querySelectorAll('.active-section, .hidden-section').forEach(section => {
    section.classList.remove('active-section');
    section.classList.add('hidden-section');
  });

  const targetSection = document.getElementById(sectionName + '-section');
  if (targetSection) {
    targetSection.classList.remove('hidden-section');
    targetSection.classList.add('active-section');
  }
// 🔥 Cuộn lên đầu trang khi chuyển section
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });

  document.querySelectorAll(`[data-section="${sectionName}"]`).forEach(link => {
    link.classList.add('active');
  });

  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) mobileMenu.classList.add('hidden');
}

// Cloudflare challenge snippet (giữ nguyên logic)
(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement('script');
      d.innerHTML =
        "window.__CF$cv$params={r:'99b6f561b46a0799',t:'MTc2MjYyNDcwNy4wMDAwMDA='};" +
        "var a=document.createElement('script');a.nonce='';" +
        "a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';" +
        "document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName('head')[0].appendChild(d);
    }
  }

  if (typeof document !== "undefined") {
    function initIframe() {
      var iframe = document.createElement('iframe');
      iframe.height = 1;
      iframe.width = 1;
      iframe.style.position = 'absolute';
      iframe.style.top = 0;
      iframe.style.left = 0;
      iframe.style.border = 'none';
      iframe.style.visibility = 'hidden';
      document.body.appendChild(iframe);
      a = iframe;
      c();
    }

    var a;
    if (document.readyState !== 'loading') {
      initIframe();
    } else if (window.addEventListener) {
      document.addEventListener('DOMContentLoaded', initIframe);
    } else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        if (document.readyState !== 'loading') {
          document.onreadystatechange = e;
          initIframe();
        }
      };
    }
  }
})();

// Khởi tạo sau khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  // Khởi tạo elementSdk nếu có
  if (window.elementSdk && typeof window.elementSdk.init === "function") {
    window.elementSdk.init({
      defaultConfig,
      onConfigChange,
      mapToCapabilities,
      mapToEditPanelValues
    });
  }

  // Nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      if (section) showSection(section);
    });
  });

  // Mobile menu button
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu) mobileMenu.classList.toggle('hidden');
    });
  }

  // Buttons có data-section (hero, map, v.v.)
  document.querySelectorAll('button[data-section]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const section = button.getAttribute('data-section');
      if (section) showSection(section);
    });
  });

  // Form liên hệ
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formMessage = document.getElementById('form-message');
      if (formMessage) {
        formMessage.textContent =
          'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.';
        formMessage.className =
          'mt-4 p-4 rounded-lg bg-green-100 text-green-800';
        formMessage.classList.remove('hidden');

        setTimeout(() => {
          formMessage.classList.add('hidden');
        }, 5000);
      }

      contactForm.reset();
    });
  }
});
