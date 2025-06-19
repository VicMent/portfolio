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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="relative">
            <div class="card p-1 rounded-2xl">
              <div class="bg-gray-900 rounded-xl p-4">
                <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                       alt="Coding" 
                       class="w-full h-full object-cover rounded-lg">
                </div>
              </div>
            </div>
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
              My approach blends technical depth with intuitive design to build systems that are not just usable, but fun.
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
                <span>Playful Interfaces</span>
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