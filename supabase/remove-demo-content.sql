-- ============================================================
--  Mazaly — Suppression du contenu de démonstration
--  Retire les 6 news « demo-… » et les 10 mivzakim « (Exemple) ».
--  Ne touche à aucun contenu réel. Relançable sans risque.
-- ============================================================

-- Aperçu de ce qui va être supprimé (facultatif) :
-- select titre, slug from articles where slug like 'demo-%';
-- select texte from mivzakim where texte like '(Exemple)%';

delete from articles where slug like 'demo-%';

delete from mivzakim where texte like '(Exemple)%';
