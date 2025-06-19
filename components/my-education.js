class MyEducation extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="education" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">
            <span class="gradient-text">My</span>
            <span class="glow-secondary">Education</span>
          </h2>
          <div class="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div>
            <h3 class="text-2xl font-bold mb-6">Building Creative Digital Solutions</h3>
            <p class="text-gray-400 mb-6">
              My studies at UCLL focused on the intersection of technology and design. The Digital Experience track gave me hands-on experience with user-centric interfaces, AR/VR, and gamified applications.
            </p>
            <div class="grid grid-cols-1 gap-3 mb-8">
              <div class="flex items-center">
                <span class="mr-3 text-primary text-lg gradient-text">🖌️</span>
                <span>Immersive UI & visual design</span>
              </div>
              <div class="flex items-center">
                <span class="mr-3 text-primary text-lg gradient-text">🕹️</span>
                <span>AR/VR & 3D project work</span>
              </div>
              <div class="flex items-center">
                <span class="mr-3 text-primary text-lg gradient-text">👍</span>
                <span>International teamwork & research</span>
              </div>
            </div>
            <a href="#" class="inline-flex items-center text-primary font-medium">
              View Diploma <i class="fas fa-external-link-alt ml-2"></i>
            </a>
          </div>
          <div class="relative">
            <div class="card p-1 rounded-2xl">
              <div class="bg-gray-900 rounded-xl p-4 flex flex-col items-center">
                <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-4 w-full">
                  <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
                       alt="Graduation cap"
                       class="w-full h-full object-cover rounded-lg">
                </div>
                <div class="flex flex-col items-center">
                  <h3 class="text-lg font-semibold mb-1 text-center">Bachelor of Applied Computer Science</h3>
                  <span class="text-sm text-gray-400 mb-1 text-center">Digital Experience Track</span>
                  <span class="text-xs text-gray-400 text-center">UCLL, Heverlee &nbsp;•&nbsp; Graduation: [Year]</span>
                </div>
              </div>
            </div>
            <div class="absolute -z-10 -top-10 -left-10 w-64 h-64 rounded-full bg-secondary bg-opacity-10 blur-3xl"></div>
          </div>
        </div>
      </section>
    `;
  }
}
customElements.define('my-education', MyEducation);