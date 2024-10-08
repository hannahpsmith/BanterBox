const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');


const reactionSchema = new Schema(
    {
      //unnecessary reactionId, "_id" already generated
        // reactionId: {
        //   type: Schema.Types.ObjectId,
        //   default: () => new mongoose.Types.ObjectId()
        // },

        reactionBody: {
          type: String,
          required: true,
          maxlength: 280
        },

        username: { 
          type: String,
          required: true,
        },

        createdAt: {
          type: Date,
          default: Date.now,
          get: (date) => moment(date).format('MM/DD/YYYY') 
        },
    },
    {
        toJSON: { 
          getters: true
        }, 

        id: false
      }
);

module.exports = reactionSchema;