// Exported function for parsing cookies based on a given cookie name
exports.cookieParser = (cookieName, cookies) => {
    // Log the provided cookies and the target cookie name for debugging
    console.log(cookies, cookieName);

    // Split the provided cookies into an array
    const cookieArray = cookies.split("; ");
    console.log(cookieArray);

    // Filter the array to find the required cookie based on the provided name
    let requiredCookie = cookieArray.filter(cookie => cookie.indexOf(cookieName) === 0)[0];
    console.log(requiredCookie);

    // Split the required cookie to extract its value
    let cookie = requiredCookie.split("=")[1];
    console.log(cookie);

    // Return the extracted cookie value
    return cookie;
};
