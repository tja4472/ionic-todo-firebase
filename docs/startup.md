# online - signed in
- AuthService: isOnline = false
- AuthService: User is signed in> roNQiXFu3LQBzV860lsvXlGYCm03
- MyApp:---signedIn$> SignedInUser
- MyApp:---offlineSignedIn$> SignedInUser
- AuthService: isOnline = true
- MyApp:---onlineSignedIn$> SignedInUser
# online - signed out
- AuthService: isOnline = false
- AuthService: No user is signed in.
- MyApp:---signedOut$>
- MyApp:---offlineSignedOut$>
- AuthService: isOnline = true
- MyApp:---onlineSignedOut$> 
# offline - signed in
- AuthService: isOnline = false
- MyApp:---signedIn$> SignedInUser
- AuthService: User is signed in> roNQiXFu3LQBzV860lsvXlGYCm03
- MyApp:---offlineSignedIn$> SignedInUser
# offline - signed out
- AuthService: isOnline = false
- AuthService: No user is signed in.
- MyApp:---signedOut$>
- MyApp:---offlineSignedOut$>
