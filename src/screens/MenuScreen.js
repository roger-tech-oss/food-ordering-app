import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { CartContext } from "../context/CartContext";
import Icon from "react-native-vector-icons/Ionicons";

export default function MenuScreen() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { addToCart, cart } = useContext(CartContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={{ marginRight: 15 }}>
          <View style={{ position: "relative" }}>
            <Icon name="cart-outline" size={28} color="#ff8c00" />
            {cart.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cart.length}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, cart]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "menuItems"), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("🔥 Menu items from Firestore:", items);
      setMenu(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="orange" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={menu}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {cart.length > 0 && (
      <TouchableOpacity
        style={styles.floatingCartBar}
        onPress={() => navigation.navigate("Cart")}
      >
        <Text style={styles.floatingCartText}>🛒 View Cart ({cart.length})</Text>
      </TouchableOpacity>
    )}
  </View>
  ); 
}

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: "#fefefe", flex: 1 },
  card: { backgroundColor: "#fff", padding: 15, marginBottom: 10, borderRadius: 12, elevation: 3 },
  image: { width: "100%", height: 150, borderRadius: 8, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  price: { fontSize: 16, color: "green", marginVertical: 5 },
  button: { backgroundColor: "orange", padding: 10, borderRadius: 6, marginTop: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  badge: {
    position: "absolute",
    right: -10,
    top: -5,
    backgroundColor: "red",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  floatingCartBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#ff9800',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    zIndex: 10,
  },
  floatingCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});
