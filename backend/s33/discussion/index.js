function loginUser(username, password) {
    if (username !== null && password !== null) {
      return {
        username: username,
        isLoggedIn: true
      };
    } else {
      return { isLoggedIn: false };
    }
  }
  
  console.log(loginUser('jennifer_huh', 'imFearlessHuh'));