const isEmpty = (string) => {
    if (!string || string.trim() === '') return true;

    return false;
};

const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(emailRegEx)) return true;

    return false;
};

exports.validateSignupData = (data) => {
    let errors = {};

    // data validations
    if (isEmpty(data.email)) errors.email = 'Must not be empty';
    else if (!isEmail(data.email)) errors.email = 'Must be a valid email address';

    if (isEmpty(data.password)) errors.password = 'Must not be empty';
    if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must match';
    if (isEmpty(data.handle)) errors.handle = 'Must not be empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false,
    }
}

exports.validateLoginData = (data) => {
    let errors = {};
    console.log("DATA", data);
    // data validations
    if (isEmpty(data.email)) errors.email = 'Must not be empty';
    if (isEmpty(data.password)) errors.password = 'Must not be empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false,
    }
}

exports.reduceUserDetails = (data) => {
    let userDetails = {};

    if (!isEmpty(data.bio)) userDetails.bio = data.bio;
    if (!isEmpty(data.website)) {
        if (!data.website.trim().startsWith('http')) userDetails.website = `http://${data.website.trim()}`;
        else userDetails.website = data.website.trim();
    }
    if (!isEmpty(data.location)) userDetails.location = data.location;

    return userDetails;
}