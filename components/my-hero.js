class MyHero extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="home" class="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="absolute top-0 right-0 w-1/2 h-full -z-10">
          <div id="3d-container" class="w-full h-full"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <h1 class="text-4xl md:text-6xl font-bold mb-4">
              <span class="gradient-text">Hello, I'm</span> 
              <span class="glow">Vic</span>
            </h1>
            <h2 class="text-2xl md:text-4xl font-bold mb-6 glow-secondary">Full Stack Developer</h2>
            <p class="text-gray-400 mb-8 max-w-lg">
              I craft playful, immersive digital experiences that blend design, interaction, and gamification.
              Passionate about building smart, engaging systems. Whether it’s on the web, in 3D, or a game engine.
            </p>
            <div class="flex space-x-4">
              <a href="#contact" class="btn-primary px-6 py-3 rounded-full text-sm font-semibold">Hire Me</a>
              <a href="#projects" class="btn-outline px-6 py-3 rounded-full text-sm font-semibold">View Work</a>
            </div>
          </div>
          <div class="relative flex justify-center">
            <div class="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary border-opacity-30 pulse">
              <img src="assets/2.png" alt="Developer" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-20"></div>
            </div>
            <div class="absolute -bottom-5 -left-5 w-32 h-32 rounded-full bg-primary bg-opacity-10 blur-xl"></div>
            <div class="absolute -top-5 -right-5 w-32 h-32 rounded-full bg-secondary bg-opacity-10 blur-xl"></div>
          </div>
        </div>
      </section>
    `;
  }
}
customElements.define('my-hero', MyHero);