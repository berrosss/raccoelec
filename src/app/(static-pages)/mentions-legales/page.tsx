
import Link from "next/link";

const mentionslegales = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8 mb-20">
        <nav className="text-sm text-slate-500 mb-10">
          <a href="#" className="hover:underline text-[#203edc]">
            Accueil
          </a>{" "}
          &gt; <span>Mentions légales</span>
        </nav>
        <h1 className="text-2xl font-bold mb-6">
          Mentions légales du site <Link href="/" className="text-[#203cdb]">raccoelec.fr</Link>
        </h1>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Assistance personnalisée</h2>
          <p>
            Nous proposons une assistance sur mesure pour répondre spécifiquement à vos besoins en matière de raccordement électrique. Nous prenons en charge l’ensemble des démarches administratives liées à votre raccordement, afin de vous offrir une expérience sereine et sans stress. Nous assurons un suivi régulier de votre dossier, vous tenant informé à chaque étape de votre demande. Notre objectif : un raccordement rapide et efficace pour votre bâtiment.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Article 1 – Propriété du Site
          </h2>
          <p>Le site <Link href="/" className="text-[#203cdb]">raccoelec.fr</Link> est la propriété exclusive de la société, immatriculée au Registre du Commerce et des Sociétés de Kington (ci-après dénommée « la Société »).</p>
          <p>Vous pouvez contacter la Société via :</p>
          <p><strong>Email</strong> : serviceclient@raccoelec.fr</p>
          <p><strong>Téléphone</strong> : 09 70 70 70 70</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Article 2 – Conception et Édition du Site
          </h2>
          <p>La conception ainsi que le suivi éditorial du site sont assurés par <Link href="/" className="text-[#203cdb]">raccoelec.fr</Link></p>
          <p>Pour toute question ou demande :</p>
          <p><strong>Email</strong> : serviceclient@raccoelec.fr</p>
          <p><strong>Téléphone</strong> : 09 70 70 70 70</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Article 3 – Hébergement du Site</h2>
          <p>L’hébergement du site est assuré par la société <strong>Hostinger</strong>, dont le siège social est situé à :</p>
          <p><strong>Jonavos g. 60C, LT-44192 Kaunas, République de Lituanie.</strong></p>
        </section>

      </div>
    </>
  );
};

export default mentionslegales;
