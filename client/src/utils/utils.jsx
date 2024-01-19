export const getSender = (loggedUser, users) => {
  // console.log(loggedUser);
  // console.log(users[0]);
  return users[0]?._id === loggedUser ? users[1].username : users[0].username;
};
