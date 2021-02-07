const mongoose = require('mongoose')

const Data = new mongoose.Schema(
	{
		topic: { type: String, require: true },
        payload: { type: String, require: true },
        username: { type: String, require: true },
        client_id: { type: String, require: true },
        created_at: { type: Date, default: Date.now }
	},
	{ collection: 'data' }
)

Data.index({ topic: 1 });

const DataModel = mongoose.model('Data', Data);
module.exports = DataModel