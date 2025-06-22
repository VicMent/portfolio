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
          <!-- Project 1: CameraGameSetup -->
          <div class="project-card">
            <div class="project-inner card h-full rounded-xl overflow-hidden">
              <div class="relative">
                <img src="https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=1770&q=80"
                    alt="Camera Game Simulation"
                    class="w-full h-48 object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div class="absolute bottom-4 left-4">
                  <span class="text-xs px-2 py-1 bg-primary text-black rounded">Three.js</span>
                  <span class="text-xs px-2 py-1 bg-secondary text-black rounded ml-2">Custom Engine</span>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2">Camera Game Simulation</h3>
                <p class="text-gray-400 text-sm mb-4">
                  A 3D simulation for exploring city-building mechanics, camera controls, and resource management using WebGL and custom shaders.
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

          <!-- Project 2: STE(A)M Power Web Game -->
          <div class="project-card">
            <div class="project-inner card h-full rounded-xl overflow-hidden">
              <div class="relative">
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1770&q=80"
                    alt="STE(A)M Power Web Game"
                    class="w-full h-48 object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div class="absolute bottom-4 left-4">
                  <span class="text-xs px-2 py-1 bg-primary text-black rounded">Web Game</span>
                  <span class="text-xs px-2 py-1 bg-secondary text-black rounded ml-2">Workshops</span>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2">STE(A)M Power Web Game</h3>
                <p class="text-gray-400 text-sm mb-4">
                  Developed for <a href="https://research-expertise.ucll.be/nl/dienstverlening/items/steam-workshops-voor-je-leerlingen" target="_blank" class="underline text-primary">De Techniek- en WetenschapsAcademie (TWA)</a>, this interactive web game is used in workshops to introduce children and teens (ages 4–18) to STE(A)M concepts. The game encourages curiosity and hands-on discovery through playful challenges in programming, robotics, science, and technology.
                </p>
                <div class="flex space-x-3">
                  <a href="https://research-expertise.ucll.be/nl/dienstverlening/items/steam-workshops-voor-je-leerlingen" class="text-primary hover:text-secondary" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Project 3: XPLab Internship -->
          <div class="project-card">
            <div class="project-inner card h-full rounded-xl overflow-hidden">
              <div class="relative">
                <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1770&q=80"
                    alt="XPLab Internship"
                    class="w-full h-48 object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div class="absolute bottom-4 left-4">
                  <span class="text-xs px-2 py-1 bg-primary text-black rounded">Full Stack</span>
                  <span class="text-xs px-2 py-1 bg-secondary text-black rounded ml-2">Education Game</span>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2">Internship at XPLab</h3>
                <p class="text-gray-400 text-sm mb-4">
                  As a full stack developer at <a href="https://xplab.be/" target="_blank" class="underline text-primary">XPLab</a>, I contributed to the development of an educational game, working across both frontend and backend to deliver engaging learning experiences.
                </p>
                <div class="flex space-x-3">
                  <a href="https://xplab.be/" class="text-primary hover:text-secondary" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
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