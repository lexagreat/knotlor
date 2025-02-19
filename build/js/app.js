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
});
function headerWork() {
   const main = document.querySelector("main.main");
   const header = document.querySelector(".header");
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
   headerScroll();
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

function accordion(linkSelector, contentSelector) {
   // получаем линки
   const openLinks = document.querySelectorAll(`${linkSelector}`);
   // контенты
   const contents = document.querySelectorAll(`${contentSelector}`);
   if (openLinks.length > 0) {
      console.log(openLinks);
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
