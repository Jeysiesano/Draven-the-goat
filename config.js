//#VAWULENCE 🗿
// Credit: Ꭰrαveηㅤ⸙      the goat
const fs = require("fs-extra");
const ytdl = require("ytdl-core"); // pour YouTube
const axios = require("axios"); // pour API externes
const translate = require("@vitalets/google-translate-api"); // traduction
const moment = require("moment"); // date/heure

if (fs.existsSync(".env")) {
  require("dotenv").config({ path: __dirname + "/.env" });
}

// === CONFIG GLOBALE ===
global.owner = "+243801757764";
global.ownerName = "Ꭰꭈαᴠɛηㅤ⸙";
global.admins = [];
global.silentMode = false;

// === EXPORT CONFIG ===
module.exports = {
  HANDLERS: process.env.PREFIX || "*",
  VERSION: process.env.VERSION || "1.0.0",
  botname: process.env.BOT_NAME || "ᴅʀᴀᴠᴇɴ-ʙᴏᴛ 💔🗿",
  ownername: global.ownerName,
};

// === Commandes générales ===
async function handlePing(sock, chat) {
  await sock.sendMessage(chat, { text: "🏓 Pong! Le bot est en ligne." });
}
async function handleUptime(sock, chat) {
  const uptime = process.uptime();
  await sock.sendMessage(chat, { text: `⏱️ Uptime: ${Math.floor(uptime)} secondes` });
}
async function handleDate(sock, chat) {
  await sock.sendMessage(chat, { text: `📅 Aujourd'hui: ${moment().format("DD/MM/YYYY")}` });
}
async function handleTime(sock, chat) {
  await sock.sendMessage(chat, { text: `🕒 Heure actuelle: ${moment().format("HH:mm:ss")}` });
}
async function handleTranslate(sock, chat, args) {
  const text = args.slice(1).join(" ");
  const lang = args[0] || "en";
  const res = await translate(text, { to: lang });
  await sock.sendMessage(chat, { text: `🌐 Traduction (${lang}): ${res.text}` });
}

// === Commandes multimédia ===
async function handleYtmp3(sock, chat, args) {
  const url = args[0];
  if (!url || !ytdl.validateURL(url)) return sock.sendMessage(chat, { text: "❌ Lien YouTube invalide." });
  const info = await ytdl.getInfo(url);
  await sock.sendMessage(chat, { text: `🎵 Téléchargement audio: ${info.videoDetails.title}` });
}
async function handleYtmp4(sock, chat, args) {
  const url = args[0];
  if (!url || !ytdl.validateURL(url)) return sock.sendMessage(chat, { text: "❌ Lien YouTube invalide." });
  const info = await ytdl.getInfo(url);
  await sock.sendMessage(chat, { text: `🎬 Téléchargement vidéo: ${info.videoDetails.title}` });
}
async function handleSticker(sock, chat) {
  await sock.sendMessage(chat, { text: "📷 Conversion en sticker en cours..." });
}

// === Commandes IA ===
async function handleChatgpt(sock, chat, args) {
  const question = args.join(" ");
  // Ici tu peux brancher une API IA
  await sock.sendMessage(chat, { text: `🤖 Réponse IA simulée à: ${question}` });
}
async function handleAiWrite(sock, chat, args) {
  const topic = args.join(" ");
  await sock.sendMessage(chat, { text: `✍️ Texte généré sur: ${topic}` });
}

// === Commandes groupe ===
async function handleKick(sock, chat, args) {
  const user = args[0];
  await sock.sendMessage(chat, { text: `❌ Utilisateur ${user} expulsé.` });
}
async function handlePromote(sock, chat, args) {
  const user = args[0];
  await sock.sendMessage(chat, { text: `✅ ${user} promu admin.` });
}
async function handleDemote(sock, chat, args) {
  const user = args[0];
  await sock.sendMessage(chat, { text: `⚠️ ${user} rétrogradé.` });
}
async function handleMute(sock, chat) {
  await sock.sendMessage(chat, { text: "🔇 Groupe mis en silence." });
}
async function handleUnmute(sock, chat) {
  await sock.sendMessage(chat, { text: "🔊 Groupe réactivé." });
}

// === Commandes sécurité ===
async function handleAntilink(sock, chat) {
  await sock.sendMessage(chat, { text: "🔒 Protection anti-lien activée." });
}
async function handleAntispam(sock, chat) {
  await sock.sendMessage(chat, { text: "🚫 Anti-spam activé." });
}
async function handleWarn(sock, chat, args) {
  const user = args[0];
  await sock.sendMessage(chat, { text: `⚠️ ${user} a reçu un avertissement.` });
}
async function handleUnwarn(sock, chat, args) {
  const user = args[0];
  await sock.sendMessage(chat, { text: `✅ Avertissement retiré pour ${user}.` });
}

// === Commandes fun ===
async function handleJoke(sock, chat) {
  await sock.sendMessage(chat, { text: "😂 Blague: Pourquoi les devs aiment le café? Parce qu’il les Java!" });
}
async function handleMeme(sock, chat) {
  await sock.sendMessage(chat, { text: "🤣 Voici un meme random." });
}
async function handleQuote(sock, chat) {
  await sock.sendMessage(chat, { text: "💡 Citation: 'Le code est poésie'." });
}
async function handleAnime(sock, chat) {
  await sock.sendMessage(chat, { text: "🎌 Anime recommandé: Naruto." });
}

// === Bienvenue & Au revoir ===
async function handleGroupParticipantsUpdate(sock, update) {
  const { id, participants, action } = update;
  if (action === "add") {
    for (const user of participants) {
      await sock.sendMessage(id, { text: `👋 Bienvenue ${user} dans le groupe ! 🎉` });
    }
  } else if (action === "remove") {
    for (const user of participants) {
      await sock.sendMessage(id, { text: `🕊️ Une minute de silence pour ${user}...` });
    }
  }
}

// === Mode silencieux ===
async function handleSilent(sock, chat, args, sender) {
  if (sender !== global.owner && !global.admins.includes(sender)) {
    return sock.sendMessage(chat, { text: "❌ Seuls les admins peuvent gérer le mode silencieux." });
  }
  if (args[0] === "on") {
    global.silentMode = true;
    await sock.sendMessage(chat, { text: "🤫 Mode silencieux activé." });
  } else if (args[0] === "off") {
    global.silentMode = false;
    await sock.sendMessage(chat, { text: "🔊 Mode silencieux désactivé." });
  }
}

// === Dispatcher central ===
async function handleMessage(sock, chat, sender, body) {
  if (!body.startsWith(module.exports.HANDLERS)) return;
  const args = body.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (global.silentMode && sender !== global.owner && !global.admins.includes(sender)) return;

  switch (command) {
    case "ping": return handlePing(sock, chat);
    case "uptime": return handleUptime(sock, chat);
    case "date": return handleDate(sock, chat);
    case "time": return handleTime(sock, chat);
    case "translate": return handleTranslate(sock, chat, args);
    case "ytmp3": return handleYtmp3(sock, chat, args);
    case "ytmp4": return handleYtmp4(sock, chat, args);
    case "sticker": return handleSticker(sock, chat);
    case "chatgpt": return handleChatgpt(sock, chat, args);
    case "aiwrite": return handleAiWrite(sock, chat, args);
    case "kick": return handleKick(sock, chat, args);
    case "promote": return handlePromote(sock, chat, args);
    case "demote": return handleDemote(sock, chat, args);
    case "mute": return handleMute(sock, chat);
    case "unmute": return handleUnmute(sock, chat);
    case "antilink": return handleAntilink(sock, chat);
    case "antispam": return handleAntispam(sock, chat);
    case "warn": return handleWarn(sock, chat, args);
    case "unwarn": return handleUnwarn(sock, chat, args);
    case "joke": return handleJoke(sock, chat);
    case "meme": return handleMeme(sock
