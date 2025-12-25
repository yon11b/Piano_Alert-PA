const models = require('../../../models');
const { Op } = require('sequelize');

async function getPerforms_pagination(req, res) {
    const pageNum = req.params.page;
    const limit = 10;
    const offset = limit * (parseInt(pageNum) - 1);
    try {
        const totalPerforms = await models.performance.count({
            where: { save: "1" }
        });
        let perform = await models.performance.findAll({
            where:{
                save: "1"
                // [Op.and]: [
                //     {save: "1"},
                //     {state: "공연중"}
                // ]
            },
            order: [
                ['date_finish_unix']            
            ]
        });
        console.log(perform.length);
        perform_pagination = perform.filter((app, idx) => (offset <= idx && idx <= offset + limit - 1));
        res.send({
            Message: "Success", 
            ResultCode: "ERR_OK",
            Size: perform.length,            
            Response: {
                page:{
                    total: parseInt((totalPerforms-1) / 10) + 1,
                    current: parseInt(pageNum)
                },   
                performance_list: perform_pagination
            }
        })
    }
    catch (err) {
        console.log(err);        
        res.status(500).send({            
            Message: "Internal server error", 
            ResultCode: "ERR_INTERNAL_SERVER"
        });
    }
}

module.exports = {
    getPerforms_pagination
};