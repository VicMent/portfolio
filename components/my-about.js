class MyAbout extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="about" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">
            <span class="gradient-text">About</span> 
            <span class="glow">Me</span>
          </h2>
          <div class="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-36 items-center">
          <div class="relative max-w-xs w-full mx-auto md:mx-0">
            <div class="absolute top-2 left-1/2 -translate-x-1/2 z-20">
              <div class="group relative">
                <span class="bg-black/70 text-xs text-white px-3 py-1 rounded shadow cursor-pointer select-none ">
                  AI generated*
                </span>
                <div class="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-black/90 text-white text-xs rounded p-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30">
                  This marble bust was created using AI. First a photo was transformed into a marble statue image using AI, then that image was converted into a 3D model with another AI tool.
                </div>
              </div>
            </div>
            <marble-viewer class="w-full h-auto block aspect-square rounded-lg"></marble-viewer>
            <div class="absolute -z-10 -top-10 -left-10 w-64 h-64 rounded-full bg-primary bg-opacity-10 blur-3xl"></div>
          </div>
          <div>
            <h3 class="text-2xl font-bold mb-6">Crafting Digital Experiences</h3>
            <p class="text-gray-400 mb-6">
              I'm a creative developer with a strong focus on interaction, design, and gamification.  
              My journey in tech started through passion projects and playful experiments—and I’ve been hooked ever since.
            </p>
            <p class="text-gray-400 mb-8">
              I specialize in JavaScript & Python frameworks, with experience in React, Unity, and much more.  
              My approach blends technical depth with intuitive design to build systems that are not just usable, but fun. I’m always eager to learn new things and explore fresh ideas.
            </p>
            <div class="grid grid-cols-2 gap-4 mb-8">
              <div class="flex items-center">
                <div class="mr-3 text-primary">
                  <i class="fas fa-check-circle"></i>
                </div>
                <span>Problem Solving</span>
              </div>
              <div class="flex items-center">
                <div class="mr-3 text-primary">
                  <i class="fas fa-check-circle"></i>
                </div>
                <span>Clean Code</span>
              </div>
              <div class="flex items-center">
                <div class="mr-3 text-primary">
                  <i class="fas fa-check-circle"></i>
                </div>
                <span>Responsive Design</span>
              </div>
              <div class="flex items-center">
                <div class="mr-3 text-primary">
                  <i class="fas fa-check-circle"></i>
                </div>
                <span>Love to Learn</span>
              </div>
            </div>
            <a href="#" class="inline-flex items-center text-primary font-medium">
              Download CV <i class="fas fa-download ml-2"></i>
            </a>
          </div>
        </div>
      </section>
    `;
  }
}
customElements.define('my-about', MyAbout);
