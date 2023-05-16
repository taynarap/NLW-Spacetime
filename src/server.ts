import fastity from 'fastify'
//CRIAR APP COM FRAMEWORK FASTITY
const app = fastity()

//CRIAR API - PARA CRIAR UMA API PRECISA DE TER UM SERVIDOR HTTP

//METODO LISTEN RECEBE UM OBJETO DE CONFIGURACOES E A CONFIGURACAO MAIS IMPORTANTE E OBRIGATORIA EH A PORTA QUE QUERO EXECUTAR ESSE SERVIDOR. 
app.listen({
    port: 3333,
}).then(() => {
    console.log('🚀 HTTP server running on http://localhost:3333')
})

