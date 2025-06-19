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

          <!-- Project 2: ScienceMachine 95 -->
          <div class="project-card">
            <div class="project-inner card h-full rounded-xl overflow-hidden">
              <div class="relative">
                <img src="https://images.unsplash.com/photo-1527443224154-65fce13e8b2e?auto=format&fit=crop&w=1770&q=80"
                    alt="Data Science Game"
                    class="w-full h-48 object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div class="absolute bottom-4 left-4">
                  <span class="text-xs px-2 py-1 bg-primary text-black rounded">WebComponents</span>
                  <span class="text-xs px-2 py-1 bg-secondary text-black rounded ml-2">Gamification</span>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2">ScienceMachine 95</h3>
                <p class="text-gray-400 text-sm mb-4">
                  A retro OS-themed data science game with XP, coins, Clippy-style AI guidance, and drag-and-drop logic blocks.
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

          <!-- Project 3: Super Auto Duel -->
          <div class="project-card">
            <div class="project-inner card h-full rounded-xl overflow-hidden">
              <div class="relative">
                <img src="https://images.unsplash.com/photo-1605902711622-cfb43c4437b1?auto=format&fit=crop&w=1770&q=80"
                    alt="Super Auto Duel"
                    class="w-full h-48 object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div class="absolute bottom-4 left-4">
                  <span class="text-xs px-2 py-1 bg-primary text-black rounded">Unity</span>
                  <span class="text-xs px-2 py-1 bg-secondary text-black rounded ml-2">Netcode</span>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2">Super Auto Duel</h3>
                <p class="text-gray-400 text-sm mb-4">
                  A physics-based capsule battler inspired by Super Auto Pets. Multiplayer-ready, stat-driven, and totally chaotic.
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