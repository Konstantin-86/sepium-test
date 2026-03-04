document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".card__slider").forEach((slider) => {
    new Swiper(slider, {
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: slider.querySelector(".swiper-button-next"),
        prevEl: slider.querySelector(".swiper-button-prev"),
      },
      pagination: {
        el: slider.closest(".card").querySelector(".swiper-pagination-custom"),
        clickable: true,
      },
      breakpoints: {
        768: {
          autoplay: false,
        },
      },
    });
  });

  setupCardClick();
});

Fancybox.bind('[data-fancybox^="gallery-"]', {
  Carousel: {
    infinite: true,
  },
  Toolbar: {
    display: {
      left: ["infobar"],
      middle: [],
      right: ["slideshow", "thumbs", "close"],
    },
  },
  on: {
    close: (fancybox) => {
      if (fancybox.container) {
        fancybox.container.removeAttribute("aria-hidden");
      }
    },
    done: (fancybox) => {
      document.body.style.overflow = "";
    },
  },
});

const footerLikes = document.querySelectorAll(".footer__like");

footerLikes.forEach((footerLike) => {
  footerLike.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    const icon = this.querySelector(".like-icon");
    const likeNumber = this.querySelector(".card__like-number");

    if (icon && likeNumber) {
      icon.classList.toggle("like-icon--active");
      let count = parseInt(likeNumber.textContent);
      if (icon.classList.contains("like-icon--active")) {
        likeNumber.textContent = count + 1;
      } else {
        likeNumber.textContent = count - 1;
      }
    }
  });
});

function setupCardClick() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const buyBtn = card.querySelector(".card__buy-btn");
    if (buyBtn) {
      card.dataset.cardLink = buyBtn.getAttribute("href");
    }
    card.addEventListener("click", handleCardClick);
  });
}

function handleCardClick(event) {
  const target = event.target;
  const card = event.currentTarget;

  if (
    target.closest("a") ||
    target.closest("button") ||
    target.closest("input") ||
    target.closest("label") ||
    target.closest(".card-zoom") ||
    target.closest(".swiper-button-prev") ||
    target.closest(".swiper-button-next") ||
    target.closest(".footer__like") ||
    target.closest(".card__mod-item")
  ) {
    return;
  }

  if (card.dataset.cardLink) {
    event.preventDefault();
    window.open("/card", "_blank");
  }
}
