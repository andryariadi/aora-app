import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";

export default function App() {
  return (
    <SafeAreaView className="bg-amber-500 h-full">
      <ScrollView className="bg-rose-500" contentContainerStyle={{ height: "100%" }}>
        <View className="bg-fuchsia-500 w-full h-full items-center px-4">
          <Image source={images.logo} className="bg-rose-500 w-[130px] h-[84px]" resizeMode="contain" />

          <Image source={images.cards} className="bg-rose-500 max-w-[380px] w-full h-[300px]" resizeMode="contain" />

          <View className="relative mt-5">
            <Text className="text-4xl text-white text-center font-bold">
              Discover Endless Possibilities with <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image source={images.path} className="w-[136px] h-[15px] absolute -bottom-2 -right-8" resizeMode="contain" />
          </View>

          <Text className="text-sm text-center text-gray-100 font-pregular mt-7"> Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
