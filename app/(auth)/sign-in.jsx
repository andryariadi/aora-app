import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../../libs/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!formInput.email === "" || !formInput.password === "") {
      Alert.alert("Error", "Please fill in all the fields!");
    }

    setIsSubmitting(true);

    try {
      await signIn(formInput.email, formInput.password);
      const result = await getCurrentUser();

      setUser(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "User signed is successfully!");
      router.replace("/home");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full justify-center px-4 my-5">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />

          <Text className="text-2xl text-white font-psemibold mt-8">Log in to Aora</Text>

          <FormField title="Email" value={formInput.email} handleChangeInput={(e) => setFormInput({ ...formInput, email: e })} otherStyles="mt-10" keyboardType="email-address" />

          <FormField title="Password" value={formInput.password} handleChangeInput={(e) => setFormInput({ ...formInput, password: e })} otherStyles="mt-7" />

          <CustomButton title="Log In" handlePress={handleSubmit} isLoading={isSubmitting} containerStyles="mt-7" />

          <View className="flex-row justify-center gap-2 mt-5">
            <Text className="text-lg text-gray-100 font-pregular">Don't have account?</Text>
            <Link href="/sign-up" className="text-lg text-secondary font-psemibold">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
