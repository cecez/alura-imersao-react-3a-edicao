import { SiteClient } from 'datocms-client'

export default async function recebedorDeRequisicao(requisicao, resposta) {

    if (requisicao.method !== 'POST') {
        resposta.status(404).json({
            mensagem: 'Somente requisições aceitas por POST.'
        })

        return;
    }

    const TOKEN = '0f8508ffd7d20c7e23b53e2273fb96'
    const MODEL_ID = '968765'

    const client = new SiteClient(TOKEN)

    const registroCriado = await client.items.create({
        itemType: MODEL_ID,
        ...requisicao.body
    })
    
    
    resposta.json({
        registroCriado: registroCriado
    })
}