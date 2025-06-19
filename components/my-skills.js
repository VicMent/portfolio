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
        <div class="skill-pill px-4 py-2 rounded-full flex items-center">
          <div class="w-8 h-8 mr-3 flex items-center justify-center">
            <i class="fab fa-js text-yellow-400 text-xl"></i>
          </div>
          <span>JavaScript</span>
        </div>
        <div class="skill-pill px-4 py-2 rounded-full flex items-center">
          <div class="w-8 h-8 mr-3 flex items-center justify-center">
            <i class="fab fa-react text-blue-400 text-xl"></i>
          </div>
          <span>React</span>
        </div>
        <div class="skill-pill px-4 py-2 rounded-full flex items-center">
          <div class="w-8 h-8 mr-3 flex items-center justify-center">
            <i class="fas fa-cube text-green-400 text-xl"></i>
          </div>
          <span>Unity (C#)</span>
        </div>
        <div class="skill-pill px-4 py-2 rounded-full flex items-center">
          <div class="w-8 h-8 mr-3 flex items-center justify-center">
            <i class="fas fa-cube text-purple-400 text-xl"></i>
          </div>
          <span>Three.js</span>
        </div>
        <div class="skill-pill px-4 py-2 rounded-full flex items-center">
          <div class="w-8 h-8 mr-3 flex items-center justify-center">
            <i class="fas fa-database text-teal-400 text-xl"></i>
          </div>
          <span>PostgreSQL</span>
        </div>
        <div class="skill-pill px-4 py-2 rounded-full flex items-center">
          <div class="w-8 h-8 mr-3 flex items-center justify-center">
            <i class="fas fa-terminal text-gray-300 text-xl"></i>
          </div>
          <span>Node.js</span>
        </div>
      </div>
    </div>
    <div>
      <h3 class="text-2xl font-bold mb-6">My Expertise</h3>
      <div class="space-y-6">
        <div>
          <div class="flex justify-between mb-2">
            <span>Frontend Development</span>
            <span>90%</span>
          </div>
          <div class="w-full bg-gray-800 rounded-full h-2.5">
            <div class="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full" style="width: 90%"></div>
          </div>
        </div>
        <div>
          <div class="flex justify-between mb-2">
            <span>Game Development</span>
            <span>85%</span>
          </div>
          <div class="w-full bg-gray-800 rounded-full h-2.5">
            <div class="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full" style="width: 85%"></div>
          </div>
        </div>
        <div>
          <div class="flex justify-between mb-2">
            <span>UI/UX Design</span>
            <span>80%</span>
          </div>
          <div class="w-full bg-gray-800 rounded-full h-2.5">
            <div class="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full" style="width: 80%"></div>
          </div>
        </div>
        <div>
          <div class="flex justify-between mb-2">
            <span>Backend Development</span>
            <span>75%</span>
          </div>
          <div class="w-full bg-gray-800 rounded-full h-2.5">
            <div class="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full" style="width: 75%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    `;
  }
}
customElements.define('my-skills', MySkills);