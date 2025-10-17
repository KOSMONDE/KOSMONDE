import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Rocket } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Cosmic background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
        <div
          className="absolute top-20 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 right-1/4 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                <Rocket className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                KOSMONDE
              </h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Votre partenaire de confiance pour la création de sites web modernes et performants. Nous transformons vos
              idées en expériences digitales exceptionnelles.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/kosmonde/" className="text-gray-400 hover:text-pink-400 transition-colors group">
                <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <a href="#accueil" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#apropos" className="text-gray-300 hover:text-pink-400 transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-cyan-400" />
                <span className="text-gray-300 text-sm">contact@kosmonde.fr</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-purple-400" />
                <span className="text-gray-300 text-sm">+33 6 86 11 43 97</span>
              </div>
             
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 KOSMONDE. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/mentions-legales" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
              Mentions légales
            </a>
            <a href="/politique-de-confidentialite" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
              Politique de confidentialité
            </a>
            <a href="/cgv" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              CGV
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
