// Exported function for parsing user data into a standardized response format
exports.userResponseParser = (user) => {
    // Return an object with selected user properties or null if not available
    return {
        id: user.id || null,
        email: user.email,
        username: user.username,
    };
};
