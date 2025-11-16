export function AProposSection() {
  return (
    <section
      id="a-propos"
      className="border-b border-slate-900/40 bg-slate-950"
    >
      <div className="container-kosmonde space-y-12 py-16">
        <div className="grid gap-10 md:grid-cols-[1.1fr,1.3fr]">
          {/* À propos */}
          <div>
            <h2 className="section-title">À propos de KOSMONDE</h2>
            <p className="section-subtitle">
              Derrière KOSMONDE, il y a Yanis, créateur de sites web avec une
              obsession : rendre le numérique plus simple à vivre.
            </p>
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <p>
                Je conçois des sites web pour des personnes et des structures
                qui veulent quelque chose de clair, utile et aligné avec leur
                réalité. Pas de solution magique, juste du travail sérieux,
                étape par étape.
              </p>
              <p>
                Mon approche : écouter, simplifier, structurer. Tu n’as pas
                besoin d’être “bon en tech” ni de tout savoir à l’avance.
              </p>
              <p className="text-xs text-slate-400">
                Objectif global : t’aider à poser des bases solides pour ton
                projet, grâce à un site qui te ressemble.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="text-sm font-semibold text-slate-50">
              Questions fréquentes
            </h3>
            <div className="mt-4 space-y-3">
              <div className="faq-item">
                <p className="faq-question">
                  Combien de temps faut-il pour créer un site ?
                </p>
                <p className="faq-answer">
                  Pour une one-page simple, on peut aller assez vite si ton
                  contenu est prêt (quelques semaines). Pour un site vitrine
                  plus complet, il faut un peu plus de temps. On définit un
                  calendrier clair dès le départ.
                </p>
              </div>
              <div className="faq-item">
                <p className="faq-question">
                  Comment se passe le paiement ?
                </p>
                <p className="faq-answer">
                  En général : un acompte au démarrage, puis le reste à la
                  livraison du site. Tout est clarifié ensemble avant de
                  commencer.
                </p>
              </div>
              <div className="faq-item">
                <p className="faq-question">
                  Et si je veux modifier du contenu plus tard ?
                </p>
                <p className="faq-answer">
                  On peut soit prévoir une formule où je fais les changements
                  pour toi, soit préparer une solution où tu peux modifier
                  certains contenus facilement.
                </p>
              </div>
              <div className="faq-item">
                <p className="faq-question">
                  Le site sera-t-il adapté au mobile ?
                </p>
                <p className="faq-answer">
                  Oui, c’est une base non négociable. Le site est conçu pour
                  fonctionner proprement sur mobile, tablette et ordinateur.
                </p>
              </div>
              <div className="faq-item">
                <p className="faq-question">
                  Est-ce que tu peux aussi m’aider pour l’email pro et le nom
                  de domaine ?
                </p>
                <p className="faq-answer">
                  Oui, je peux t’accompagner pour choisir et configurer ton nom
                  de domaine, ton hébergement et une adresse email
                  professionnelle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
