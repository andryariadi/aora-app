import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";

const SignIn = () => {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="bg-rose-500" contentContainerStyle={{ height: "100%" }}>
        <View className="bg-green-600 w-full h-full justify-start px-4 my-5">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />

          <Text className="text-2xl text-white font-psemibold mt-8">Log in to Aora</Text>

          <FormField title="Email" value={formInput.email} handleChangeInput={(e) => setFormInput({ ...formInput, email: e })} otherStyles="mt-7" keyboardType="email-address" />

          <FormField title="Password" value={formInput.password} handleChangeInput={(e) => setFormInput({ ...formInput, password: e })} otherStyles="mt-7" />

          <CustomButton title="Log In" handlePress={handleSubmit} isLoading={isSubmitting} containerStyles="mt-7" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
