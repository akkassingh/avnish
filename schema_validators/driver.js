const AddDriverSchema ={
    type: 'object',
    required: ['name'],
    properties:{
        name:{
            type:'string'
        }
    }
}
const UpdateDriverSchema ={
    type: 'object',
    required: ['id'],
    properties:{
        
        id:{
            type:'number'
        }
    }
}


module.exports = {
    AddDriverSchema:AddDriverSchema,
    UpdateDriverSchema:UpdateDriverSchema
}