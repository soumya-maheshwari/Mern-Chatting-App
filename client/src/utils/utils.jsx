export const getSender = (loggedUser, users) => {
  // console.log(loggedUser);
  // console.log(users[0]);
  return users[0]?._id === loggedUser ? users[1].username : users[0].username;
};

export const getNotSender = (loggedUser, users) => {
  // console.log(loggedUser);
  // console.log(users[0]);
  return users[0]?._id === loggedUser ? users[0].username : users[1].username;
};
