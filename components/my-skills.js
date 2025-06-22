class MySkills extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="skills" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">
            <span class="gradient-text">My</span> 
            <span class="glow">Skills</span>
          </h2>
          <div class="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 class="text-2xl font-bold mb-6">Technologies I Work With</h3>
            <p class="text-gray-400 mb-8">
              I enjoy blending creative design with interactive systems—whether that's on the web, in 3D, or inside a game engine.  
              I actively use a variety of tools across frontend, backend, and game development.
            </p>
            <div class="grid grid-cols-2 gap-4">
              <a href="https://en.wikipedia.org/wiki/JavaScript" target="_blank" rel="noopener" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
                <div class="w-8 h-8 mr-3 flex items-center justify-center">
                  <i class="fab fa-js text-yellow-400 text-xl"></i>
                </div>
                <span>JavaScript</span>
                <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
                  Click for more info
                </span>
              </a>
              <a href="https://en.wikipedia.org/wiki/React_(JavaScript_library)" target="_blank" rel="noopener" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
                <div class="w-8 h-8 mr-3 flex items-center justify-center">
                  <i class="fab fa-react text-blue-400 text-xl"></i>
                </div>
                <span>React</span>
                <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
                  Click for more info
                </span>
              </a>
              <a href="https://en.wikipedia.org/wiki/Unity_(game_engine)" target="_blank" rel="noopener" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
                <div class="w-8 h-8 mr-3 flex items-center justify-center">
                  <i class="fas fa-cube text-green-400 text-xl"></i>
                </div>
                <span>Unity (C#)</span>
                <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
                  Click for more info
                </span>
              </a>
              <a href="https://en.wikipedia.org/wiki/Three.js" target="_blank" rel="noopener" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
                <div class="w-8 h-8 mr-3 flex items-center justify-center">
                  <i class="fas fa-cube text-purple-400 text-xl"></i>
                </div>
                <span>Three.js</span>
                <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
                  Click for more info
                </span>
              </a>
              <a href="https://en.wikipedia.org/wiki/PostgreSQL" target="_blank" rel="noopener" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
                <div class="w-8 h-8 mr-3 flex items-center justify-center">
                  <i class="fas fa-database text-teal-400 text-xl"></i>
                </div>
                <span>PostgreSQL</span>
                <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
                  Click for more info
                </span>
              </a>
              <a href="https://en.wikipedia.org/wiki/Node.js" target="_blank" rel="noopener" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
                <div class="w-8 h-8 mr-3 flex items-center justify-center">
                  <i class="fas fa-terminal text-gray-300 text-xl"></i>
                </div>
                <span>Node.js</span>
                <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
                  Click for more info
                </span>
              </a>
            </div>
          </div>
          <div>
            <h3 class="text-2xl font-bold mb-6">My Focus Areas</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="bg-gray-900 rounded-xl p-5 flex flex-col items-center shadow group hover:bg-primary/10 transition">
                <i class="fas fa-laptop-code text-blue-400 text-primary text-3xl mb-3"></i>
                <span class="font-semibold mb-1">Frontend Development</span>
                <span class="text-xs text-gray-400 text-center">Building interactive, responsive, and beautiful user interfaces.</span>
              </div>
              <div class="bg-gray-900 rounded-xl p-5 flex flex-col items-center shadow group hover:bg-primary/10 transition">
                <i class="fas fa-gamepad text-green-400 text-secondary text-3xl mb-3"></i>
                <span class="font-semibold mb-1">Gamification</span>
                <span class="text-xs text-gray-400 text-center">Creating playful experiences and gamified systems.</span>
              </div>
              <div class="bg-gray-900 rounded-xl p-5 flex flex-col items-center shadow group hover:bg-primary/10 transition">
                <i class="fas fa-pencil-ruler text-green-400 text-3xl mb-3"></i>
                <span class="font-semibold mb-1">UI/UX Design</span>
                <span class="text-xs text-gray-400 text-center">Designing intuitive and delightful user journeys.</span>
              </div>
              <div class="bg-gray-900 rounded-xl p-5 flex flex-col items-center shadow group hover:bg-primary/10 transition">
                <i class="fas fa-server text-blue-400 text-3xl mb-3"></i>
                <span class="font-semibold mb-1">Backend Development</span>
                <span class="text-xs text-gray-400 text-center">Building robust APIs and scalable backend systems.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
customElements.define('my-skills', MySkills);