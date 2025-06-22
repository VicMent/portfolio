class MyContact extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="contact" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">
            <span class="gradient-text">Contact</span>
            <span class="glow">Me</span>
          </h2>
          <div class="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p class="text-gray-400 mt-4 max-w-xl mx-auto">
            Interested in working together or have a question? Reach out via the form or any of the methods below!
          </p>
        </div>
        <div class="flex flex-col md:flex-row justify-center items-center gap-12">
          <form class="w-full max-w-lg rounded-2xl p-8 shadow-2xl border border-gray-800 flex flex-col items-center bg-[var(--dark)]">
            <div class="mb-6 w-full">
              <label for="name" class="block mb-2 font-semibold text-center">Name</label>
              <input type="text" id="name" name="name" class="contact-input w-full px-4 py-3 rounded-lg text-white text-center" required>
            </div>
            <div class="mb-6 w-full">
              <label for="email" class="block mb-2 font-semibold text-center">Email</label>
              <input type="email" id="email" name="email" class="contact-input w-full px-4 py-3 rounded-lg text-white text-center" required>
            </div>
            <div class="mb-6 w-full">
              <label for="message" class="block mb-2 font-semibold text-center">Message</label>
              <textarea id="message" name="message" rows="5" class="contact-input w-full px-4 py-3 rounded-lg text-white text-center" required></textarea>
            </div>
            <button type="submit" class="btn-primary px-8 py-3 rounded-full font-semibold w-full mt-2">Send Message</button>
          </form>
          <div class="flex flex-col items-center justify-center space-y-8 w-full max-w-lg">
            <div class="flex flex-col items-center space-y-2">
              <span class="text-lg font-semibold">Email</span>
              <a href="mailto:vicmenten@gmail.com" class="text-primary hover:underline text-lg text-center">
                vicmenten@gmail.com
              </a>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <span class="text-lg font-semibold">Phone</span>
              <a href="tel:+32468582813" class="text-primary hover:underline text-lg text-center">
                +32 468 58 28 13
              </a>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <span class="text-lg font-semibold">LinkedIn</span>
              <a href="https://www.linkedin.com/in/vicmenten/" target="_blank" rel="noopener" class="flex items-center text-primary hover:underline text-lg text-center">
                <i class="fab fa-linkedin text-2xl mr-2"></i> linkedin.com/in/vicmenten
              </a>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <span class="text-lg font-semibold">GitHub</span>
              <a href="https://github.com/VicMent" target="_blank" rel="noopener" class="flex items-center text-primary hover:underline text-lg text-center">
                <i class="fab fa-github text-2xl mr-2"></i> github.com/VicMent
              </a>
            </div>
          </div>
        </div>
      </section>
    `;

    // Add form submission handler
    const form = this.querySelector('form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.querySelector('[name="name"]').value;
        const email = form.querySelector('[name="email"]').value;
        const message = form.querySelector('[name="message"]').value;

        // Construct mailto link
        const subject = encodeURIComponent(`Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:vicmenten@gmail.com?subject=${subject}&body=${body}`;
      });
    }
  }
}
customElements.define('my-contact', MyContact);