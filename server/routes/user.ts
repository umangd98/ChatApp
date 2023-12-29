import { config } from "dotenv";
import { FastifyInstance } from "fastify";
import { StreamChat } from 'stream-chat';

config()
// console.log(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET);
const streamChat = StreamChat.getInstance(process.env.STREAM_API_KEY!, process.env.STREAM_API_SECRET!);

const TOKEN_USER_ID_MAP = new Map<string, string>();

export async function userRoutes(app: FastifyInstance){
    app.post<{Body: {id: string, name: string, image?: string}}>('/signup',async (req, res) => {
        const {id, name, image} = req.body;
        if(id === null || id === '' || name === null || name === ''){
           return res.code(400).send({message: 'id and name are required'});
          
        }
        //TODO: check if user already exists
        const existingUser = await streamChat.queryUsers({id});
        if(existingUser.users.length > 0){
            return res.code(400).send({message: 'user already exists'});
        }
        await streamChat.upsertUser({id, name, image})
    } 
    ), 

    app.post<{Body: {id: string}}>('/login',async (req, res) => {
        const {id} = req.body;
        if(id === null || id === ''){
           return res.code(400).send({message: 'id is required'});
          
        }
        const {users: [user]} = await streamChat.queryUsers({id})
        if(!user) return res.status(401).send({message: 'user not found'})

        const token = streamChat.createToken(id)
        TOKEN_USER_ID_MAP.set(token, user.id)
        return {
            token, 
            user: {name: user.name, id: user.id, image: user.image}
        }
    } 
    )


    app.post<{Body: {token: string}}>('/logout',async (req, res) => {
        const {token} = req.body;
        if(token === null || token === ''){
           return res.code(400).send({message: 'token is required'});
          
        }
        const id = TOKEN_USER_ID_MAP.get(token)
        if(!id) return res.status(401).send({message: 'user not found'})
        await streamChat.revokeUserToken(id, new Date())
        TOKEN_USER_ID_MAP.delete(token)
    }
    )

}