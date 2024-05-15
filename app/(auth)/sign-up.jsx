import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import { createUser } from "../../libs/appwrite";

const SignUp = () => {
  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    createUser();
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full justify-center px-4 my-5">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />

          <Text className="text-2xl text-white font-psemibold mt-8">Sign Up to Aora</Text>

          <FormField title="Username" value={formInput.username} handleChangeInput={(e) => setFormInput({ ...formInput, username: e })} otherStyles="mt-10" keyboardType="Your unique username" />

          <FormField title="Email" value={formInput.email} handleChangeInput={(e) => setFormInput({ ...formInput, email: e })} otherStyles="mt-7" keyboardType="email-address" />

          <FormField title="Password" value={formInput.password} handleChangeInput={(e) => setFormInput({ ...formInput, password: e })} otherStyles="mt-7" />

          <CustomButton title="Sign Up" handlePress={handleSubmit} isLoading={isSubmitting} containerStyles="mt-7" />

          <View className="flex-row justify-center gap-2 mt-5">
            <Text className="text-lg text-gray-100 font-pregular">Already have an account?</Text>
            <Link href="/sign-in" className="text-lg text-secondary font-psemibold">
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
