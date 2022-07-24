import nc from 'next-connect'
import { webhookCheckout } from '../../controllers/payment'



const handler = nc();



export const config = {
    api: {
        bodyParser: false,
    }
}

handler.post(webhookCheckout)

export default handler;