const Joi = require('joi');
const knl = require('../knl');
const securityConsts = require('../consts/security-consts');
knl.post('requests', async(req, resp) =>{
    const schema =Joi.object({
        fkClients:
        Joi.number().min(1).required(),
        DateEmission: 
        Joi.date().raw().required(), 
        DateDelivery: 
        Joi.date().raw().required(),
        fkAddress:
        Joi.number().min(1).required(),
        total:
        Joi.number().min(1).max(9999999999).required(),
        prodRequests : Joi.array().items(Joi.object({
            fkRequests:Joi.number().min(1).required(),
            fkProducts:Joi.number().min(1).required(),
            amount:Joi.number().min(1).max(999999).required(),
            unitPrice:Joi.number().min(1).max(9999999999).required(),
            discount:Joi.number().min(1).max(9999999999).required(),
            increase:Joi.number().min(1).max(9999999999).required(),
            total:Joi.number().min(1).max(9999999999).required(),
            
        }))
        
    })
    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.Requests.findAll({
        where:{
            fkClients:req.body.fkClients,
            DateEmission: req.body.DateEmission,
            DateDelivery:req.body.DateDelivery,
            total:req.body.total,
            fkAddress:req.body.fkAddress

        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const requests =knl.sequelize().models.Requests.build({
        fkClients:req.body.fkClients,
        DateEmission: req.body.DateEmission,
        DateDelivery:req.body.DateDelivery, 
        total:req.body.total,
        fkAddress:req.body.fkAddress
    });
    await requests.save();

    console.log(requests.id);
    for (const prodRequests of req.body.prodRequests){
        const result2 = knl.sequelize().models.ProdRequests.build({
            fkRequests : prodRequests.fkRequests,
            fkProducts : prodRequests.fkProducts,
            amount : prodRequests.amount,
            unitPrice : prodRequests.unitPrice,
            discount : prodRequests.discount,
            increase: prodRequests.increase,
            total:prodRequests.total
        })

        await result2.save();        
    }

    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);