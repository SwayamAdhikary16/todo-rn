import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type ToDoType = { id: number; title: string; description: string; isDone: boolean; };

// TodoItem component
const TodoItem = ({ todo }:{todo: ToDoType}) => (
  <View style={styles.todoItem}>
    <View style={styles.todoRow}>
      <View style={styles.todoLeft}>
        <Checkbox
          value={todo.isDone}
          color={todo.isDone ? "#4630EB" : undefined}
          style={styles.checkbox}
        />
        <View>
          <Text
            style={[
              styles.todoTitle,
              todo.isDone && { textDecorationLine: "line-through" },
            ]}
          >
            {todo.title}
          </Text>
          <Text style={styles.todoDesc}>
            {todo.description.split(" ").slice(0, 4).join(" ")}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => alert("Delete " + todo.id)}>
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  </View>
);

// Main screen
export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [imageError, setImageError] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);



  const todoData = [
    { id: 1, title: "Todo 1", description: "This is the first todo", isDone: false },
    { id: 2, title: "Todo 2", description: "This is the second todo", isDone: false },
    { id: 3, title: "Todo 3", description: "This is the third todo", isDone: false },
  ]

  const [todos, setTodos] = useState<ToDoType[]>(todoData);
  const [todoText, setTodoText] = useState<string>("");
  const [todoDesctext, setTodoDesctext] = useState<string>("");
  const addTodo = () => {
    const newTodo = {
      id: Math.random(),
      title: todoText,
      description: todoDesctext,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    setTodoText("");
    setTodoDesctext("");
  }

  const filteredData = todos.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
   


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => alert("Menu Pressed")}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Add Todo Pressed")}>
          <Image
            source={{
              uri: imageError
                ? "https://i.pravatar.cc/150?img=1"
                : "https://cdn-icons-png.flaticon.com/512/147/147144.png",
            }}
            style={styles.avatar}
            onError={() => setImageError(true)}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="black" />
        <TextInput
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          clearButtonMode="always"
        />
      </View>

      <FlatList
        data={[...todos].reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem todo={item} />
        )}
      />

      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20}>
        {isAddVisible && (
          <View style={styles.addTaskContainer}>
            <TextInput
              placeholder="Task Title"
              onChangeText={(text)=> setTodoText(text)}
              value={todoText}
              style={styles.newTodoInput}
              autoCorrect={false}
            />
            <TextInput
              placeholder="Task Description"
              onChangeText={(text)=> setTodoDesctext(text)}
              value={todoDesctext}
              style={styles.newTodoInput}
              autoCorrect={false}
              multiline
            />
            <TouchableOpacity style={styles.addConfirmButton} onPress={() => addTodo()}>
              <Text style={styles.addConfirmButtonText}>Add Task</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={styles.fab}
          onPress={() => setIsAddVisible(!isAddVisible)}
        >
          <Ionicons name={isAddVisible ? "close" : "add"} size={32} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FAFAFA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: "#333",
    fontSize: 16,
  },
  todoItem: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  todoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todoLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  checkbox: {
    marginRight: 30,
    width: 24,
    height: 24,
    borderRadius: 6,
    borderColor: "#888",
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#212121",
  },
  todoDesc: {
    fontSize: 14,
    color: "#666",
  },
  addTaskContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  newTodoInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#F9F9F9",
  },
  addConfirmButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addConfirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#2196F3",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
