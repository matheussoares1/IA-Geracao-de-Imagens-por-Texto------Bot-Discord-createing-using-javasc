const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');

// Configurações do bot
const botToken = 'seu_token_do_discord_aqui';
const apiEndpoint = 'https://api.openai.com/v1/images/generations';
const openaiToken = 'seu_token_do_openai_aqui';
const model = 'ffhq'; // Nome do modelo StyleGAN2
const truncation = 0.7; // Valor de truncamento para controlar a variabilidade das imagens

// Função para processar mensagens recebidas
async function processMessage(message) {
  // Chama a API da OpenAI para gerar a imagem
  const response = await axios.post(apiEndpoint, {
    model: 'image-alpha-001',
    prompt: `gerar imagem de um ${message.content}`,
    api_key: openaiToken,
    model_config: {
      model: model,
      truncation: truncation,
    },
  });

  // Obtém a URL da imagem gerada
  const image = response.data.data[0].url;

  // Envia a imagem para o canal do Discord
  const channel = message.channel;
  const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`Imagem gerada a partir de "${message.content}"`)
    .setImage(image);
  channel.send(embed);
}

// Evento disparado quando o bot estiver pronto para ser utilizado
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Evento disparado quando uma mensagem for recebida
client.on('message', processMessage);

// Inicia a conexão com o Discord
client.login(botToken);
