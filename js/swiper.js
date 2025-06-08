let swiperInstance = null;

function handleSwiper() {
  const isMobile = window.innerWidth < 645;

  if (isMobile && !swiperInstance) {
    swiperInstance = new Swiper(".mySwiper", {
      slidesPerView: 1,    
      spaceBetween: 10,
      loop:true,    
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  } else if (!isMobile && swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }
}

handleSwiper();
window.addEventListener("resize", handleSwiper);
