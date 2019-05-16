# alenvi-test

**Etude de cas :**

Le but de l’exercice est de déterminer le prix des interventions à facturer à nos bénéficiaires.

Le raisonnement est guidé pour te permettre d'avancer par étape. A chaque nouvelle question, tu pourras repartir du code de la question précédente et l'enrichir pour répondre au probleme posé.  
Pour aider à la compréhension du cas, des exemples des objets manipulés (intervention, bénéficiaire) seront donnés. Les méthodes devront bien sûr s'appliquer à tout autre evenement/bénéficiaire (date différente, prix différent,...)

Une attention particulière sera donnée à la clarté et l'architecture du code.


Lexique :
- *Bénéficiaire* : personne agée accompagnée par un auxiliaire d'envie.
- *Service* : Nous proposons aux personnes que nous accompagnons 2 types d'accompagnement : aide a l'autonomie et ménage.
- *Souscription* : Abonnement d'un beneficiaire a un service pour un prix donné.
- *Intervention* : Temps d'accompagnement du beneficiaire par l'auxiliaire d'envie.


Madame X est une de nos bénéficiaires. Elle a souscrit à un service « Aide a l'autonomie » dès le 1er février au prix de 24€ de l'heure. Ce prix a évolué le 15 avril et est passé à 22€ de l'heure.  
On considère, par exemple, ce bénéficiaire avec la souscription suivante :
```
const customer = {
  _id: '1234567890',
  identity : { lastname : ‘X’ },
  subscription: {
    _id: 'qwertyuio',
    service: {
      name: 'Aide a l'autonomie',
    },
    versions: [
      { startDate: '2019/02/01', unitTTCPrice: 24 },
      { startDate: '2019/04/15', unitTTCPrice: 22 },
    ],
  },
};
```

**1.	Ecrire une méthode qui pour une date donnée retourne la version de la souscription correspondante.**
La méthode prendra en entrée la date et la souscritpion.


Anne, auxiliaire d’envie chez Alenvi, intervient tous les lundis, jeudis et samedis de 10h à 12h30 chez Madame X.  
On considère, par exemple, cette intervention de 2h30 le 11 avril chez Madame X :
```
const event = {
  date: '2019/04/11',
  duration: 150,
  customer: '1234567890',
};

customer: {
  _id: '1234567890',
  identity : { lastname : ‘X’ },
  subscription: {
    _id: 'qwertyuio',
    service: {
      name: 'Aide a l'autonomie',
    },
    versions: [
      { startDate: '2019/02/01', unitTTCPrice: 24 },
      { startDate: '2019/04/15', unitTTCPrice: 22 },
    ],
  },
};
```

**2.	Ecrire une méthode qui pour une intervention donnée retourne son prix facturé au bénéficiaire.**


Anne, notre auxiliaire d'envie, travaille tous les samedis chez Madame X. Puisque c'est un jour de we, le prix de cette intervention est majoré de 10%. Pour une intervention ayant lieu le dimanche, le prix est majoré de 15%.  
On modifie donc les informations de l'intervention :
```
const event = {
  date: '2019/04/11',
  duration: 150,
  customer: '1234567890',
};

const customer = {
  _id: '1234567890',
  identity : { lastname : ‘X’ },
  subscription: {
    _id: 'qwertyuio',
    service: {
      name: 'Aide a l'autonomie',
      saturdaySurcharge: 10,
      sundaySurcharge: 15,
    },
    versions: [
      { startDate: '2019/02/01', unitTTCPrice: 24 },
      { startDate: '2019/04/15', unitTTCPrice: 22 },
    ],
  },
};
```

**3.	Modifier le code précédent pour prendre en compte ces majorations selon la date de l'intervention donné.**


Madame X reçoit une aide financière du département qui prend en charge un pourcentage du prix des interventions du lundi au vendredi.
Cette aide est appelée financement et est payé par une tiers-payeur. Chaque intervention est donc en partie payée par le bénéficiaire et en partie par le tiers-payeur.  
On modifie donc les informations de l'intervention :
```
const event = {
  date: '2019/04/11',
  duration: 150,
  customer: '1234567890',
};

const customer = {
  _id: '1234567890',
  identity : { lastname : ‘X’ },
  subscription: {
    _id: 'qwertyuio',
    service: {
      name: 'Aide a l'autonomie',
      saturdaySurcharge: 10,
      sundaySurcharge: 15,
    },
    versions: [
      { startDate: '2019/02/01', unitTTCPrice: 24 },
      { startDate: '2019/04/15', unitTTCPrice: 22 },
    ],
  },
  funding: { percentage: 60, thirdPartyPayer: 'Hauts de Seine' },
};
```

**4. Modifier le code précédent pour prendre en compte cet eventuel financement et calculer le montant payé par le beneficiaire et celui payé par le financement.**   
La méthode devra retourner les deux montants et prendre en compte le cas de l'absence de financement.


En réalité, un bénéficiaire peut souscrire à plusieurs services : l'aide a l'autonomie et le ménage. Ces services sont facturés à des prix différents.
Les données changent donc comme suit :
- Un bénéficaire est relié à plusieurs souscriptions et pour chacune on a le detail des tarifs et des majorations.
- Une intervention est reliée à une bénéficiaire et à une souscription.
- Un financement est relié à une souscription.
- Un bénéficaire peut donc avoir plusieurs aides financières du département : une par souscription.

```
const event = {
  date: '2019/04/11',
  duration: 150,
  customer: '1234567890',
  subscription: 'asdfghjkl',
};

const customer = {
  _id: '1234567890',
  identity : { lastname : ‘X’ },
  subscriptions: [{
    _id: 'qwertyuio',
    service: {
      name: 'Aide a l'autonomie',
      saturdaySurcharge: 10,
      sundaySurcharge: 15,
    },
    versions: [
      { startDate: '2019/02/01', unitTTCPrice: 24 },
      { startDate: '2019/04/15', unitTTCPrice: 22 },
    ],
  }, {
    _id: 'asdfghjkl',
    service: { name: 'Ménage' },
    versions: [
      { startDate: '2019/02/01', unitTTCPrice: 22.3 },
      { startDate: '2019/04/15', unitTTCPrice: 21.7 },
    ],
  }],
  fundings: [{
    subscription: 'qwertyuio',
    percentage: 60,
    thirdPartyPayer: 'Hauts de Seine',
  }],
};
```

**5. Adapter la methode précédente pour prendre en compte ces changements dans le calcul des montants facturés**


Les factures sont envoyées tous les 15 jours aux bénéficiaires. Une facture contient donc plusieurs évènements facturés.

**6. Ecrire une méthode qui pour un bénéficiaire et une liste d'interventions retourne pour chaque intervention, les montants facturés au bénéficiaire et au financement ainsi que le montant total de la facture.**

<br/>

** Pour aller plus loin** :  
Le pourcentage de participation du financement peut varier de 0 à 100:
- À 100%, le tiers payeur paie la totalité du montant des interventions facturées. Une seule facture est donc créée, à destination du tiers payeur.
- À 0%, le bénéficiaire paie la totalité du montant des interventions facturées. Une seule facture est donc créée, à destination du bénéficiaire.
- Entre les deux, le bénéficiaire et le tiers payeur se partagent le montant. Deux factures sont donc créées : une pour le bénéficiaire et une pour le tiers payeur.

**Modifier la méthode précédente pour qu'elle retourne un tableau de factures : un ou deux selon les cas. Chaque facture devra contenir les champs `customer` et `thirdPartyPayer` indiquant les identifiants concernés.**  
(`thirdPartyPayer` dernier pourra etre nul si la facture est à destination du bénéficiaire).
