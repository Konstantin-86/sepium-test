document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".card__slider", {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});

const likeIcons = document.querySelectorAll(".like-icon");

likeIcons.forEach((icon) => {
  icon.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    this.classList.toggle("like-icon--active");

    const likeNumber =
      this.closest(".card__like").querySelector(".card__like-number");
    if (likeNumber) {
      let count = parseInt(likeNumber.textContent);
      if (this.classList.contains("like-icon--active")) {
        likeNumber.textContent = count + 1;
      } else {
        likeNumber.textContent = count - 1;
      }
    }
  });
});
