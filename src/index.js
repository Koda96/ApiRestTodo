import '@babel/polyfill'; //El codigo va a poder ser ejecutado en distintos entornos

import app from './server'
import swaggerUi from 'swagger-ui-express'

async function main() {
    await app.listen(app.get('port'));
    console.log('Server on port ', app.get('port'));
}

main();