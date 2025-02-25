const maskOptions = {
   mask: "+{7} (000) 000-00-00",
   // lazy: false,  // make placeholder always visible
   // placeholderChar: '0'     // defaults to '_'
};
if (document.querySelectorAll("[data-phone]").length) {
   document.querySelectorAll("[data-phone]").forEach((item) => {
      const mask = IMask(item, maskOptions);
   });
}
const body = document.body;
document.addEventListener("DOMContentLoaded", () => {
   initProductSlider();
   productCard();
   homePage();
   headerWork();
   if (window.innerWidth <= 1024) {
      accordion(
         ".footer__accordeon .footer__title",
         ".footer__accordeon .collapse"
      );
   }
   collectionCard();
   catalogPage();
});
function headerWork() {
   const main = document.querySelector("main.main");
   const header = document.querySelector(".header");
   const burger = document.querySelector(".header__burger");
   const burgerMenu = document.querySelector(".header-menu");

   function headerScroll() {
      if (main) {
         header.classList.add("light");
         return;
      }
      window.addEventListener("scroll", () => {
         if (window.scrollY > 0) {
            header.classList.add("light");
         } else {
            header.classList.remove("light");
         }
      });
   }
   burger.onclick = () => {
      if (burger.classList.contains("active")) {
         closeBurger();
      } else {
         openBurger();
      }
   };
   function closeBurger() {
      burger.classList.remove("active");
      burgerMenu.classList.remove("active");
      header.classList.remove("dark");

      bodyUnLock();
   }
   function openBurger() {
      burger.classList.add("active");
      burgerMenu.classList.add("active");
      header.classList.add("dark");
      bodyLock();
   }
   function headerAssort() {
      const links = document.querySelectorAll(
         ".header-menu__mains > li > button"
      );
      links.forEach((item) => {
         item.onclick = () => {
            let content = item.closest("li").querySelector(".header-assort");
            if (content) {
               content.classList.add("active");
            }
         };
      });

      const closes = document.querySelectorAll(".header-assort__up button");
      closes.forEach((item) => {
         item.onclick = () => {
            item.closest(".header-assort.active").classList.remove("active");
         };
      });
   }
   function headerCollection() {
      const link = document.querySelector("[data-col]");
      link.onclick = () => {
         let content = link.closest("li").querySelector(".header-collection");
         if (content) {
            content.classList.add("active");
         }
      };

      const close = document.querySelector(".header-collection__up button");

      close.onclick = () => {
         console.log("click close");
         close.closest(".header-collection.active").classList.remove("active");
      };
   }
   headerScroll();
   headerAssort();
   headerCollection();
}
function initProductSlider() {
   if (!document.querySelector(".products-section .swiper")) return;
   let swiper = new Swiper(".products-section .swiper", {
      slidesPerView: "auto",
      spaceBetween: 10,
      navigation: {
         prevEl: ".products-section .swiper-button-prev",
         nextEl: ".products-section .swiper-button-next",
      },
      pagination: {
         el: ".products-section .swiper-pagination",
         type: "progressbar",
      },
      breakpoints: {
         1025: {
            spaceBetween: 15,
            slidesPerView: 4,
         },
         569: {
            spaceBetween: 10,
            slidesPerView: 4,
         },
      },

      mousewheel: {
         enabled: true,
         forceToAxis: true,
      },
   });
}

function homePage() {
   initHeroSlider();
   initCollectionSlider();
   homeInterier();
   initSalesSwiper();
   initBlogSwiper();
   function initCollectionSlider() {
      if (!document.querySelector(".home-collections .swiper")) return;
      let swiper = new Swiper(".home-collections .swiper", {
         slidesPerView: "auto",
         spaceBetween: 10,
         navigation: {
            prevEl: ".home-collections .swiper-button-prev",
            nextEl: ".home-collections .swiper-button-next",
         },
         pagination: {
            el: ".home-collections .swiper-pagination",
            type: "progressbar",
         },
         breakpoints: {
            1025: {
               spaceBetween: 15,
            },
            569: {
               spaceBetween: 10,
            },
         },
         mousewheel: {
            enabled: true,
            forceToAxis: true,
         },
      });
   }
   function initHeroSlider() {
      if (!document.querySelector(".home-hero .swiper")) return;
      const paginations = document.querySelectorAll(
         ".home-hero__pagination > div"
      );
      const progressCircles = document.querySelectorAll(".progress-circle");
      const totalLength = 138; // Окружность круга (примерно 2 * π * r)

      let swiper = new Swiper(".home-hero .swiper", {
         slidesPerView: 1,
         spaceBetween: 0,
         navigation: {
            prevEl: ".home-hero .swiper-button-prev",
            nextEl: ".home-hero .swiper-button-next",
         },

         autoplay: {
            delay: 3000,
            disableOnInteraction: false,
         },
         on: {
            autoplayTimeLeft(s, timeLeft, progress) {
               progressCircles.forEach((item) => {
                  item.style.strokeDashoffset = totalLength * progress;
               });
            },
            slideChange() {
               paginations.forEach((item, index) => {
                  if (index == swiper.activeIndex) {
                     item.classList.add("active");
                  } else {
                     item.classList.remove("active");
                  }
               });
            },
            init() {
               paginations[0].classList.add("active");
            },
         },
         mousewheel: {
            enabled: true,
            forceToAxis: true,
         },
         speed: 700,
         effect: "creative",
         creativeEffect: {
            prev: {
               shadow: true,
               translate: ["-20%", 0, -1],
            },
            next: {
               translate: ["100%", 0, 0],
            },
         },
      });
   }
   function homeInterier() {
      const points = document.querySelectorAll(".home-interier__point");
      if (!points.length) return;
      points.forEach((item) => {
         item.onclick = () => {
            if (window.innerWidth > 568) return;
            let target = document.querySelector(
               `[data-hint='${item.getAttribute("data-dot")}']` // ✅ Исправлено
            );
            console.log(target);
            target.classList.add("active");
         };
      });
      const closeBtns = document.querySelectorAll(".interier-hint__close");
      closeBtns.forEach((btn) => {
         btn.onclick = (e) => {
            console.log(e);
            btn.closest(".interier-hint").classList.remove("active");
         };
      });
      document.querySelector(".home-interier__backdrop").onclick = () => {
         document
            .querySelector(".interier-hint.active")
            .classList.remove("active");
      };
   }
   function initSalesSwiper() {
      if (!document.querySelector(".sales-section .swiper")) return;
      let swiper = new Swiper(".sales-section .swiper", {
         slidesPerView: "auto",
         spaceBetween: 10,
         navigation: {
            prevEl: ".sales-section .swiper-button-prev",
            nextEl: ".sales-section .swiper-button-next",
         },
         pagination: {
            el: ".sales-section .swiper-pagination",
            type: "progressbar",
         },
         breakpoints: {
            1025: {
               spaceBetween: 15,
            },
            569: {
               spaceBetween: 10,
            },
         },
         mousewheel: {
            enabled: true,
            forceToAxis: true,
         },
      });
   }
}
function initBlogSwiper() {
   if (!document.querySelector(".blog-section .swiper")) return;
   let swiper = new Swiper(".blog-section .swiper", {
      slidesPerView: "auto",
      spaceBetween: 10,
      pagination: {
         el: ".blog-section .swiper-pagination",
         type: "progressbar",
      },
      breakpoints: {
         1025: {
            spaceBetween: 15,
         },
         569: {
            spaceBetween: 10,
         },
      },
      mousewheel: {
         enabled: true,
         forceToAxis: true,
      },
   });
}
function productCard() {
   const products = document.querySelectorAll(".product-card");
   if (!products.length) return;
   products.forEach((item) => {
      item
         .querySelector(".product-card__like")
         .addEventListener("click", (e) => {
            e.stopPropagation();
            e.preventDefault();
            s;
         });
      item.querySelectorAll(".product-card__colors label").forEach((color) => {
         color.addEventListener("click", (e) => {
            const radio = color.querySelector("input[type='radio']");
            if (radio) {
               radio.checked = true; // Программно устанавливаем радио-кнопку
            }
            s;
         });
      });
   });
}
function collectionCard() {
   const items = document.querySelectorAll(".home-collection__gallery li");
   if (!items.length) return;
   items.forEach((item) => {
      item.onclick = () => {
         let preview = item
            .closest(".home-collection")
            .querySelector(".home-collection__preview");
         if (preview) {
            preview.classList.toggle("active");
         }
      };
   });
}
function accordion(linkSelector, contentSelector) {
   // получаем линки
   const openLinks = document.querySelectorAll(`${linkSelector}`);
   // контенты
   const contents = document.querySelectorAll(`${contentSelector}`);
   if (openLinks.length > 0) {
      for (let i = 0; i < openLinks.length; i++) {
         let openLink = openLinks[i];
         openLink.addEventListener("click", () => {
            // все прячем
            for (let j = 0; j < contents.length; j++) {
               // если хоть один открывается - return
               if (contents[j].classList.contains("collapsing")) {
                  return;
               } // Иначе
               // все прячем
               slideHide(contents[j]);
            }
            for (let j = 0; j < openLinks.length; j++) {
               openLinks[j].classList.remove("active");
            }
            // записываем в переменную нужный таб
            let content = contents[i];
            // работаем с классами линка
            if (content.classList.contains("collapsing")) {
               return;
            } else if (content.classList.contains("collapse_show")) {
               openLink.classList.remove("active");
            } else {
               openLink.classList.add("active");
            }
            // показываем нужный
            slideShow(content);
         });
      }
   }
}
function catalogPage() {
   function initSelects() {
      const selects = document.querySelectorAll(".catalog-select");
      if (!selects.length) return;
      body.addEventListener("click", (e) => {
         if (e.target.closest(".catalog-select__content > button")) {
            selects.forEach((item) => item.classList.remove("open"));
            return;
         }
         if (!e.target.closest(".catalog-select")) {
            selects.forEach((item) => item.classList.remove("open"));
         } else {
            if (e.target.closest(".catalog-select__wrapper")) {
               selects.forEach((item) => {
                  if (item !== e.target.closest(".catalog-select")) {
                     item.classList.remove("open");
                  } else {
                     item.classList.toggle("open");
                  }
               });
            } else {
               selects.forEach((item) => item.classList.remove("open"));
               e.target.closest(".catalog-select").classList.add("open");
            }
         }
      });
      const sort = new Select("#catalog-filters__sort", {
         // placeholder: "Сортировка",
         selectedId: "asd",
         data: [
            {
               id: "asd",
               value: "По популярности",
            },
            {
               id: "asd1",
               value: "Новинки",
            },
            {
               id: "asd2",
               value: "Сначала дешевле",
            },
            {
               id: "asd3",
               value: "Сначала дороже",
            },
         ],
         onSelect(item, select) {
            select.classList.add("filled");
            console.log(item);
         },
      });
   }
   initSelects();
   makeRange("#priceRange", 4000000, 100000);
}
function slideShow(el, duration = 500) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      el.classList.contains("collapse_show")
   ) {
      return;
   }
   // удаляем класс collapse
   el.classList.remove("collapse");
   // сохраняем текущую высоту элемента в константу height (это значение понадобится ниже)
   const height = el.offsetHeight;
   // устанавливаем высоте значение 0
   el.style["height"] = 0;
   // не отображаем содержимое элемента, выходящее за его пределы
   el.style["overflow"] = "hidden";
   // создание анимации скольжения с помощью CSS свойства transition
   el.style["transition"] = `height ${duration}ms ease`;
   // добавляем класс collapsing
   el.classList.add("collapsing");
   // получим значение высоты (нам этого необходимо для того, чтобы просто заставить браузер выполнить перерасчет макета, т.к. он не сможет нам вернуть правильное значение высоты, если не сделает это)
   el.offsetHeight;
   // установим в качестве значения высоты значение, которое мы сохранили в константу height
   el.style["height"] = `${height}px`;
   // по истечении времени анимации this._duration
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим классы collapse и collapse_show
      el.classList.add("collapse");
      el.classList.add("collapse_show");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}
function slideHide(el, duration = 500) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      !el.classList.contains("collapse_show")
   ) {
      return;
   }
   // установим свойству height текущее значение высоты элемента
   el.style["height"] = `${el.offsetHeight}px`;
   // получим значение высоты
   el.offsetHeight;
   // установим CSS свойству height значение 0
   el.style["height"] = 0;
   // обрежем содержимое, выходящее за границы элемента
   el.style["overflow"] = "hidden";
   // добавим CSS свойство transition для осуществления перехода длительностью this._duration
   el.style["transition"] = `height ${duration}ms ease`;
   // удалим классы collapse и collapse_show
   el.classList.remove("collapse");
   el.classList.remove("collapse_show");
   // добавим класс collapsing
   el.classList.add("collapsing");
   // после завершения времени анимации
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим класс collapsing
      el.classList.add("collapse");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}
const lockPadding = document.querySelectorAll(".lock-padding");
let unlock = true;
const timeout = 500;

function bodyLock() {
   const lockPaddingValue =
      window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

   if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = lockPaddingValue;
      }
   }
   // body.style.paddingRight = lockPaddingValue;
   body.classList.add("lock");

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

function bodyUnLock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = "0px";
         }
      }
      body.style.paddingRight = "0px";
      body.classList.remove("lock");
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}
class Select {
   constructor(selector, options) {
      this.$el = document.querySelector(selector);
      this.options = options;
      this.selectedId = options.selectedId;

      this.render();
      this.setup();
   }
   render() {
      this.$el.classList.add("select");
      const { placeholder, data, selectedId } = this.options;
      this.$el.innerHTML = this.getTemplate(data, placeholder, selectedId);
      if (placeholder) {
         this.$el
            .querySelector(`[data-type="input"]`)
            .classList.add("placeholder");
      }
   }
   setup() {
      this.clickHandler = this.clickHandler.bind(this);
      this.$el.addEventListener("click", this.clickHandler);
      this.$value = this.$el.querySelector(`[data-type="input"] span`);
   }
   clickHandler(event) {
      const { type } = event.target.dataset;
      if (type === "input") {
         this.toggle();
      } else if (type === "item") {
         const { id } = event.target.dataset;
         this.select(id);
      } else if (type === "back") {
         this.toggle();
      } else if (type === "header") {
         this.toggle();
      } else if (event.target.closest(".select__header")) [this.toggle()];
   }
   get current() {
      return this.options.data.find((item) => item.id === this.selectedId);
   }
   select(id) {
      this.$el
         .querySelector(`[data-type="input"]`)
         .classList.remove("placeholder");
      this.selectedId = id;
      this.$value.innerHTML = this.current.value;
      this.$el.querySelectorAll(`[data-type="item"]`).forEach((item) => {
         item.classList.remove("selected");
      });

      console.log(document.querySelector(`[data-id='${this.current.id}]'`));
      this.$el
         .querySelector(`[data-id='${this.current.id}']`)
         .classList.add("selected");
      this.close();

      if (this.options.onSelect) {
         this.options.onSelect(this.current, this.$el);
      }
   }
   open() {
      this.$el.classList.add("open");
   }
   close() {
      this.$el.classList.remove("open");
   }
   toggle() {
      if (this.$el.classList.contains("open")) {
         this.close();
      } else {
         this.open();
      }
   }
   getTemplate(data, placeholder = `<span></span>`, selectedId) {
      const items = data.map((item) => {
         let cls = "";
         if (item.id === selectedId) {
            placeholder = item.value;
            cls = "selected";
         }
         return `<li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>`;
      });
      return `
      <div class="select__header" data-type="header">
      <div class="select__back" data-type="back"></div>
      <div class="select__title" data-type="input">
         <span>${placeholder}</span>
         <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
            <path d="M14.0879 5.5293C14.0879 5.5293 12.0367 7.00091 11.0293 8.00427C10.0124 9.01707 9.02956 10.5876 9.02956 10.5876C9.02956 10.5876 7.54629 8.51711 6.5293 7.50427C5.52198 6.50107 3.97122 5.5293 3.97122 5.5293" stroke="#202929" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>
    </div>
      </div>
      <div class="select__content">
         <ul class="select__list">
            ${items.join("")}
         </ul>
      </div>
      `;
   }
}
function makeRange(blockSelector, max = 10000, gap = 500) {
   //  Script.js
   const rangevalue = document.querySelector(
      blockSelector + " " + ".slider-container .price-slider"
   );
   if (
      !document.querySelector(
         blockSelector + " " + ".slider-container .price-slider"
      )
   )
      return;
   const rangeInputvalue = document.querySelectorAll(
      blockSelector + " " + ".range-input input"
   );

   // Set the price gap
   let priceGap = gap;

   // Adding event listners to price input elements
   const priceInputvalue = document.querySelectorAll(
      blockSelector + " " + ".price-input input"
   );
   for (let i = 0; i < priceInputvalue.length; i++) {
      priceInputvalue[i].addEventListener("input", (e) => {
         // Parse min and max values of the range input
         let minp = parseInt(priceInputvalue[0].value);
         let maxp = parseInt(priceInputvalue[1].value);
         let diff = maxp - minp;

         if (minp < 0) {
            alert("minimum price cannot be less than 0");
            priceInputvalue[0].value = 0;
            minp = 0;
         }

         // Validate the input values
         if (maxp > max) {
            alert("maximum price cannot be greater than " + max);
            priceInputvalue[1].value = max;
            maxp = max;
         }

         if (minp > maxp - priceGap) {
            priceInputvalue[0].value = maxp - priceGap;
            minp = maxp - priceGap;

            if (minp < 0) {
               priceInputvalue[0].value = 0;
               minp = 0;
            }
         }

         // Check if the price gap is met
         // and max price is within the range
         if (diff >= priceGap && maxp <= rangeInputvalue[1].max) {
            if (e.target.className === "min-input") {
               rangeInputvalue[0].value = minp;
               let value1 = rangeInputvalue[0].max;
               rangevalue.style.left = `${(minp / value1) * 100}%`;
            } else {
               rangeInputvalue[1].value = maxp;
               let value2 = rangeInputvalue[1].max;
               rangevalue.style.right = `${100 - (maxp / value2) * 100}%`;
            }
         }
      });

      // Add event listeners to range input elements
      for (let i = 0; i < rangeInputvalue.length; i++) {
         rangeInputvalue[i].addEventListener("input", (e) => {
            let minVal = parseInt(rangeInputvalue[0].value);
            let maxVal = parseInt(rangeInputvalue[1].value);

            let diff = maxVal - minVal;

            // Check if the price gap is exceeded
            if (diff < priceGap) {
               // Check if the input is the min range input
               if (e.target.className === "min-range") {
                  rangeInputvalue[0].value = maxVal - priceGap;
               } else {
                  rangeInputvalue[1].value = minVal + priceGap;
               }
            } else {
               // Update price inputs and range progress
               priceInputvalue[0].value = minVal;
               priceInputvalue[1].value = maxVal;
               rangevalue.style.left = `${
                  (minVal / rangeInputvalue[0].max) * 100
               }%`;
               rangevalue.style.right = `${
                  100 - (maxVal / rangeInputvalue[1].max) * 100
               }%`;
            }
         });
      }
   }
}
