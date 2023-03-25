const mongoose = require("mongoose");
const { Schema } = mongoose;


const qrCodeSchema = new mongoose.Schema({
    authId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Auth",
    },
    // connectedDeviceId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "connectedDevices",
    // },
    lastUsedDate: { type: Date, default: null },
    isActive: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  });
  
  module.exports = mongoose.model("qrCode", qrCodeSchema);