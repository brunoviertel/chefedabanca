/*
 * =====================================================
 *  CONFIGURAÇÃO DO SITE — edite apenas este arquivo
 * =====================================================
 *  Troque textos e links aqui. Mantenha as aspas e as
 *  vírgulas no final de cada linha.
 */
window.SITE_CONFIG = {
  // Perfil
  name: "Chefe da Banca",
  tagline: "Jogo é diversão, banca é coisa séria 🎩",
  photo: "assets/perfil-512.jpg",
  photoAlt: "Chefe da Banca",

  // Botões (na ordem em que aparecem)
  // track = nome do evento enviado ao analytics quando alguém clica
  links: [
    { label: "🎲 Jogos do Chefe",    url: "https://t.me/+UJgI7EikkGU2ZDVh", track: "jogos" },
    { label: "⚽ Palpites do Chefe", url: "https://t.me/+UGjfO2eE-CFmMWIx", track: "palpites" }
  ],

  // Avisos do rodapé (um por linha)
  notices: [
    "🔞 Conteúdo exclusivo para maiores de 18 anos.",
    "Jogue com responsabilidade."
  ],

  // Repassar parâmetros utm_* da URL da página para os botões
  forwardUtm: true,

  // Faíscas douradas no fundo (desligam sozinhas com "reduzir movimento")
  sparks: true
};
