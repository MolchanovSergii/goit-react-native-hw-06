import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import Comment from "../components/Comment";
import { Feather } from "@expo/vector-icons";

import { db } from "../config";
import { collection, addDoc, getDocs } from "firebase/firestore";

const CommentsScreen = ({ route }) => {
  const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  const [commentsData, setCommentsData] = useState([]);
  const [error, setError] = useState(null);
  const { imageUrl, postId } = route.params;

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    try {
      const commentsRef = collection(db, "posts", postId, "comments");
      const commentsSnapshot = await getDocs(commentsRef);
      const comments = commentsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCommentsData(comments);
    } catch (error) {
      console.log(error);
      setError("Произошла ошибка при попытке загрузить комментарии.");
    }
  };

  const handleAddComment = async (postId, commentText) => {
    if (!commentText.trim()) {
      setError("Комментарий не может быть пустым.");
      return;
    }

    try {
      const newComment = await commentsCollection(postId, commentText);
      setCommentsData((prevComments) => [...prevComments, newComment]);
      setComment("");
    } catch (err) {
      console.error(err);
      setError("Ошибка при добавлении комментария.");
    }
  };

  const commentsCollection = async (postId, commentText) => {
    const collectionRef = collection(db, "posts", postId, "comments");
    const timestamp = new Date().toISOString();

    try {
      const docRef = await addDoc(collectionRef, {
        comment: commentText,
        timestamp,
      });
      return { comment: commentText, timestamp, id: docRef.id };
    } catch (error) {
      console.log(error);
      setError("Произошла ошибка при попытке добавить комментарий.");
    }
  };

  const formatTimestamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(timestamp).toLocaleString("uk-UA", options);
  };

  // ...
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <FlatList
          data={commentsData}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <>
              <Image
                source={{ uri: imageUrl }}
                resizeMode={"cover"}
                style={styles.image}
              />
              {error && <Text style={styles.errorText}>{error}</Text>}
            </>
          )}
          renderItem={({ item }) => (
            <Comment
              img={require("../assets/images/comments-photo-user.png")}
              text={item.comment}
              time={formatTimestamp(item.timestamp)}
            />
          )}
        />
        <TextInput
          onFocus={() => setIsOpenKeyboard(true)}
          onBlur={() => setIsOpenKeyboard(false)}
          value={comment}
          onChangeText={setComment}
          style={styles.commentInput}
          placeholder="Коментувати..."
        />
        <TouchableOpacity
          onPress={() => handleAddComment(postId, comment)}
          style={styles.addCommentButton}
        >
          <Feather name="arrow-up" size={24} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  commentInput: {
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 25,
    fontSize: 16,
    lineHeight: 19.36,
  },
  addCommentButton: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommentsScreen;
