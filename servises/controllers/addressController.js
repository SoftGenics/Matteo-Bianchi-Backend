const registration = require('../models/registration')
const addressUser = require('../models/address')

// const createAddress = async (req, res) => {
//     const mobileNo = req.user.mobile_num
//     const addressinfo = await registration.findOne({
//         where: {
//             mobile_num: mobileNo
//         }
//     });
//     console.log(addressinfo, "aaaaa")
//     const userid = addressinfo.user_id; // Adjust this based on your authentication mechanism

//     const {
//         pincode,
//         city,
//         state,
//         house_flat_office_no,
//         address,
//         contact_name,
//         mobile_num,
//         address_type,
//         landmark, // Include landmark in the request body
//     } = req.body;
//     console.log(req.body, 'rebnnjxn')

//     // Check if any required field is missing
//     if (
//         !pincode ||
//         !city ||
//         !state ||
//         !house_flat_office_no ||
//         !address ||
//         !contact_name ||
//         !mobile_num ||
//         !address_type
//     ) {
//         return res.status(400).json({ error: 'All required fields must be provided.' });
//     }

//     // Validate specific fields as needed
//     if (isNaN(pincode)) {
//         return res.status(400).json({ error: 'Pincode must be a number.' });
//     }

//     if (isNaN(mobile_num)) {
//         return res.status(400).json({ error: 'Pincode must be a number.' });
//     }

//     try {
//         // All validation passed, proceed to create the address
//         const addressData = {
//             pincode,
//             city,
//             state,
//             house_flat_office_no,
//             address,
//             contact_name,
//             mobile_num,
//             address_type,
//             user_id:userid
//         };

//         // Include the optional landmark field if it's provided
//         if (landmark) {
//             addressData.landmark = landmark;
//         }

//         const addressresult = await addressUser.create(addressData)
//         console.log(addressresult, 'addressresultaddressresult')
//         res.status(201).json(addressresult);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to create an address.' });
//     }
// }
const createAddress = async (req, res) => {
    const mobileNo = req.user.mobile_num;

    try {
        const addressinfo = await registration.findOne({
            where: { mobile_num: mobileNo }
        });

        if (!addressinfo) {
            return res.status(404).json({ error: "User not found." });
        }

        const userId = addressinfo.user_id;

        // Get existing address count for this user
        const existingAddresses = await addressUser.findAll({
            where: { user_id: userId }
        });

        if (existingAddresses.length >= 10) {
            return res.status(400).json({ error: 'You can only have up to 10 addresses.' });
        }

        const {
            pincode,
            city,
            state,
            house_flat_office_no,
            address,
            contact_name,
            mobile_num,
            address_type,
            landmark,
        } = req.body;

        if (
            !pincode ||
            !city ||
            !state ||
            !house_flat_office_no ||
            !address ||
            !contact_name ||
            !mobile_num ||
            !address_type
        ) {
            return res.status(400).json({ error: 'All required fields must be provided.' });
        }

        if (isNaN(pincode)) {
            return res.status(400).json({ error: 'Pincode must be a number.' });
        }

        if (isNaN(mobile_num)) {
            return res.status(400).json({ error: 'Mobile number must be a number.' });
        }

        const addressData = {
            pincode,
            city,
            state,
            house_flat_office_no,
            address,
            contact_name,
            mobile_num,
            address_type,
            user_id: userId,
        };

        if (landmark) {
            addressData.landmark = landmark;
        }

        const addressResult = await addressUser.create(addressData);
        res.status(201).json(addressResult);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create an address.' });
    }
};



const getalladdressinfo = async (req, res) => {

    console.log('get address api called')
    const mobileNo = req.user.mobile_num
    const addressinfo = await registration.findOne({
        where: {
            mobile_num: mobileNo
        }
    });
    // console.log(addressinfo,'addressinfoaddressinfoaddressinfo')
    const user_id = addressinfo.user_id;


    try {
        const userId = user_id; // Adjust this based on your authentication mechanism
        const addressinfo = await addressUser.findAll({
            where: {
                user_id: userId
            }
        })
        if (!addressinfo) {
            res.state(203).json({ message: 'record not found' })
        }
        // console.log(addressinfo,'addressinfoaddressinfo')
        res.status(200).json(addressinfo)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' });
    }

}

const editaddress = async (req, res) => {
    console.log("Call Editaddress")
    const addresses_id = req.params.id
    const mobileNo = req.user.mobile_num
    const addressinfo = await registration.findOne({
        where: {
            mobile_num: mobileNo
        }
    });
    const userId = addressinfo.user_id;

    const {
        pincode,
        city,
        state,
        house_flat_office_no,
        address,
        contact_name,
        contact_number,
        address_type,
        landmark, // Include landmark in the request body
    } = req.body;
    console.log(req.body)

    try {
        // All validation passed, proceed to update the address
        const changeId = userId; // Adjust this based on your authentication mechanism

        const updateData = {
            pincode,
            city,
            state,
            house_flat_office_no,
            address,
            contact_name,
            contact_number,
            address_type,
        };

        // Include the optional landmark field if it's provided
        if (landmark) {
            updateData.landmark = landmark;
        }

        // Find and update the address in the database
        const updatedAddress = await addressUser.findOne(
            {
                where: {
                    addresses_id: addresses_id,
                    user_id: changeId
                }
            }, // You might want to include user_id to ensure the address belongs to the user
            // updateData,
            // { new: true }
        );

        if (!updatedAddress) {
            return res.status(404).json({ error: 'Address not found or you do not have permission to update it.' });
        }
        updatedAddress.set(updateData);
        //   Object.assign(updatedAddress,updateData);

        // Save the updated address to the database
        await updatedAddress.save();


        console.log(updatedAddress, 'updatedAddress');
        res.status(200).json(updatedAddress);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update the address.' });
    }
};

const removeaddress = async (req, res) => {
    console.log('INFO -> removeaddress INFO API CALLED')

    try {
        const addresses_id = req.params.id
        const mobileNo = req.user.mobile_num;

        const addressinfo = await registration.findOne({
            where: {
                mobile_num: mobileNo
            }
        });

        const userId = addressinfo.user_id; // Adjust this based on your authentication mechanism
        console.log(userId, 'userId')
        console.log(addresses_id, 'addresses_id')
        const deleteresult = await addressUser.destroy({
            where: {
                user_id: userId,
                addresses_id: addresses_id
            }
        })
        if (deleteresult === 0) {
            return res.status(404).json({ error: 'Address not found or you do not have permission to delete it.' });
        }

        console.log(deleteresult, 'deleteresult')
        // res.status(200).json(deleteresult)
        res.status(200).send({ id: addresses_id, message: 'Address deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the address.' })
    }
}

const createOrUpdateAddress = async (req, res) => {
    const mobileNo = req.user.mobile_num; // Assuming `req.user` contains authenticated user info

    try {
        // Find the user based on their mobile number
        const userInfo = await registration.findOne({
            where: { mobile_num: mobileNo }
        });

        if (!userInfo) {
            return res.status(404).json({ error: "User not found." });
        }

        const userId = userInfo.user_id; // Get the user's ID

        // Destructure the incoming request body
        const {
            addresses_id, // The ID of the address to update (optional)
            pincode,
            city,
            state,
            house_flat_office_no,
            address,
            contact_name,
            mobile_num,
            address_type,
            landmark // Optional field
        } = req.body;

        // Validate required fields
        if (
            !pincode ||
            !city ||
            !state ||
            !house_flat_office_no ||
            !address ||
            !contact_name ||
            !mobile_num ||
            !address_type
        ) {
            return res.status(400).json({ error: 'All required fields must be provided.' });
        }

        // Validate specific fields
        if (isNaN(pincode)) {
            return res.status(400).json({ error: 'Pincode must be a number.' });
        }
        if (isNaN(mobile_num)) {
            return res.status(400).json({ error: 'Mobile number must be a number.' });
        }

        // Prepare the data for creation or update
        const addressData = {
            pincode,
            city,
            state,
            house_flat_office_no,
            address,
            contact_name,
            mobile_num,
            address_type,
            user_id: userId // Assign the user ID
        };

        // Add landmark if provided
        if (landmark) {
            addressData.landmark = landmark;
        }

        if (addresses_id) {
            // Check if the address with the given ID exists for the user
            const existingAddress = await addressUser.findOne({
                where: {
                    addresses_id: addresses_id,
                    user_id: userId // Ensure the address belongs to the user
                }
            });

            if (!existingAddress) {
                return res.status(404).json({ error: 'Address not found or you do not have permission to update it.' });
            }

            // Update the address
            existingAddress.set(addressData);
            await existingAddress.save();

            console.log(existingAddress, 'Updated Address');
            return res.status(200).json({ message: 'Address updated successfully.', address: existingAddress });
        } else {
            // If no `addresses_id`, create a new address
            const newAddress = await addressUser.create(addressData);

            console.log(newAddress, 'New Address');
            return res.status(201).json({ message: 'Address created successfully.', address: newAddress });
        }
    } catch (error) {
        console.error('Error in createOrUpdateAddress:', error);
        res.status(500).json({ error: 'Failed to create or update the address.' });
    }
};

const getallUserinfo = async(req, res) => {
    // console.log('get address api called')
    try {
        const addressinfo = await addressUser.findAll()
        if (!addressinfo) {
            res.state(203).json({ message: 'record not found' })
        }
        // console.log(addressinfo,'addressinfoaddressinfo')
        res.status(200).json(addressinfo)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' });
    }

}

module.exports = {
    createAddress,
    getalladdressinfo,
    editaddress,
    removeaddress,
    createOrUpdateAddress,
    getallUserinfo
}
