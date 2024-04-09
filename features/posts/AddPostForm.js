import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { selectAllUsers } from "../users/userSlice";
import { Picker } from "@react-native-picker/picker";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

const AddPostForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  //const [submittedPost, setSubmittedPost] = useState(null); // State for submitted post

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (text) => setTitle(text);
  const onContentChanged = (text) => setContent(text);
  const onAuthorChanged = (value) => setUserId(value);

  const onSavePostClicked = () => {
    if (title && content) {
      // const postId = nanoid();
      dispatch(postAdded(title, content, userId));
      setTitle("");
      setContent("");
      //setSubmittedPost({ id: postId, title, content, userId }); // Update submitted post state
    }
  };

  const canSave = title && content && userId;

  const usersOptions = users.map((user) => (
    <Picker.Item key={user.id} label={user.name} value={user.id} />
  ));

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Add a New Post</Text>
      <View>
        <Text>Post Title:</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          value={title}
          onChangeText={onTitleChanged}
        />
      </View>
      <View>
        <Text>Author:</Text>
        <View style={{ borderColor: "gray", borderWidth: 1 }}>
          <Picker
            selectedValue={userId}
            onValueChange={(itemValue, itemIndex) => onAuthorChanged(itemValue)}
          >
            <Picker.Item label="" value="" />
            {usersOptions}
          </Picker>
        </View>
      </View>
      <View>
        <Text>Content:</Text>
        <TextInput
          multiline
          style={{ height: 100, borderColor: "gray", borderWidth: 1 }}
          value={content}
          onChangeText={onContentChanged}
        />
      </View>
      <TouchableOpacity
        onPress={onSavePostClicked}
        disabled={!canSave}
        style={{
          backgroundColor: canSave ? "blue" : "gray",
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Save Post</Text>
      </TouchableOpacity>

      {/* Display the submitted post */}
      {/* {submittedPost && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Submitted Post:
          </Text>
          <Text>Title: {submittedPost.title}</Text>
          <Text>Author: {submittedPost.userId}</Text>
          <Text>Content: {submittedPost.content}</Text>
        </View>
      )} */}
    </View>
  );
};

export default AddPostForm;
