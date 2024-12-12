
import Link from "next/link";

const conditiongeneral = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8 mb-20">
        <nav className="text-sm text-slate-500 mb-10">
          <a href="#" className="hover:underline text-[#203edc]">
            Accueil
          </a>{" "}
          &gt; <span>Condition générale</span>
        </nav>

        <h1 className="text-2xl font-bold mb-6">
          Condition Générales du site <Link href="/" className="text-[#203cdb]">raccoelec.fr</Link>
        </h1>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Engagements</h2>
          <p>
            Chez <Link href="/" className="text-[#203cdb]">raccoelec.fr</Link>, nous nous engageons à offrir une assistance personnalisée pour répondre à vos besoins en matière de raccordement électrique. Nous prenons en charge toute la gestion administrative pour vous offrir une expérience sans stress. De plus, nous assurons un suivi continu de votre dossier pour vous tenir informé de chaque étape de votre demande. Enfin, nous travaillons rapidement et efficacement pour assurer le raccordement de votre projet dans les meilleurs délais.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Services</h2>
          <p>Le site propose des services de conseil et d’assistance pour les démarches de raccordement au réseau d’électricité (les « Services »). La Société s’efforce de fournir des descriptions aussi précises que possible des Services. Cependant, elle ne garantit pas que les descriptions sont complètes, à jour ou exemptes d’erreurs.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Commandes</h2>
          <p>Le Client peut passer commande sur le site en suivant le processus de commande en ligne. Toute commande passée constitue une offre d’achat des Services conformément aux présentes Conditions Générales. La Société se réserve le droit d’accepter ou de refuser une commande pour des raisons légitimes, notamment en cas de problème de paiement, de suspicion de fraude ou de demande inhabituelle.</p>
        </section>

        <section  className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Prix et Paiement</h2>
          <p>Les prix des Services sont indiqués en euros et sont susceptibles de modification à tout moment. Les prix applicables sont ceux en vigueur au moment de la commande. Le paiement des Services peut être effectué par carte bancaire via une plateforme de paiement sécurisée. Le Client garantit qu’il est pleinement autorisé à utiliser la carte de paiement pour régler sa commande.</p>
        </section>

        <section  className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Livraison des Services</h2>
          <p>Les Services sont fournis par voie électronique via le site ou par d’autres moyens convenus avec le Client. La Société s’engage à fournir les Services dans les meilleurs délais suivant la réception du paiement.</p>
        </section>

        <section  className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Responsabilité</h2>
          <p>La Société s’engage à fournir les Services avec diligence et conformément aux règles de l’art. Cependant, elle ne saurait être tenue responsable en cas de dommages indirects, imprévisibles ou non imputables à la Société, tels que la perte de profit ou la perte de données.</p>
        </section>

        <section  className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Protection des Données Personnelles</h2>
          <p>Les données personnelles collectées sur le site sont traitées conformément à la politique de confidentialité de la Société. Le Client dispose d’un droit d’accès, de rectification et de suppression des données le concernant, qu’il peut exercer en contactant la Société à l’adresse suivante : <Link href="mailto:serviceclient@raccoelec.fr?_rsc=1q4xj" className="text-[#203cdb]">serviceclient@raccoelec.fr</Link>.</p>
        </section>

        <section  className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Droit Applicable et Litiges</h2>
          <p>Les présentes Conditions Générales sont régies par le droit français. En cas de litige, les parties s’efforceront de trouver une solution amiable avant de recourir aux tribunaux compétents.</p>
        </section>

      </div>
    </>
  );
};

export default conditiongeneral;
