# ACW — Contexte métier (règles inviolables sur tous les écrans)

Source : vision AfriCand Consulting. À respecter sur chaque écran, démo comme production.

## Modèle
AfriCand est un réseau de consultants indépendants. Chaque consultant a un contrat avec AfriCand, **pas avec le client**.
AfriCand vend la mission au client, facture le client, encaisse le paiement, puis reverse au consultant sa part
(le reste est la commission AfriCand).

## Qui parle à qui
- L'entreprise cliente ne contacte **jamais** le consultant directement : pas de téléphone, e-mail, LinkedIn
  ni adresse personnelle du consultant dans l'espace Business.
- Le seul interlocuteur du client est AfriCand (son chargé de compte). Tous les boutons de contact côté
  Business mènent vers AfriCand : « Appeler AfriCand », « Écrire à AfriCand », « Demander un appel via AfriCand ».
- Les appels d'introduction sont **demandés à AfriCand, organisés et animés par AfriCand**,
  avec le consultant présent comme « consultant AfriCand ».
- Le consultant est présenté comme **« Consultant indépendant AfriCand »**,
  jamais comme un prestataire que le client engage lui-même.

## Argent et contrats
- **Business** : propositions, contrats et factures émis par AfriCand au client. Le client paie AfriCand.
  On n'affiche **jamais** au client la part reversée ni la commission.
  Références factures : `[FA-…]`. Aucune mention de commission.
- **Experts** : le consultant voit son contrat avec AfriCand, ses missions et ses paiements reçus d'AfriCand
  (montant de sa part, date de versement, statut). Références reversements : `[RV-…]`.
  Il ne facture pas le client et ne voit pas la facture client.
- **Administration** : AfriCand voit tout : montant facturé, encaissement, part consultant, commission,
  date de reversement. Le reversement se déclenche **après encaissement** du client.

## Parcours type
Besoin client → AfriCand qualifie → AfriCand propose un consultant de son réseau →
appel d'introduction animé par AfriCand → proposition et contrat AfriCand ↔ client →
mission → facture AfriCand au client → encaissement → reversement de la part au consultant.

## Déclinaison écrans (état vérifié)
- `/business/profils/*`, `/business/introductions/*` : variante anonymisée (55), contacts AfriCand uniquement.
- `/business/introductions/appel` : planification via AfriCand (créneau, format, participants).
- `/experts/paiements` : versements AfriCand uniquement, refs `[RV-…]`.
- `/admin/facturation` : double flux `Factures clients [FA-…]` / `Reversements experts [RV-…]` + commission.

## Révélation identité (ADR-013)
Le profil reste anonyme (variante 55) jusqu'au **double accord entreprise + consultant ET validation admin AfriCand**.
Après révélation (variante 52) : nom, photo et parcours complet visibles.
Les coordonnées personnelles du consultant (téléphone, e-mail, LinkedIn) ne sont **JAMAIS** montrées à l'entreprise :
contact uniquement via AfriCand (chargé de compte, appel animé par AfriCand, facturation puis reversement au consultant).
