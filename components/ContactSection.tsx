import { sendMessage } from "@/app/actions/sendMessage";

export function ContactSection() {
  return (
    <section id="contact" className="bg-slate-950">
      <div className="container-kosmonde space-y-8 py-16">
        <div className="max-w-xl space-y-3">
          <h2 className="section-title">Parlons de ton projet</h2>
          <p className="section-subtitle">
            Quelques phrases suffisent pour commencer. Tu peux décrire ton
            activité, ton besoin, ton budget approximatif ou juste ton idée.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1.1fr,1fr]">
          {/* on avertit TypeScript que c'est une Server Action */}
          {/* @ts-expect-error Server Action */}
          <form action={sendMessage} className="card-soft space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-xs font-medium text-slate-200"
                >
                  Nom
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs text-slate-50 outline-none focus:border-sky-400"
                  placeholder="Ton nom ou celui de ta structure"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-slate-200"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs text-slate-50 outline-none focus:border-sky-400"
                  placeholder="adresse@email.ch"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="project-type"
                className="text-xs font-medium text-slate-200"
              >
                Type de projet
              </label>
              <select
                id="project-type"
                name="project-type"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs text-slate-50 outline-none focus:border-sky-400"
              >
                <option value="">Choisir une option</option>
                <option value="onepage">Site One-page</option>
                <option value="vitrine">Site vitrine</option>
                <option value="surmesure">Projet sur mesure</option>
                <option value="autre">Je ne sais pas encore</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="message"
                className="text-xs font-medium text-slate-200"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs text-slate-50 outline-none focus:border-sky-400"
                placeholder="Parle-moi de ton activité, de ce que tu veux que ton site fasse, de ton délai idéal..."
              />
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-sky-400 px-6 py-2.5 text-sm font-medium text-slate-950 hover:bg-sky-300"
            >
              Envoyer le message
            </button>

            <p className="text-[11px] text-slate-500">
              En cliquant sur envoyer, tu acceptes que je te contacte par
              email pour parler de ton projet. Aucune newsletter automatique.
            </p>
          </form>

          {/* colonne texte inchangée */}
          <div className="space-y-4 text-sm text-slate-300">
            <p>
              Tu peux aussi simplement m’écrire un message direct avec
              quelques lignes sur ton projet. On clarifie ensemble ce qui est
              possible, sans pression.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <p>
                • Tu as déjà un site et tu veux le refaire ?<br />
                • Tu pars de zéro et tu ne sais pas par où commencer ?<br />
                • Tu as juste besoin d’un avis sur ton idée ?
              </p>
              <p>
                Dans tous les cas, on peut poser les bases calmement et
                décider de la suite ensuite.
              </p>
            </div>
            <p className="text-xs font-medium text-sky-300">
              Tu développes ton projet, KOSMONDE t’aide à lui donner une
              présence claire sur le web.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
