  (function () {
    const modal = document.getElementById('bookingModal');
    const openButtons = document.querySelectorAll('[data-open-booking-modal]');
    const closeButtons = document.querySelectorAll('[data-close-booking-modal]');
    const steps = Array.from(document.querySelectorAll('.booking-step'));
    const prevBtn = document.getElementById('bookingPrevBtn');
    const nextBtn = document.getElementById('bookingNextBtn');
    const modalTitle = document.getElementById('bookingModalTitle');

    let currentStep = 1;

    const titles = {
      1: 'Add Booking Details',
      2: 'Add Booking Details',
      3: 'Confirm and Pay'
    };

    function showStep(stepNumber) {
      currentStep = stepNumber;

      steps.forEach(step => {
        step.classList.toggle('active', Number(step.dataset.step) === stepNumber);
      });

      modalTitle.textContent = titles[stepNumber] || 'Booking';

      prevBtn.disabled = stepNumber === 1;

      if (stepNumber === 3) {
        nextBtn.textContent = 'Pay & Confirm Booking';
      } else {
        nextBtn.textContent = 'Next';
      }
    }

    function openModal() {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('booking-modal-open');
      showStep(1);
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('booking-modal-open');
    }

    openButtons.forEach(button => {
      button.addEventListener('click', openModal);
    });

    closeButtons.forEach(button => {
      button.addEventListener('click', closeModal);
    });

    prevBtn.addEventListener('click', function () {
      if (currentStep > 1) {
        showStep(currentStep - 1);
      }
    });

    nextBtn.addEventListener('click', function () {
      if (currentStep < 3) {
        showStep(currentStep + 1);
      } else {
        alert('Booking confirmed');
        closeModal();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  })();
