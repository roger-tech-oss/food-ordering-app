// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuScreen from "./src/screens/MenuScreen";
import { CartProvider } from './src/context/CartContext';
import CartScreen from "./src/screens/CartScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import OrderSummaryScreen from './src/screens/OrderSummaryScreen';
Ionicons.loadFont();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
          {/* Cart screen coming next */}
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
