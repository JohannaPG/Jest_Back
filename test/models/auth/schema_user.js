export const UserCustomAuthSchema = () => {
    
     const schema = {


          type: 'object',
          properties: {
            sucess: { "type": "boolean" },
            codes: { type: 'integer' },
            message: { type: 'string' },
            data: {type: 'object',
            properties: {
            
                    userId: {
                      type: "string"
                    },
                    emails: {
                      type: "string"
                    },
                    codes: {
                      type: "string"
                    },
                    documentTypes: {
                      type: "string"
                    },
                    documentNumber: {
                      type: "string"
                    },
                    firstName: {
                      type: "string"
                    },
                    lastName: {
                      type: "string"
                    }
                },

            required: ['userId','email','code','documentType','documentNumber','firstName','lastName','properties' ]
                
            },
         },
        required: ['success','code','message','data'],
        
    };


   return schema
    
  }



  