require("dotenv").config();

const express = require("express");
const { Telegraf, Markup } = require("telegraf");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const APP_URL = process.env.APP_URL;
const PORT = process.env.PORT || 3000;

// Render gives your service this URL
const RENDER_URL = process.env.RENDER_EXTERNAL_URL;

// ==========================================
// VALIDATE ENVIRONMENT VARIABLES
// ==========================================

if (!process.env.TELEGRAM_BOT_TOKEN) {
  console.error("❌ TELEGRAM_BOT_TOKEN is missing from environment variables");
  process.exit(1);
}

if (!APP_URL) {
  console.error("❌ APP_URL is missing from environment variables");
  process.exit(1);
}

if (!RENDER_URL) {
  console.error("❌ RENDER_EXTERNAL_URL is missing from environment variables");
  process.exit(1);
}

// ==========================================
// MAIN START MENU
// ==========================================

async function sendStartMenu(ctx) {
  await ctx.reply(
    `👀 *WAIT… WHO'S NEXT?*\n\n` +
      `Heyyy! 👋😄\n\n` +
      `Ever wondered who else is out there right now… just as bored as you? 😂\n\n` +
      `So we built something 👀👇\n\n` +
      `🎲 Randomly meet new people\n` +
      `💬 Have completely random conversations\n` +
      `😂 Share some laughs\n` +
      `🤝 Make unexpected connections\n\n` +
      `No bios.\n` +
      `No swiping.\n` +
      `No awkward introductions. 😭\n\n` +
      `Just hit a button and let fate do the rest. 🎲\n\n` +
      `*So… WHO'S NEXT? 👀🔥*`,
    {
      parse_mode: "Markdown",
      ...Markup.inlineKeyboard([
        [
          Markup.button.url(
            "🎲 FIND SOMEONE",
            `${APP_URL}/chat`
          ),
        ],
        [
          Markup.button.callback(
            "👀 How it works",
            "how"
          ),
          Markup.button.callback(
            "🚀 About",
            "about"
          ),
        ],
      ]),
    }
  );
}

// ==========================================
// /START
// ==========================================

bot.start(async (ctx) => {
  await sendStartMenu(ctx);
});

// ==========================================
// /FIND
// ==========================================

bot.command("find", async (ctx) => {
  await ctx.reply(
    `🎲 *ALRIGHT, LET'S DO THIS.*\n\n` +
      `Somewhere out there, there's a random person waiting to be matched with you… 👀\n\n` +
      `Could be someone you've seen before but never talked to. 😂\n\n` +
      `Could be someone completely new.\n\n` +
      `Could be your new best friend. 🤝\n\n` +
      `Could be absolutely nobody you expected. 💀\n\n` +
      `Ready?\n\n` +
      `👇 Tap below and let's see...\n\n` +
      `*WHO'S NEXT? 👀🔥*`,
    {
      parse_mode: "Markdown",
      ...Markup.inlineKeyboard([
        [
          Markup.button.url(
            "🔥 I'M READY",
            `${APP_URL}/chat`
          ),
        ],
      ]),
    }
  );
});

// ==========================================
// HOW IT WORKS
// ==========================================

async function sendHowItWorks(ctx) {
  await ctx.reply(
    `👀 *HOW DOES THIS WORK?*\n\n` +
      `It's ridiculously simple:\n\n` +
      `1️⃣ Tap *Start Chatting!*\n` +
      `2️⃣ We find you a random person\n` +
      `3️⃣ Start talking 💬\n` +
      `4️⃣ Not your vibe? 😭\n` +
      `5️⃣ Hit *Who's Next?* and meet someone else 🎲\n\n` +
      `That's it.\n\n` +
      `No swiping.\n` +
      `No judging profiles.\n` +
      `No endless scrolling.\n\n` +
      `Just people + randomness. 😂🔥\n\n` +
      `The fun part?\n\n` +
      `*You never know WHO'S NEXT. 👀*`,
    {
      parse_mode: "Markdown",
      ...Markup.inlineKeyboard([
        [
          Markup.button.url(
            "🎲 LET'S TRY",
            `${APP_URL}/chat`
          ),
        ],
        [
          Markup.button.callback(
            "🔙 Back",
            "back"
          ),
        ],
      ]),
    }
  );
}

bot.command("how", async (ctx) => {
  await sendHowItWorks(ctx);
});

bot.action("how", async (ctx) => {
  await ctx.answerCbQuery();
  await sendHowItWorks(ctx);
});

// ==========================================
// ABOUT
// ==========================================

async function sendAbout(ctx) {
  await ctx.reply(
    `🚀 *WHAT IS WHO'S NEXT?*\n\n` +
      `Think of it as a random conversation with someone you would've probably never met. 👀\n\n` +
      `No awkwardly walking up to strangers.\n` +
      `No figuring out what to say first. 😂\n\n` +
      `Who's Next lets you randomly meet people and:\n\n` +
      `💬 Have random conversations\n` +
      `😂 Kill some time\n` +
      `🤝 Make new connections\n` +
      `👀 Meet someone completely unexpected\n` +
      `🔥 Maybe make a new friend\n\n` +
      `And if the conversation is dead...\n\n` +
      `There's always:\n\n` +
      `👉 *WHO'S NEXT? 🎲*\n\n` +
      `No pressure.\n` +
      `No expectations.\n` +
      `No endless swiping.\n\n` +
      `*Just see who you meet. 😎*`,
    {
      parse_mode: "Markdown",
      ...Markup.inlineKeyboard([
        [
          Markup.button.url(
            "🔥 I'M IN",
            `${APP_URL}/chat`
          ),
        ],
        [
          Markup.button.callback(
            "🔙 Back",
            "back"
          ),
        ],
      ]),
    }
  );
}

bot.command("about", async (ctx) => {
  await sendAbout(ctx);
});

bot.action("about", async (ctx) => {
  await ctx.answerCbQuery();
  await sendAbout(ctx);
});

// ==========================================
// HELP
// ==========================================

bot.command("help", async (ctx) => {
  await ctx.reply(
    `❓ *NEED HELP?*\n\n` +
      `It's pretty simple 😎\n\n` +
      `🎲 /find — Find someone random\n` +
      `👀 /how — See how it works\n` +
      `🚀 /about — Learn about Who's Next\n` +
      `🏠 /start — Open the main menu\n\n` +
      `Or just use the buttons. 👇`,
    {
      parse_mode: "Markdown",
      ...Markup.inlineKeyboard([
        [
          Markup.button.url(
            "🎲 FIND SOMEONE",
            `${APP_URL}/chat`
          ),
        ],
      ]),
    }
  );
});

// ==========================================
// BACK BUTTON
// ==========================================

bot.action("back", async (ctx) => {
  await ctx.answerCbQuery();
  await sendStartMenu(ctx);
});

// ==========================================
// UNKNOWN TEXT
// ==========================================

bot.on("text", async (ctx) => {
  await ctx.reply(
    `😂 I'm not sure what you mean.\n\n` +
      `Use /start to open the menu or simply hit the button below.`,
    {
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "👀 WHO'S NEXT?",
            "back"
          ),
        ],
      ]),
    }
  );
});

// ==========================================
// ERROR HANDLING
// ==========================================

bot.catch((err, ctx) => {
  console.error(
    `❌ Error while handling update ${ctx.update.update_id}:`,
    err
  );
});

// ==========================================
// TELEGRAM COMMAND MENU
// ==========================================

async function setupCommands() {
  await bot.telegram.setMyCommands([
    {
      command: "start",
      description: "🚀 Start Who's Next",
    },
    {
      command: "find",
      description: "🎲 Find someone random",
    },
    {
      command: "how",
      description: "👀 How does it work?",
    },
    {
      command: "about",
      description: "🚀 What is Who's Next?",
    },
    {
      command: "help",
      description: "❓ Get help",
    },
  ]);

  console.log("✅ Telegram commands configured");
}

// ==========================================
// EXPRESS SERVER
// ==========================================

const app = express();

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.status(200).send("🤖 Who's Next Telegram Bot is alive!");
});

// Telegram webhook endpoint
app.post("/telegram-webhook", async (req, res) => {
  try {
    await bot.handleUpdate(req.body);

    res.sendStatus(200);
  } catch (error) {
    console.error("❌ Webhook error:", error);

    res.sendStatus(500);
  }
});

// ==========================================
// START SERVER + WEBHOOK
// ==========================================

async function startBot() {
  try {
    // Start Express
    app.listen(PORT, "0.0.0.0", async () => {
      console.log("=================================");
      console.log("🤖 Who's Next Telegram Bot");
      console.log(`🌐 Server running on port ${PORT}`);
      console.log("=================================");
    });

    // Setup Telegram commands
    await setupCommands();

    // Webhook URL
    const webhookURL = `${RENDER_URL}/telegram-webhook`;

    // Remove any previous webhook
    await bot.telegram.deleteWebhook();

    // Register new webhook
    await bot.telegram.setWebhook(webhookURL);

    console.log("=================================");
    console.log("✅ Telegram webhook configured");
    console.log(`🔗 ${webhookURL}`);
    console.log("🚀 Bot is ready!");
    console.log("=================================");

  } catch (error) {
    console.error(
      "❌ Failed to start bot:",
      error
    );

    process.exit(1);
  }
}

startBot();

// ==========================================
// GRACEFUL SHUTDOWN
// ==========================================

process.once("SIGINT", () => {
  console.log("🛑 Stopping bot...");
  bot.stop("SIGINT");
});

process.once("SIGTERM", () => {
  console.log("🛑 Stopping bot...");
  bot.stop("SIGTERM");
});