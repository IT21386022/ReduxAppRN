import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/userSlice";
import { Text } from "react-native";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);

  const author = users.find((user) => user.id === userId);

  return <Text>by {author ? author.name : "Unknown author"}</Text>;
};

export default PostAuthor;
