// Add click event listener to toggle answer visibility
const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    answer.style.display = answer.style.display === "block" ? "none" : "block";
    question.querySelector("i").classList.toggle("fa-plus");
    question.querySelector("i").classList.toggle("fa-minus");
  });
});
