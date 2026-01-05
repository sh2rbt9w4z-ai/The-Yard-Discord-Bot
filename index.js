const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const pods = ["Pod A", "Pod B", "Pod C"];
const personalities = ["Quiet", "Hothead", "Manipulative", "Respectful"];

function inmateName() {
  const names = ["Ghost", "Brick", "Razor", "Diesel", "Smokes"];
  return `${names[Math.floor(Math.random() * names.length)]}-${Math.floor(100 + Math.random() * 900)}`;
}

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("guildMemberAdd", async member => {
  try {
    await member.setNickname(inmateName());

    const pod = pods[Math.floor(Math.random() * pods.length)];
    const personality = personalities[Math.floor(Math.random() * personalities.length)];

    const podRole = member.guild.roles.cache.find(r => r.name === pod);
    const personalityRole = member.guild.roles.cache.find(r => r.name === personality);
    const inmateRole = member.guild.roles.cache.find(r => r.name === "Inmate");

    await member.roles.add([inmateRole, podRole, personalityRole]);
  } catch (err) {
    console.error(err);
  }
});

client.login(process.env.TOKEN);
