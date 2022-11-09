const Joi = require('joi');
const knl = require('../knl');
const securityConsts = require('../consts/security-consts');
knl.post('client', async(req, resp) =>{
    const schema =Joi.object({
        name:
        Joi.string().min(1).max(100).required(),
        cnpj: 
        Joi.string().min(14).max(14).required(),
        razaoSocial: 
        Joi.string().min(1).max(100).required(),
        dateClient:
        Joi.date().raw().required(), 
        adddress : Joi.array().items(Joi.object({
            rua : Joi.string().min(3).max(100).required(),
            bairro : Joi.string().min(2).max(30).required(),
            cidade : Joi.string().min(3).max(60).required(),
            estado : Joi.string().min(3).max(20).required(),
            cep : Joi.string().min(14).max(14).required(),
            numero: Joi.number().min(1).required(),
            complemento: Joi.string().min(3).max(100),
            pontoDeReferencia: Joi.string().min(3).max(100),

        }))
        
    })
    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.Clients.findAll({
        where:{
            name: req.body.name,
            cnpj: req.body.cnpj,
            razaoSocial: req.body.razaoSocial,
            dateClient: req.body.dateClient,

        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const customer =knl.sequelize().models.Clients.build({
        name: req.body.name,
        cnpj: req.body.cnpj,
        razaoSocial: req.body.razaoSocial,
        dateClient: req.body.dateClient,
        status:1
    });
    await customer.save();

    console.log(customer.id);
    for (const address of req.body.adddress){
        const result2 = knl.sequelize().models.Endereco.build({
            rua : address.rua,
            bairro : address.bairro,
            cidade : address.cidade,
            estado : address.estado,
            cep : address.cep,
            numero: address.numero,
            complemento:address.complemento,
            pontoDeReferencia: address.pontoDeReferencia,
            fkClients : customer.id,
            status:0
        })

        await result2.save();        
    }

    resp.end();
});
knl.get('client', async (req, resp)=>{
    const result =await knl.sequelize().models.Clients.findAll({
        where: {
            status:1
        }
    });
    resp.json(result);
    resp.end();
})

knl.get('client/:id', async (req, resp)=>{
    const result =await knl.sequelize().models.Clients.findAll({
        where: {
            id:req.params.id,
            status:1
        }
    });
    resp.json(result);
    resp.end();
})
knl.put('client', async(req, resp) => {
    const result = await knl.sequelize().models.Clients.update({
        name: req.body.name,
        cnpj: req.body.cnpj,
        razaoSocial: req.body.razaoSocial,
        dateClient: req.body.dateClient,
    }, {
        where : {
        id : req.body.id
    }});
    
    resp.send(result);
});
knl.patch('client/:id', async(req,resp)=>{
    const result = await knl.sequelize().models.Clients.update({
        status:0
    },
    {
    where:{
        id:req.params.id
        }
    });
    resp.json(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC)
knl.delete('client/:id', async(req,resp)=>{
    const result = await knl.sequelize().models.Clients.destroy({
        where:{
            id: req.params.id
        }
    });
    resp.json(result);
    resp.end();
})