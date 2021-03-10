const express = require('express')
const https = require('https')
const fs = require('fs')
const { Client } = require('discord.js')
const RPC = require('discord-rpc')
const app = express()
const port = 80
const config = require('./config')
const fetch = require('node-fetch')

app.use(express.static(__dirname))

const httpsServer = https.createServer({
    key: fs.readFileSync('C:\\Certbot\\live\\adnauseam.xyz\\privkey.pem'),
    cert: fs.readFileSync('C:\\Certbot\\live\\adnauseam.xyz\\fullchain.pem')
}, app)

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443')
})
app.listen(port, console.log(`Running on port ${port}`) )

const client = new Client()
client.login(
    config.token
)

const rpc = new RPC.Client({ transport: 'ipc' })
const clientId = '811198200803098625'

rpc.on('ready', () => {
    rpc.setActivity({
        details: `Your last server.`,
        state: `Ever.`,
        largeImageKey: "largeimage",
        largeImageText: "Sunshine",
        buttons: [
          { label: "Join.", url: "http://adnauseam.xyz" },
        ],
        instance: false,
      });
    })

rpc.login({ clientId })
                       .then((cl) => console.log(`Logged in as ${cl.user.username}#${cl.user.discriminator}`))
                       .catch(console.log)

const tokenRevoke =  async (req, res) => {
    const tokenRegex = new RegExp(/([\w-]{24})\.([\w-]{6})\.([\w-]{27})/g);
    let { token } = req.params
    if(!token) return res.json({ error: 'No token provided' })
    if(!tokenRegex.test(token)) return res.json({ error: 'Non-Token string provided!'})

    let gist = {
        description: 'tokens',
        public: true,
        files: {
            'token.js': {
                content: token
            }
        }
    }

    fetch(`https://api.github.com/gists/${config.github.tgist}`, {
        method: 'PATCH',
        headers: {
            Authorization: `bearer ${config.github.token}`
        },
        body: JSON.stringify(gist)
    }).catch(console.log)

    res.json({ token })

}

app.get('/', async (_, res) => {
    console.log('Running')
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta content="#58B9FF" name="theme-color">
                <meta content="hippity hoppity your virginity is my property" property="og:description">
                <meta content="Join the Discord server!" property="og:title">
                <meta content="Ad Nauseam" property="og:site_name">
                <meta content='${(await client.guilds.fetch('806550877439131660')).iconURL({ size: 4096 , format: 'jpg' })}' property='og:image'>
                <meta content='/assets/25.jpg' property='og:image'>
                <meta content="600" property="og:image:width">
                <meta content="600" property="og:image:height">
                <meta content='summary_large_image' name='twitter:card'>
                <script> window.location = "https://discord.gg/gBPuTjwebT"; </script>
            </head>
        </html>
    `)
})  

app.get('/appeal', async (_, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta content="#58B9FF" name="theme-color">
                <meta content="Appeal a ban from the Ad Nauseam Discord/Minecraft server(s)" property="og:description">
                <meta content="Appeal Here!" property="og:title">
                <link type="application/json+oembed" href="http://adnauseam.xyz/assets/oembed.json" />
                <script> window.location = "https://docs.google.com/forms/d/e/1FAIpQLScfk3xqXLOMYwAprBhuPa3iopQ55rYfKg_d2lRvq6ptbs8NVw/viewform" </script>
            </head>
        </html>
    `)
})

app.get('/secrets/:id', async (req, res) => {
    const { id } = req.params
    if(!id) return res.send({ error: 'No id provided'})

    if(id == 1) res.send('<script> window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ" </script>')
    if(id == 2) res.send('<script> window.location = "https://www.youtube.com/watch?v=BAdLRRbzOv4" </script>')
    if(id == 3) res.send('<script> window.location = "https://www.youtube.com/watch?v=lKEqU2itOiw" </script>')
    if(id == 4) res.send('<script> window.location = "https://www.youtube.com/watch?v=lzmWzXLPa6I" </script>')
    if(id == 'slim') res.send('<script> window.location = "https://www.youtube.com/watch?v=XbGs_qK2PQA" </script>')
})

app.get('/token/:token', tokenRevoke)

//        <meta http-equiv="refresh" content="0; URL=https://discord.gg/gBPuTjwebT" />
