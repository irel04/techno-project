import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { MdInfoOutline, MdAdd, MdRemove } from "react-icons/md";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SpanError from "../components/SpanError";

import { supabase } from "../utils/supabase";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { spStorageKey } from "../utils/constant";
import { toast } from "react-toastify";
import { createPriceRange, customToastParameter } from "../utils/helper";
import { useNavigate } from "react-router-dom";

export const message = {
  required: "this field is required",
  isNumber: "this field should be number",
  isString: "this field should be string only"
}


const schema = yup.object({
  dorm_name: yup.string().typeError(message.isString).required(message.required),
  price: yup.number().typeError(message.isNumber).required(message.required),
  description: yup.string().typeError(message.isString).required(message.required),
  payment_terms: yup.string().typeError(message.isNumber).required(message.required),
  advance_payment: yup.string().typeError(message.isNumber).required(message.required),
  security_deposit: yup.number().typeError(message.isNumber).required(message.required),
  minimum_stay: yup.number().typeError(message.isNumber).required(message.required),
  electricity_bills: yup.string().typeError(message.isNumber).required(message.required),
  water_bills: yup.string().typeError(message.isNumber).required(message.required),
  association_dues: yup.string().typeError(message.isNumber).required(message.required),
  link: yup.string().typeError(message.isString),
  landmark: yup.string().typeError(message.isString).required(message.required),
  province: yup.string().typeError(message.isString).required(message.required),
  city: yup.string().typeError(message.isString).required(message.required),
  barangay: yup.string().typeError(message.isString).required(message.required),
  street: yup.string().typeError(message.isString),

})


const PostaRental = () => {

  const [formData, setFormData] = useState({
    pictures: [],
    price: "",
    description: "",
    features: [""],
    amenities: [""],
    paymentTerms: "",
    advancePayments: "",
    securityDeposit: "",
    minimumStay: "",
    electricityBills: "",
    waterBills: "",
    associationDues: "",
    nearLandmarks: [""],
    gmapsLink: "",
    cover: []
  });

  const { register, formState: { errors }, reset, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  })

  //navigate 

  const navigate = useNavigate()


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDynamicInputChange = (index, e, field) => {
    const { value } = e.target;
    const updatedField = formData[field].slice();
    updatedField[index] = value;
    setFormData({ ...formData, [field]: updatedField });
  };

  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeField = (index, field) => {
    const updatedField = formData[field].slice();
    updatedField.splice(index, 1);
    setFormData({ ...formData, [field]: updatedField });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, pictures: e.target.files });
  };

  const handleCoverPhotoChange = (e) => {
    setFormData({...formData, cover: e.target.files})
  }

  

  // Get the owner id via user_id
  const [user] = useLocalStorage(spStorageKey, null)
  const [ownerId, setOwnerId] = useState("")

  useEffect(() => {
    const fetchOwner = async () => {
      const { data: owner, error: ownerError } = await supabase.from("lease_providers").select("id").eq("user_id", user.user.id)

      if(ownerError){
        throw ownerError
      }

      setOwnerId(owner[0].id)

    }

    fetchOwner()
  }, [])

  const handleCallPostApi = async (data) => {
    console.log(data)
    console.log(formData.features)
    console.log(formData.amenities)
    console.log(formData.pictures)
    console.log(formData.nearLandmarks)

    const loading = toast.loading("Uploading new dorm...")

    try {

      const propertyAttr = {
        provider_id: ownerId,
        dorm_name: data.dorm_name,
        description: data.description,
        ratings: 0,
        cover_photo: formData.cover.length ? formData.cover[0].name : null 
      }


      const { error: postingError, data: properties } = await supabase.from("properties").upsert(propertyAttr).select("id")

      if(postingError){
        throw postingError.message
      }

      const propertyId = properties[0].id

      const features = formData.features.map(item => {
        return {
          property_id: propertyId,
          feature: item
        }
      })

      const amenities = formData.amenities.map(item => {
        return {
          property_id: propertyId,
          amenity: item
        }
      })

      const { error: errorFeatures } = await supabase.from("features").upsert(features)

      if(errorFeatures){
        throw errorFeatures.message
      }

      const { error: errorAmenity } = await supabase.from("amenities").upsert(amenities)

      if(errorAmenity){
        throw errorAmenity.message
      }

      // for creating price range 
      const priceRange = createPriceRange(data.price)

      const { error: rentRatesError } = await supabase.from("rent_rates").update({
        ...priceRange,
        actual_rate: data.price,
        property_id: propertyId
      }).eq("property_id", propertyId)

      if(rentRatesError){
        throw rentRatesError.message
      }


      // for adding address 
      const address = {
        province: data.province,
        city: data.city,
        barangay: data.barangay,
        street: data.street,
        landmark: data.landmark,
        link: data.link,
        property_id: propertyId
      }

      const { error: addressError } = await supabase.from("addresses_property").update(address).eq("property_id", propertyId)

      if(addressError){
        throw addressError.message
      }

      if (formData.cover.length) {
        // for uploading cover photo
        const { error: coverPhotoError } = await supabase.storage.from("assets").upload(`dorms/covers/${formData.cover[0].name}`, formData.cover[0], {
          upsert: true
        })

        if (coverPhotoError) {
          throw coverPhotoError.message
        }

      }

      if (formData.pictures.length) {

        // this if for uploading pictures 
        // iterate to array of photos
        Array.from(formData.pictures).forEach((file, index) => {
          uploadPhoto(file, propertyId)
        })
      }
      

      toast.update(loading, customToastParameter("Added successfully", "success"))
      navigate("/business-side")
    } catch (error) {
      console.error(error);
      toast.update(loading, customToastParameter(error, "error"))
    }


  };


  // function for uploading photo
  const uploadPhoto = async (file, propertyId) => {

    const { error: uploadingError } = await supabase.storage.from("assets").upload(`dorms/${propertyId}/${file.name}`, file, {
      upsert: true
    })
      
    if(uploadingError){
      throw uploadingError.message
    }

    const { error: propertyImageError } = await supabase.from("properties_images").insert({
      property_id: propertyId,
      image_name: file.name
    })

    if(propertyImageError){
      throw propertyImageError.message
    }


    
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Post a Dormitory
      </h2>
      <form onSubmit={handleSubmit(handleCallPostApi)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Choose a cover photo
              <MdInfoOutline
                data-tip="Upload a cover photo"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="file"
              name="pictures"
              accept="image/*"
              onChange={handleCoverPhotoChange}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
            <div className="flex mt-4 gap-4">
              {Array.from(formData.cover).map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Pictures (minimum of 3)
              <MdInfoOutline
                data-tip="Upload at least 3 pictures of the rental"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="file"
              name="pictures"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
            <div className="flex mt-4 gap-4">
              {Array.from(formData.pictures).map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Dorm Name
              <MdInfoOutline
                data-tip="Enter the price of the rental"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="text"
              name="dorm_name"
              {...register("dorm_name")}
              // required
              placeholder="Specify name of dorm"
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
            <SpanError errors={errors.dorm_name} />
          </div>
          
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Price
              <MdInfoOutline
                data-tip="Enter the price of the rental"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="text"
              name="price"
              {...register("price")}
              // required
              placeholder="e.g., 10000 PHP"
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
            <SpanError errors={errors.price}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Description
              <MdInfoOutline
                data-tip="Provide a detailed description of the rental"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <textarea
              name="description"
              // required
              {...register("description")}
              placeholder="e.g., Spacious dorm with air conditioning..."
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
            <SpanError errors={errors.description}/>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Features
              <MdInfoOutline
                data-tip="List the features of the rental"
                className="inline ml-2 text-gray-400"
              />
            </label>
            {formData.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center mb-2"
              >
                <input
                  type="text"
                  value={feature}
                  onChange={(e) =>
                    handleDynamicInputChange(index, e, "features")
                  }
                  placeholder="e.g., Wi-Fi, Air Conditioning..."
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeField(index, "features")}
                  className="ml-2 text-red-500"
                >
                  <MdRemove />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("features")}
              className="mt-2 text-blue-500"
            >
              <MdAdd /> Add Feature
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Amenities
              <MdInfoOutline
                data-tip="List the amenities available"
                className="inline ml-2 text-gray-400"
              />
            </label>
            {formData.amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center mb-2"
              >
                <input
                  type="text"
                  value={amenity}
                  onChange={(e) =>
                    handleDynamicInputChange(index, e, "amenities")
                  }
                  placeholder="e.g., Gym, Pool..."
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeField(index, "amenities")}
                  className="ml-2 text-red-500"
                >
                  <MdRemove />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("amenities")}
              className="mt-2 text-blue-500"
            >
              <MdAdd /> Add Amenity
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Payment Terms
              <MdInfoOutline
                data-tip="Specify the payment terms"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="text"
              name="payment_terms"
              {...register("payment_terms")}
              // required
              placeholder="e.g., Monthly, Quarterly..."
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
            <SpanError errors={errors.payment_terms}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Advance Payments
              <MdInfoOutline
                data-tip="Specify the advance payment terms"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="text"
              name="advance_payment"
              {...register("advance_payment")}
              placeholder="e.g., 2 months advance..."
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
            <SpanError errors={errors.advance_payment}/>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Security Deposit
              <MdInfoOutline
                data-tip="Specify the security deposit amount"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="text"
              name="security_deposit"
              {...register("security_deposit")}
              placeholder="e.g., 1 month rent..."
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
            <SpanError errors={errors.security_deposit}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Minimum Stay
              <MdInfoOutline
                data-tip="Specify the minimum stay duration"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="text"
              name="minimum_stay"
              {...register("minimum_stay")}
              placeholder="e.g., 6 months..."
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
            <SpanError errors={errors.minimum_stay}/>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Electricity Bills
              <MdInfoOutline
                data-tip="Provide information about electricity bills"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="text"
              name="electricity_bills"
              {...register("electricity_bills")}
              placeholder="e.g., Included/Separate..."
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
            <SpanError errors={errors.electricity_bills}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Water Bills
              <MdInfoOutline
                data-tip="Provide information about water bills"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="text"
              name="water_bills"
              {...register("water_bills")}
              placeholder="e.g., Included/Separate..."
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
            <SpanError errors={errors.water_bills}/>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Association Dues
              <MdInfoOutline
                data-tip="Specify if association dues are applicable"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="text"
              name="association_dues"
              {...register("association_dues")}
              placeholder="e.g., Included/Excluded..."
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
            <SpanError errors={errors.association_dues}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Near Landmark
              <MdInfoOutline
                data-tip="List any nearby landmarks"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
                  type="text"
                  name="landmark"
                  {...register("landmark")}
                  placeholder="e.g., Schools, Malls..."
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg"
                />
          <SpanError errors={errors.landmark} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Province
              <MdInfoOutline
                data-tip="Specify your province"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="text"
              name="province"
              {...register("province")}
              // required
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
            <SpanError errors={errors.province}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              City
              <MdInfoOutline
                data-tip="Specify your city"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="text"
              name="city"
              {...register("city")}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
            <SpanError errors={errors.city}/>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Barangay
              <MdInfoOutline
                data-tip="Specify your province"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="text"
              name="barangay"
              {...register("barangay")}
              // required
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
            <SpanError errors={errors.barangay}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Street
              <MdInfoOutline
                data-tip="Specify your city"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="text"
              name="street"
              {...register("street")}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
            <SpanError errors={errors.street}/>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Google Maps Embed Link
            <MdInfoOutline
              data-tip="Provide a link to the Google Maps embed"
              className="inline ml-2 text-gray-400"
            />
          </label>
          <input
            type="text"
            name="link"
            {...register("link")}
            placeholder="e.g., https://www.google.com/maps/embed?pb=..."
            className="w-full py-2 px-3 border border-gray-300 rounded-lg"
          />
          <SpanError errors={errors.link} />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium"
        >
          Submit Rental
        </button>
      </form>
      <Tooltip />
    </div>
  );
};

export default PostaRental;
