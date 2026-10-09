const filterButtons = document.querySelectorAll(".filter-button");
const pressureCards = document.querySelectorAll(".pressure-card");
const filterStatus = document.querySelector(".filter-status");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    pressureCards.forEach((card) => {
      const isVisible = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !isVisible);
      if (isVisible) visibleCount += 1;
    });

    const categoryName = filter === "study" ? "in the classroom" : "beyond the classroom";
    filterStatus.textContent =
      filter === "all"
        ? `Showing all ${visibleCount} pressure points.`
        : `Showing ${visibleCount} pressures ${categoryName}.`;
  });
});

const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
