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
   HomePage();
});

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

function HomePage() {
   initCollectionSlider();
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
