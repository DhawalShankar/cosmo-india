import connectDB from '../lib/mongodb.js';
import { setCORSHeaders, handleOptions, requireAuth } from '../lib/middleware.js';
import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  addresses: [{
    label: String,
    name: String,
    phone: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    pincode: String,
    isDefault: { type: Boolean, default: false }
  }]
});

const Address = mongoose.models.Address || mongoose.model('Address', AddressSchema);

export default async function handler(req, res) {
  setCORSHeaders(req, res);
  if (handleOptions(req, res)) return;

  try {
    const user = await requireAuth(req, res);
    if (!user) return;

    await connectDB();

    if (req.method === 'GET') {
      let addressDoc = await Address.findOne({ userId: user._id });
      
      if (!addressDoc) {
        addressDoc = await Address.create({ userId: user._id, addresses: [] });
      }

      return res.status(200).json({
        success: true,
        addresses: addressDoc.addresses
      });
    }

    if (req.method === 'POST') {
      const newAddress = req.body;

      let addressDoc = await Address.findOne({ userId: user._id });
      
      if (!addressDoc) {
        addressDoc = await Address.create({ userId: user._id, addresses: [] });
      }

      // If this is set as default, unset others
      if (newAddress.isDefault) {
        addressDoc.addresses.forEach(addr => addr.isDefault = false);
      }

      addressDoc.addresses.push(newAddress);
      await addressDoc.save();

      return res.status(201).json({
        success: true,
        addresses: addressDoc.addresses
      });
    }

    if (req.method === 'DELETE') {
      const { addressId } = req.body;

      const addressDoc = await Address.findOne({ userId: user._id });
      
      if (!addressDoc) {
        return res.status(404).json({ error: 'No addresses found' });
      }

      addressDoc.addresses = addressDoc.addresses.filter(
        addr => addr._id.toString() !== addressId
      );
      
      await addressDoc.save();

      return res.status(200).json({
        success: true,
        addresses: addressDoc.addresses
      });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Addresses error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}