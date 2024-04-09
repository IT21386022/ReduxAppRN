import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";
import { TouchableOpacity, Text, View } from "react-native";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactions = post.reactions || {};

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <TouchableOpacity
        key={name}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          margin: 5,
        }}
        onPress={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        <Text style={{ fontSize: 20 }}>{emoji}</Text>
        <Text style={{ marginLeft: 5 }}>{post.reactions[name] || 0}</Text>
      </TouchableOpacity>
    );
  });

  return <View style={{ flexDirection: "row" }}>{reactionButtons}</View>;
};

export default ReactionButtons;
