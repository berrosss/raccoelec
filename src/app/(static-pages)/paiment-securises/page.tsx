
import Link from "next/link";

const paimentsecurises = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8 mb-18">
        <nav className="text-sm text-slate-500 mb-10">
          <a href="#" className="hover:underline text-[#203edc]">
            Accueil
          </a>{" "}
          &gt; <span>Paiements sécurisés</span>
        </nav>
        <h1 className="text-2xl font-bold mb-6">
          Paiements sécurisés sur <Link href="/" className="text-[#203cdb]">raccoelec.fr</Link>
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Paiements par carte bancaire 100% sécurisés</h2> <br />
          <p>Nous vous garantissons que chaque transaction réalisée sur Raccoelec est sécurisée à 100%. Toutes les opérations impliquant la gestion de données personnelles ou bancaires sont effectuées dans un environnement protégé. Ainsi, toutes les informations que vous partagez circulent de façon cryptée à travers notre réseau.</p><br />
          <p>(Si vous souhaitez en savoir davantage, consultez la section <strong>Paiement sécurisé</strong> de notre site web).</p><br />
          <p>De plus, les informations de votre carte de crédit sont directement transmises au TPV (Terminal de Point de Vente) de la banque et ne sont enregistrées dans aucune base de données.</p><br />
          <p>Afin de renforcer la sécurité pour les propriétaires de cartes de crédit, nous avons intégré un système de paiement sécurisé appelé SEC (Secure Electronic Commerce). Ainsi, si vous</p><br />
          <p>possédez une carte de crédit « sécurisée », vous pourrez effectuer des paiements en toute confiance sur notre site avec votre carte VISA ou MASTERCARD.</p><br />
          <p>Si vous ne possédez pas une telle carte de crédit, Raccoelec n’acceptera le paiement par carte VISA ou MASTERCARD que si l’ancienneté et la fiabilité du client sont démontrées.</p><br />
          <p>Dans les deux cas, pour tout paiement par carte VISA ou MASTERCARD, les informations suivantes seront requises afin d’assurer des transactions sécurisées </p><br />
          <ul className="list-disc ml-16">
            <li>Le numéro de la carte</li>
            <li>La date d’expiration</li>
            <li>Le code de vérification à trois chiffres indiqué au dos de la carte</li>
          </ul> <br />
          <p><strong>Important</strong> : La fraude par carte de crédit est un délit. Raccoelec se réserve le droit d’entreprendre des actions en justice contre toute personne effectuant une transaction frauduleuse sur notre site web.</p>
        </section>

      </div>
    </>
  );
};

export default paimentsecurises;
