// sheet_url
const scriptURL = "https://script.google.com/macros/s/AKfycbwNZIVr5sdJc_BOdgC3jA06W96SiKUBfz8KfqGkQmkSRB6aLdJtJ88XKINUTzyRw7no/exec";

document.addEventListener('DOMContentLoaded',() => {
    const toggleBtn = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const links = navLinks.querySelectorAll('a');
    const icon = toggleBtn.querySelector('i');
    const submit_btn = document.getElementById('btn-submit');
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const persons = document.getElementById("persons")
    const date = document.getElementById("date");
    const time = document.getElementById("time");
    const phone = document.getElementById("phone");


    name.addEventListener('input', () => {
    if (name.value.trim().length >= 8) {
      document.getElementById("error-name").textContent = "";
    }
  });

  email.addEventListener('input', () => {
    if (!email.value.trim().includes('@') || !email.value.trim().includes('.')) {
      document.getElementById("error-email").textContent = "";
    }
  });
    phone.addEventListener("input", () => {
    const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    if (phoneRegex.test(phone.value.trim())) {
        document.getElementById("error-phone").textContent = "";
    }
    });

  persons.addEventListener('input', () => {
    const val = parseInt(persons.value);
    if (!isNaN(val) && val > 0 && val <= 99) {
      document.getElementById("error-persons").textContent = "";
    }
  });

  date.addEventListener('change', () => {
    if (date.value) {
      document.getElementById("error-date").textContent = "";
    }
  });

  time.addEventListener('change', () => {
    if (time.value) {
      document.getElementById("error-time").textContent = "";
    }
  });


    function handleToggleBtn() {
        navLinks.classList.toggle('show');
        icon.classList.toggle("fa-xmark");
        icon.classList.toggle("fa-bars");
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('submitted');

        let isValid = true;

        document.querySelectorAll('.error').forEach(span => span.textContent = '');

        if (name.value.trim().length < 8) {
            document.getElementById("error-name").textContent = 'Name must be at least 8 characters.';
            isValid = false;
           
        }

        if (!email.value.trim().includes('@') || (!email.value.includes('.'))) {
            document.getElementById("error-email").textContent = "Please enter a valid email.";
            isValid = false;
            
        }
        const phoneValue = phone.value.trim();
        const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
        
        if (!phoneRegex.test(phoneValue)) {
        document.getElementById("error-phone").textContent = "Please enter a valid 11-digit Egyptian phone number.";
        isValid = false;
        }

        if (persons.value === "" || isNaN(persons.value) || parseInt(persons.value) <= 0 || parseInt(persons.value) > 99) {
            document.getElementById("error-persons").textContent = "Please enter a valid number of persons.";
            isValid = false;
           
        }

        if (date.value === "") {
        document.getElementById("error-date").textContent = "Please select a date.";
        isValid = false;
      } else {
        const selectedDate = new Date(date.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const currentYear = today.getFullYear();
        if (selectedDate.getFullYear() !== currentYear) {
          document.getElementById("error-date").textContent = `Please select a date in ${currentYear}.`;
          isValid = false;
        } else if (selectedDate < today) {
          document.getElementById("error-date").textContent = `Please select a future date.`;
          isValid = false;
        }
        }
        

        if (time.value === "") {
        document.getElementById("error-time").textContent = "Please select a time.";
        isValid = false;
      } else {
        const selectedDate = new Date(date.value);
        const today = new Date();

        const isToday =
          selectedDate.getFullYear() === today.getFullYear() &&
          selectedDate.getMonth() === today.getMonth() &&
          selectedDate.getDate() === today.getDate();

        if (isToday) {
          const [hours, minutes] = time.value.split(":").map(Number);
          const selectedDateTime = new Date();
          selectedDateTime.setHours(hours, minutes, 0, 0);

          if (selectedDateTime < today) {
            document.getElementById("error-time").textContent = "Please select a future time.";
            isValid = false;
          }
        }
      }

        if (isValid) {
            submit_btn.disabled = true;
            submit_btn.textContent = "Sending...";
            // formData
            const formData = {
            name: name.value.trim(),
            email: email.value.trim(),
            phone: phone.value.trim(),
            persons: persons.value.trim(),
            date: date.value,
            time: time.value,
            message: document.getElementById("message").value.trim()
            };console.log(formData)
            fetch(scriptURL, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
            "Content-Type": "application/json"
            },
            mode: 'no-cors'
        })
        .then(response => response.text())
        .then(result => {
            Swal.fire({
            title: 'Booking Done ✅',
            text: 'We have received your reservation!',
            icon: 'success',
            confirmButtonText: 'OK'
});
        })
        .catch(error => {
            Swal.fire({
            title: 'Oops!',
            text: 'There was an error, please try again.',
            icon: 'error',
            confirmButtonText: 'Retry'
          });
        })
        .finally(() => {
            submit_btn.disabled = false;
            submit_btn.textContent = "Book a Table";
        });
        document.getElementById("contact-form").reset();

        }
    }

    toggleBtn.addEventListener('click', handleToggleBtn);

    links.forEach(link => {
        link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        icon.classList.replace("fa-xmark", "fa-bars");
        });
    });

    submit_btn.addEventListener('click', handleSubmit);
});
   

