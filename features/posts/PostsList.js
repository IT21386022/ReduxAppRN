import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Text, View, ScrollView } from "react-native";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);

  const orderedPosts = posts
    .slice()
    .sort
    // ((a, b) => {
    //   // Handle cases where a.date or b.date might be undefined
    //   const dateA = a.date || "";
    //   const dateB = b.date || "";
    //   return dateB.localeCompare(dateA);
    // })
    ();

  const renderedPosts = orderedPosts.map((post) => (
    <View
      key={post.id}
      style={{
        marginBottom: 20,
        borderColor: "balck",
        borderWidth: 0.5,
        padding: 5,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{post.title}</Text>
      <Text>{post.content}</Text>
      <Text>{post.userId}</Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
      >
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </View>
      {post && <ReactionButtons post={post} />}
    </View>
  ));

  return (
    <ScrollView style={{ padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Posts
      </Text>
      {renderedPosts}
    </ScrollView>
  );
};

export default PostsList;
