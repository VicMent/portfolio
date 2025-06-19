class MyNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="fixed w-full z-50 backdrop-blur-md bg-black bg-opacity-50 border-b border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <span class="text-2xl font-bold gradient-text">Portfolio</span>
              </div>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-8">
                <a href="#home" class="nav-link text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="#about" class="nav-link text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
                <a href="#skills" class="nav-link text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Skills</a>
                <a href="#projects" class="nav-link text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>
                <a href="#experience" class="nav-link text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Experience</a>
                <a href="#contact" class="nav-link text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
              </div>
            </div>
            <div class="md:hidden">
              <button class="text-gray-300 hover:text-white focus:outline-none">
                <i class="fas fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}
customElements.define('my-nav', MyNav);