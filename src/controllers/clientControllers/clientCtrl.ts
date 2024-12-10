export const clientController = () => {
    return {

        clientSignup: async (req: any, res: any , next: any) => {
            try {

                const { username , password, mobile, email } = req.body;
                


            } catch(err: any) {
                console.error('ERROR: ',err.message);
            }
        },


    }
}