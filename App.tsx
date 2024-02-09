import React, { useRef } from "react";
import { Animated, FlatList, StyleSheet, Text, View } from "react-native";

const DATA = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
  { id: 13 },
  { id: 14 },
  { id: 15 },
  { id: 16 },
];

const First_Header_Max_Height = 240;
const First_Header_Min_Height = 120;

const Second_Header_Max_Height = 120;
const Second_Header_Min_Height = 60;

// Es la distancia que quiero que empiece a hacer eso.
const First_Scroll_Distance = First_Header_Max_Height - First_Header_Min_Height;
const Second_Scroll_Distance = Second_Header_Max_Height - Second_Header_Min_Height;

const DynamicHeader = ({ value }: {value: Animated.Value}) => {
  const firstAnimatedHeaderHeight = value.interpolate({
    inputRange: [0, First_Scroll_Distance],
    outputRange: [First_Header_Max_Height, 0],
    extrapolate: "clamp",
  });

  const firstAnimatedHeaderColor = value.interpolate({
    inputRange: [0, First_Scroll_Distance],
    outputRange: ["#181D31", "#FFF"],
    extrapolate: "clamp",
  });

  const secondAnimatedHeaderHeight = value.interpolate({
    inputRange: [0, Second_Scroll_Distance],
    outputRange: [0, Second_Header_Max_Height],
    extrapolate: "clamp",
  });

  const secondAnimatedHeaderColor = value.interpolate({
    inputRange: [0, Second_Scroll_Distance],
    outputRange: ["#181D31", "#678983"],
    extrapolate: "clamp",
  });

  return (
    <View>
      <Animated.View
        style={[
          styles.header,
          {
            height: firstAnimatedHeaderHeight,
            backgroundColor: firstAnimatedHeaderColor,
          },
        ]}
      >
        <Text
          style={styles.title}
        >
          Esto se va a ver primero
        </Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.header,
          {
            height: secondAnimatedHeaderHeight,
            backgroundColor: secondAnimatedHeaderColor,
          },
        ]}
      >
        <Text
          style={styles.title}
        >
          Esto se va a ver segundo
        </Text>
      </Animated.View>
    </View>
  );
};

const ScrollViewScreen = () => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  return (
    <View>
      <DynamicHeader value={scrollOffsetY} />
      <FlatList
        renderItem={({ item }) => {
          return (
            <View style={styles.card}>
              <Text style={styles.subtitle}>({item.id})</Text>
            </View>
          );
        }}
        data={DATA}
        scrollEventThrottle={5}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          {
            useNativeDriver: false,
          }
        )}
      />
    </View>
  );
};

export default ScrollViewScreen;

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
    paddingTop: 50,
    marginTop: -25,
  },
  title: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 20,
  },
  card: {
    height: 100,
    backgroundColor: "#E6DDC4",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  subtitle: {
    color: "#181D31",
    fontWeight: "bold",
  },
});
