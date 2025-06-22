class MyFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="w-full py-8 mt-16 bg-gradient-to-r from-gray-900 via-dark to-darker border-t border-gray-800 text-center">
        <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="text-gray-400 text-sm">
            &copy; ${new Date().getFullYear()} Vic &mdash; Full Stack Developer. All rights reserved.
          </div>
          <div class="flex space-x-4 justify-center">
            <a href="mailto:vicmenten@gmail.com" class="text-primary hover:text-secondary transition">
              <i class="fas fa-envelope text-lg"></i>
            </a>
            <a href="https://www.linkedin.com/in/vicmenten/" target="_blank" rel="noopener" class="text-primary hover:text-secondary transition">
              <i class="fab fa-linkedin text-lg"></i>
            </a>
            <a href="https://github.com/VicMent" target="_blank" rel="noopener" class="text-primary hover:text-secondary transition">
              <i class="fab fa-github text-lg"></i>
            </a>
          </div>
        </div>
      </footer>
    `;
  }
}
customElements.define('my-footer', MyFooter);