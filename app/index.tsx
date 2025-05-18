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
import axios from 'axios';
import { AnimatedCircularProgress } from 'react-native-circular-progress';



type ToDoType = { id: number; title: string; description: string; isDone: boolean };

// TodoItem component
const TodoItem = ({
  todo,
  onDelete,
  onToggle,
}: {
  todo: ToDoType;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}) => (
  <View style={styles.todoItem}>
    <View style={styles.todoRow}>
      <View style={styles.todoLeft}>
        <Checkbox
          value={todo.isDone}
          color={todo.isDone ? "#4630EB" : undefined}
          style={styles.checkbox}
          onValueChange={() => onToggle(todo.id)}
        />
        <View>
          <Text
            style={[
              styles.todoTitle,
              todo.isDone && { textDecorationLine: "line-through", color: "#888" },
            ]}
          >
            {todo.title}
          </Text>
          <Text
            style={[
              styles.todoDesc,
              todo.isDone && { textDecorationLine: "line-through", color: "#aaa" },
            ]}
          >
            {todo.description.split(" ").slice(0, 4).join(" ")}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => onDelete(todo.id)}>
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [imageError, setImageError] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [todos, setTodos] = useState<ToDoType[]>([
    { id: 1, title: "Todo 1", description: "This is the first todo", isDone: false },
    { id: 2, title: "Todo 2", description: "This is the second todo", isDone: false },
    { id: 3, title: "Todo 3", description: "This is the third todo", isDone: false },
  ]);
  const [todoText, setTodoText] = useState("");
  const [todoDesctext, setTodoDesctext] = useState("");

  const addTodo = () => {
    if (!todoText.trim()) return;
    const newTodo = {
      id: Date.now(),
      title: todoText,
      description: todoDesctext,
      isDone: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
    setTodoText("");
    setTodoDesctext("");
    setIsAddVisible(false);
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodoDone = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const filteredData = todos.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalTasks = todos.length;
const completedTasks = todos.filter((todo) => todo.isDone).length;
const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => alert("Menu Pressed")}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Profile Pressed")}>
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

      {/* Search */}
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
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <AnimatedCircularProgress
          size={150}
          width={12}
          fill={progress}
          tintColor="#4CAF50"
          backgroundColor="#E0E0E0"
          duration={600}
          lineCap="round"
        >
          {(fill: number) => (
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              {Math.round(fill)}%
            </Text>
          )}
        </AnimatedCircularProgress>
        <Text style={{ marginTop: 8, fontSize: 16, color: "#555" }}>
          {completedTasks} of {totalTasks} tasks completed
        </Text>
      </View>

      {/* Todo List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem todo={item} onDelete={deleteTodo} onToggle={toggleTodoDone} />
        )}
      />

      {/* Add Todo */}
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20}>
        {isAddVisible && (
          <View style={styles.addTaskContainer}>
            <TextInput
              placeholder="Task Title"
              value={todoText}
              onChangeText={setTodoText}
              style={styles.newTodoInput}
            />
            <TextInput
              placeholder="Task Description"
              value={todoDesctext}
              onChangeText={setTodoDesctext}
              style={styles.newTodoInput}
              multiline
            />
            <TouchableOpacity style={styles.addConfirmButton} onPress={addTodo}>
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
