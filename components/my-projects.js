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
          <!-- Project 1: Scouts Blauberg Sponsor Management -->
          <div class="project-card">
            <div class="project-inner card h-full rounded-xl overflow-hidden">
              <div class="relative">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1770&q=80"
                    alt="Scouts Blauberg Sponsor Management"
                    class="w-full h-48 object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div class="absolute bottom-4 left-4">
                  <span class="text-xs px-2 py-1 bg-primary rounded text-white">Sponsor Management</span>
                  <span class="text-xs px-2 py-1 bg-secondary rounded ml-2 text-white">Scouts Blauberg</span>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2">Scouts Blauberg Sponsor Management</h3>
                <p class="text-gray-400 text-sm mb-4">
                  A web application for <span class="font-semibold text-primary">Scouts Blauberg</span> to manage sponsors for the annual <span class="font-semibold">Kermisuif</span> event. Users can be assigned to specific sponsors, track progress, and ensure all sponsors are managed and completed efficiently for a smooth event organization.
                </p>
                <div class="flex space-x-3">
                  <a href="https://vicment.github.io/KermisFuif_Frontend/" class="text-primary hover:text-secondary" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                  </a>
                  <a href="https://github.com/VicMent/KermisFuif_Frontend" class="text-primary hover:text-secondary" target="_blank">
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
                  <span class="text-xs px-2 py-1 bg-primary rounded text-white">Web Game</span>
                  <span class="text-xs px-2 py-1 bg-secondary rounded ml-2 text-white">Workshops</span>
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
                  <span class="text-xs px-2 py-1 bg-primary rounded text-white">Full Stack</span>
                  <span class="text-xs px-2 py-1 bg-secondary rounded ml-2 text-white">Education Game</span>
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