import { account, ID } from "../server/Server";

export const signup = async (email , password , name) => {
    try{
        const res = await account.create(ID.unique() , email , password  , name );
        return res;
    }
    catch(e){
        console.log(" Sign Up ERROR " , e );
    }
}

export const signin = async (email , password) => {
    try{
        const res = await account.createEmailPasswordSession(email ,password);
        return res;
    }
    catch(e){
        console.log(" SIGNIN ERROR :: " , e );
    }
}

export const logout =  async () => {
    try{
        const res = await account.deleteSession('current');
        return res;
    }
    catch(e){
      console.log(" LOGOUT ERROR : " , e);
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await account.get();
        return response;
    } catch (error) {
        console.log("GET USER " , error);
    }
};