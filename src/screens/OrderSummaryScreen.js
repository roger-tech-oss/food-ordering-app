import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { CartContext } from '../context/CartContext';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function OrderSummaryScreen({ navigation }) {
  const { cart, getTotal, clearCart } = useContext(CartContext);

  const placeOrder = async () => {
    try {
      const orderData = {
        items: cart,
        total: getTotal(),
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, 'orders'), orderData);
      clearCart();
      Alert.alert("✅ Order Placed", "Thank you for your order!");
      navigation.navigate("Menu");
    } catch (error) {
      console.error("❌ Error placing order: ", error);
      Alert.alert("Error", "Failed to place order.");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.quantity} x ${item.price.toFixed(2)}</Text>
          </View>
        )}
      />
      <Text style={styles.total}>Total: ${getTotal().toFixed(2)}</Text>
      <Button title="Place Order" onPress={placeOrder} color="green" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, flex: 1 },
  item: { marginBottom: 10 },
  name: { fontWeight: "bold" },
  total: { fontSize: 18, fontWeight: "bold", marginVertical: 15 }
});
