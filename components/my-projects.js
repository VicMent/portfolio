class MyProjects extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="projects" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">
            <span class="gradient-text">Featured</span> 
            <span class="glow">Projects</span>
          </h2>
          <div class="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Project 1 -->
          <div class="project-card">
            <div class="project-inner card h-full rounded-xl overflow-hidden">
              <div class="relative">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                     alt="Project 1" 
                     class="w-full h-48 object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div class="absolute bottom-4 left-4">
                  <span class="text-xs px-2 py-1 bg-primary text-black rounded">React</span>
                  <span class="text-xs px-2 py-1 bg-secondary text-black rounded ml-2">Node.js</span>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2">E-commerce Platform</h3>
                <p class="text-gray-400 text-sm mb-4">
                  A full-featured e-commerce platform with payment integration, product management, and user authentication.
                </p>
                <div class="flex space-x-3">
                  <a href="#" class="text-primary hover:text-secondary">
                    <i class="fas fa-external-link-alt"></i>
                  </a>
                  <a href="#" class="text-primary hover:text-secondary">
                    <i class="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <!-- Project 2 -->
          <div class="project-card">
            <div class="project-inner card h-full rounded-xl overflow-hidden">
              <div class="relative">
                <img src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80" 
                     alt="Project 2" 
                     class="w-full h-48 object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div class="absolute bottom-4 left-4">
                  <span class="text-xs px-2 py-1 bg-primary text-black rounded">Vue.js</span>
                  <span class="text-xs px-2 py-1 bg-secondary text-black rounded ml-2">Firebase</span>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2">Task Management App</h3>
                <p class="text-gray-400 text-sm mb-4">
                  A collaborative task management application with real-time updates, drag-and-drop interface, and team features.
                </p>
                <div class="flex space-x-3">
                  <a href="#" class="text-primary hover:text-secondary">
                    <i class="fas fa-external-link-alt"></i>
                  </a>
                  <a href="#" class="text-primary hover:text-secondary">
                    <i class="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <!-- Project 3 -->
          <div class="project-card">
            <div class="project-inner card h-full rounded-xl overflow-hidden">
              <div class="relative">
                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                     alt="Project 3" 
                     class="w-full h-48 object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div class="absolute bottom-4 left-4">
                  <span class="text-xs px-2 py-1 bg-primary text-black rounded">Next.js</span>
                  <span class="text-xs px-2 py-1 bg-secondary text-black rounded ml-2">GraphQL</span>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2">Portfolio CMS</h3>
                <p class="text-gray-400 text-sm mb-4">
                  A content management system for creatives to showcase their work with customizable templates and analytics.
                </p>
                <div class="flex space-x-3">
                  <a href="#" class="text-primary hover:text-secondary">
                    <i class="fas fa-external-link-alt"></i>
                  </a>
                  <a href="#" class="text-primary hover:text-secondary">
                    <i class="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
customElements.define('my-projects', MyProjects);