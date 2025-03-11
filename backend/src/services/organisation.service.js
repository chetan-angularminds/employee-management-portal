import model from "./../models/index.js";

const createOrgnisation = async (orgDetails, user) => {
    const org = await model.Organisation.create(orgDetails);
    org.createdBy = user._id;
    org.save();
    return org;
};

const organisationService = { createOrgnisation };

export default organisationService;
