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
        <!-- Expandable Arrow -->
        <div id="extra-skills" class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 hidden">
          <a href="https://en.wikipedia.org/wiki/HTML5" target="_blank" rel="noopener" tabindex="-1" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
            <div class="w-8 h-8 mr-3 flex items-center justify-center">
              <i class="fab fa-html5 text-orange-400 text-xl"></i>
            </div>
            <span>HTML</span>
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
              HTML5 & Markup
            </span>
          </a>
          <a href="https://en.wikipedia.org/wiki/CSS" target="_blank" rel="noopener" tabindex="-1" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
            <div class="w-8 h-8 mr-3 flex items-center justify-center">
              <i class="fab fa-css3-alt text-blue-400 text-xl"></i>
            </div>
            <span>CSS / SASS</span>
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
              Styling & Preprocessors
            </span>
          </a>
          <a href="https://en.wikipedia.org/wiki/PHP" target="_blank" rel="noopener" tabindex="-1" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
            <div class="w-8 h-8 mr-3 flex items-center justify-center">
              <i class="fab fa-php text-indigo-400 text-xl"></i>
            </div>
            <span>PHP</span>
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
              Backend Scripting
            </span>
          </a>
          <a href="https://en.wikipedia.org/wiki/Vue.js" target="_blank" rel="noopener" tabindex="-1" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
            <div class="w-8 h-8 mr-3 flex items-center justify-center">
              <i class="fab fa-vuejs text-green-400 text-xl"></i>
            </div>
            <span>Vue.js</span>
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
              Frontend Framework
            </span>
          </a>
          <a href="https://en.wikipedia.org/wiki/Android_(operating_system)" target="_blank" rel="noopener" tabindex="-1" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
            <div class="w-8 h-8 mr-3 flex items-center justify-center">
              <i class="fab fa-android text-green-500 text-xl"></i>
            </div>
            <span>Android</span>
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
              Mobile Development
            </span>
          </a>
          <a href="https://en.wikipedia.org/wiki/Git" target="_blank" rel="noopener" tabindex="-1" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
            <div class="w-8 h-8 mr-3 flex items-center justify-center">
              <i class="fab fa-git-alt text-red-400 text-xl"></i>
            </div>
            <span>Git</span>
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
              Version Control
            </span>
          </a>
          <a href="https://en.wikipedia.org/wiki/GitHub" target="_blank" rel="noopener" tabindex="-1" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
            <div class="w-8 h-8 mr-3 flex items-center justify-center">
              <i class="fab fa-github text-gray-300 text-xl"></i>
            </div>
            <span>GitHub</span>
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
              Code Hosting
            </span>
          </a>
          <a href="https://en.wikipedia.org/wiki/Linux" target="_blank" rel="noopener" tabindex="-1" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
            <div class="w-8 h-8 mr-3 flex items-center justify-center">
              <i class="fab fa-linux text-gray-200 text-xl"></i>
            </div>
            <span>Linux</span>
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
              Open Source OS
            </span>
          </a>
          <a href="https://en.wikipedia.org/wiki/Python_(programming_language)" target="_blank" rel="noopener" tabindex="-1" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
            <div class="w-8 h-8 mr-3 flex items-center justify-center">
              <i class="fab fa-python text-yellow-400 text-xl"></i>
            </div>
            <span>Python</span>
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
              Scripting & Data
            </span>
          </a>
          <a href="https://en.wikipedia.org/wiki/Figma_(software)" target="_blank" rel="noopener" tabindex="-1" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
            <div class="w-8 h-8 mr-3 flex items-center justify-center">
              <i class="fab fa-figma text-pink-400 text-xl"></i>
            </div>
            <span>Figma</span>
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
              UI/UX Design Tool
            </span>
          </a>
          <a href="https://en.wikipedia.org/wiki/Microsoft_Azure" target="_blank" rel="noopener" tabindex="-1" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
            <div class="w-8 h-8 mr-3 flex items-center justify-center">
              <i class="fas fa-cloud text-blue-400 text-xl"></i>
            </div>
            <span>Azure</span>
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
              Cloud Platform
            </span>
          </a>
          <a href="https://en.wikipedia.org/wiki/Docker_(software)" target="_blank" rel="noopener" tabindex="-1" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
            <div class="w-8 h-8 mr-3 flex items-center justify-center">
              <i class="fas fa-docker text-blue-300 text-xl"></i>
            </div>
            <span>Docker</span>
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
              Containers
            </span>
          </a>
          <a href="https://en.wikipedia.org/wiki/CI/CD" target="_blank" rel="noopener" tabindex="-1" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
            <div class="w-8 h-8 mr-3 flex items-center justify-center">
              <i class="fas fa-cogs text-green-400 text-xl"></i>
            </div>
            <span>CI/CD</span>
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
              Automation & Pipelines
            </span>
          </a>
          <a href="https://en.wikipedia.org/wiki/ASP.NET" target="_blank" rel="noopener" tabindex="-1" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
            <div class="w-8 h-8 mr-3 flex items-center justify-center">
              <i class="fas fa-code text-yellow-400 text-xl"></i>
            </div>
            <span>.NET / ASP.NET</span>
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
              Microsoft Stack
            </span>
          </a>
          <a href="https://en.wikipedia.org/wiki/Spring_Framework" target="_blank" rel="noopener" tabindex="-1" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
            <div class="w-8 h-8 mr-3 flex items-center justify-center">
              <i class="fas fa-leaf text-green-400 text-xl"></i>
            </div>
            <span>Spring / Spring Boot</span>
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
              Java Frameworks
            </span>
          </a>
          <a href="https://en.wikipedia.org/wiki/Test-driven_development" target="_blank" rel="noopener" tabindex="-1" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
            <div class="w-8 h-8 mr-3 flex items-center justify-center">
              <i class="fas fa-vial text-purple-400 text-xl"></i>
            </div>
            <span>Unit Testing / TDD</span>
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
              Quality Assurance
            </span>
          </a>
          <a href="https://en.wikipedia.org/wiki/Entity_Framework" target="_blank" rel="noopener" tabindex="-1" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
            <div class="w-8 h-8 mr-3 flex items-center justify-center">
              <i class="fas fa-cubes text-blue-400 text-xl"></i>
            </div>
            <span>Entity Framework</span>
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
              ORM for .NET
            </span>
          </a>
          <a href="https://en.wikipedia.org/wiki/Express.js" target="_blank" rel="noopener" tabindex="-1" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
            <div class="w-8 h-8 mr-3 flex items-center justify-center">
              <i class="fas fa-network-wired text-pink-400 text-xl"></i>
            </div>
            <span>APIs / Express.js</span>
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
              API Development
            </span>
          </a>
          <a href="https://en.wikipedia.org/wiki/Scrum_(software_development)" target="_blank" rel="noopener" tabindex="-1" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
            <div class="w-8 h-8 mr-3 flex items-center justify-center">
              <i class="fas fa-users text-blue-400 text-xl"></i>
            </div>
            <span>Scrum</span>
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
              Agile Methodology
            </span>
          </a>
          <a href="https://en.wikipedia.org/wiki/Backend" target="_blank" rel="noopener" tabindex="-1" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
            <div class="w-8 h-8 mr-3 flex items-center justify-center">
              <i class="fas fa-laptop text-gray-400 text-xl"></i>
            </div>
            <span>Back-end Development</span>
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
              Server-side Logic
            </span>
          </a>
          <a href="https://en.wikipedia.org/wiki/Web_development" target="_blank" rel="noopener" tabindex="-1" class="skill-pill px-4 py-2 rounded-full flex items-center hover:bg-primary/20 transition group relative">
            <div class="w-8 h-8 mr-3 flex items-center justify-center">
              <i class="fas fa-globe text-green-400 text-xl"></i>
            </div>
            <span>Web Development</span>
            <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 bg-black/90 text-white text-xs rounded p-1 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 text-center">
              Full Stack
            </span>
          </a>
        </div>
        <button id="expand-skills-btn" type="button" class="w-full flex items-center justify-center mt-4 text-primary hover:text-secondary transition focus:outline-none glow expand" aria-expanded="false">
          <span class="mr-2 font-semibold">Show more skills</span>
          <svg id="expand-arrow" class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
      </section>
    `;

    // Expand/collapse logic (place this AFTER setting innerHTML)
    const btn = this.querySelector('#expand-skills-btn');
    const extra = this.querySelector('#extra-skills');
    const arrow = this.querySelector('#expand-arrow');
    if (btn && extra && arrow) {
      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !expanded);
        extra.classList.toggle('hidden');
        arrow.style.transform = expanded ? '' : 'rotate(180deg)';
        btn.querySelector('span').textContent = expanded ? 'Show more skills' : 'Show fewer skills';
      });
    }
  }
}
customElements.define('my-skills', MySkills);