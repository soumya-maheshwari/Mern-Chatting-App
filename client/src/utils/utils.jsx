export const getSender = (loggedUser, users) => {
  console.log(loggedUser);
  console.log(users[0]);
  return users[0]?._id === loggedUser ? users[1].username : users[0].username;
};

export const getOtherUser = (userId, users) => {
  const sender = users.find((user) => user._id === userId);
  console.log(sender);
  if (sender) {
    return sender.username;
  }

  // Default to a generic label if the sender is not found
  return "Unknown Sender";
};

export const getSenderPhoto = (loggedUser, users) => {
  console.log(loggedUser);
  console.log(users[0]);
  return users[0]?._id === loggedUser ? users[1].photo : users[0].photo;
};
