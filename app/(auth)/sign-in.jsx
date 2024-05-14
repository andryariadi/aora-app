import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

const SignIn = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="bg-rose-500" contentContainerStyle={{ height: "100%" }}>
        <View className="bg-green-600 w-full h-full justify-start px-4 my-5">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white font-psemibold mt-8">Log in to Aora</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
