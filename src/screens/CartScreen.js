import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from "react-native";
import { CartContext } from "../context/CartContext";
import { useNavigation } from '@react-navigation/native';


export default function CartScreen() {
  const { cart, updateQuantity, removeFromCart, getTotal, clearCart } = useContext(CartContext);
  const navigation = useNavigation();
  console.log("🧺 CartScreen loaded");
  console.log("🧺 Cart contents:", cart);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>${item.price.toFixed(2)} x {item.quantity}</Text>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)} style={styles.btn}>
          <Text>-</Text>
        </TouchableOpacity>
        <Text>{item.quantity}</Text>
        <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)} style={styles.btn}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeFromCart(item.id)} style={[styles.btn, { backgroundColor: "#e74c3c" }]}>
          <Text style={{ color: "#fff" }}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={{ fontSize: 18, textAlign: "center", marginTop: 30 }}>🛒 Cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
          <View style={styles.footer}>
            <Text style={styles.total}>Total: ${getTotal().toFixed(2)}</Text>
            <Button
            title="Proceed to Checkout"
            color="blue"
            onPress={() => navigation.navigate("OrderSummary")}
            />
            <Button title="Clear Cart" color="#e74c3c" onPress={clearCart} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, flex: 1, backgroundColor: "#fff" },
  item: { backgroundColor: "#f2f2f2", padding: 15, marginBottom: 10, borderRadius: 10 },
  name: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 },
  btn: { padding: 6, borderRadius: 5, backgroundColor: "#ddd", marginHorizontal: 5 },
  footer: { marginTop: 20 },
  total: { fontSize: 20, fontWeight: "bold", marginBottom: 10 }
});
